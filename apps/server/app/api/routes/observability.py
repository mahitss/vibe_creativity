"""FastAPI route handlers for OMNIA Runtime Observability Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app.core.security import CreatorContext, require_creator_context
from app.modules.observability_engine.domain import (
    LogLevel,
    SpanRecord,
    StructuredLogEntry,
    SubsystemHealth,
    SystemAlert,
    TraceRecord,
)
from app.modules.observability_engine.service import ObservabilityEngine

router = APIRouter(tags=["observability"])

_observability_engine = ObservabilityEngine()


def get_observability_engine() -> ObservabilityEngine:
    return _observability_engine


def _format_span(s: SpanRecord) -> dict[str, Any]:
    return {
        "span_id": s.span_id,
        "trace_id": s.trace_id,
        "parent_span_id": s.parent_span_id,
        "span_type": s.span_type.value,
        "name": s.name,
        "start_time": s.start_time.isoformat(),
        "end_time": s.end_time.isoformat() if s.end_time else None,
        "duration_ms": s.duration_ms,
        "status": s.status,
        "metadata": s.metadata,
    }


def _format_trace(t: TraceRecord) -> dict[str, Any]:
    return {
        "trace_id": t.trace_id,
        "workspace_id": t.workspace_id,
        "correlation_id": t.correlation_id,
        "workflow_id": t.workflow_id,
        "spans": [_format_span(s) for s in t.spans],
        "start_time": t.start_time.isoformat(),
        "end_time": t.end_time.isoformat() if t.end_time else None,
        "duration_ms": t.duration_ms,
        "status": t.status,
    }


def _format_log(entry: StructuredLogEntry) -> dict[str, Any]:
    return {
        "log_id": entry.log_id,
        "workspace_id": entry.workspace_id,
        "mind_id": entry.mind_id,
        "trace_id": entry.trace_id,
        "span_id": entry.span_id,
        "level": entry.level.value,
        "component": entry.component,
        "message": entry.message,
        "metadata": entry.metadata,
        "timestamp": entry.timestamp.isoformat(),
    }


def _format_health(h: SubsystemHealth) -> dict[str, Any]:
    return {
        "component_name": h.component_name,
        "status": h.status.value,
        "health_score": h.health_score,
        "latency_ms": h.latency_ms,
        "error_rate": h.error_rate,
        "active_alerts": h.active_alerts,
    }


def _format_alert(a: SystemAlert) -> dict[str, Any]:
    return {
        "alert_id": a.alert_id,
        "workspace_id": a.workspace_id,
        "component": a.component,
        "title": a.title,
        "severity": a.severity,
        "message": a.message,
        "timestamp": a.timestamp.isoformat(),
    }


@router.get("/runtime/traces")
async def list_traces(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> list[dict[str, Any]]:
    traces = engine.list_traces(workspace_id=context.creator_id, limit=limit)
    return [_format_trace(t) for t in traces]


@router.get("/runtime/traces/{trace_id}")
async def get_trace_details(
    trace_id: str,
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> dict[str, Any]:
    try:
        trace = engine.get_trace(trace_id)
        return _format_trace(trace)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/runtime/traces/{trace_id}/otel")
async def export_trace_opentelemetry(
    trace_id: str,
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> dict[str, Any]:
    try:
        return engine.export_opentelemetry(trace_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/runtime/logs")
async def list_logs(
    level: LogLevel | None = None,
    limit: int = 100,
    context: CreatorContext = Depends(require_creator_context),
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> list[dict[str, Any]]:
    logs = engine.list_logs(workspace_id=context.creator_id, level=level, limit=limit)
    return [_format_log(entry) for entry in logs]


@router.get("/runtime/health")
async def get_system_health(
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> list[dict[str, Any]]:
    subsystems = engine.get_health_scores()
    return [_format_health(h) for h in subsystems]


@router.get("/runtime/alerts")
async def get_system_alerts(
    context: CreatorContext = Depends(require_creator_context),
    engine: ObservabilityEngine = Depends(get_observability_engine),
) -> list[dict[str, Any]]:
    alerts = engine.get_alerts(workspace_id=context.creator_id)
    return [_format_alert(a) for a in alerts]

"""Service layer for OMNIA Runtime Observability Platform."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.observability_engine.domain import (
    HealthStatus,
    LogLevel,
    SpanRecord,
    SpanType,
    StructuredLogEntry,
    SubsystemHealth,
    SystemAlert,
    TraceRecord,
)


class HealthAggregator:
    """Aggregates subsystem metrics into composite health scores."""

    def compute_subsystem_health(
        self,
        component_name: str,
        latency_ms: float,
        error_rate: float,
        active_alerts: int,
    ) -> SubsystemHealth:
        score = 100.0 - (error_rate * 50.0) - (min(latency_ms, 500) / 10.0) - (active_alerts * 5.0)
        score = max(0.0, min(100.0, round(score, 1)))

        if score >= 90:
            status = HealthStatus.HEALTHY
        elif score >= 70:
            status = HealthStatus.DEGRADED
        elif score > 0:
            status = HealthStatus.UNHEALTHY
        else:
            status = HealthStatus.OFFLINE

        return SubsystemHealth(
            component_name=component_name,
            status=status,
            health_score=score,
            latency_ms=latency_ms,
            error_rate=error_rate,
            active_alerts=active_alerts,
        )


class ObservabilityEngine:
    """Master Observability Engine collecting distributed traces, spans, logs, health scores, and alerts."""

    def __init__(self) -> None:
        self.health_aggregator = HealthAggregator()
        self._traces: dict[str, TraceRecord] = {}
        self._logs: list[StructuredLogEntry] = []
        self._alerts: list[SystemAlert] = []
        self._seed_default_observability_data()

    def _seed_default_observability_data(self) -> None:
        now = datetime.now(tz=UTC)

        # Seed Trace
        t1_id = "trace-content-exec-101"
        s1 = SpanRecord(
            span_id="span-root-1",
            trace_id=t1_id,
            span_type=SpanType.RUNTIME,
            name="Runtime State Machine Cycle",
            start_time=now - timedelta(seconds=10),
            end_time=now - timedelta(seconds=8),
            duration_ms=2000.0,
            status="OK",
        )
        s2 = SpanRecord(
            span_id="span-agent-2",
            trace_id=t1_id,
            parent_span_id="span-root-1",
            span_type=SpanType.AGENT,
            name="Executive Agent Decision Cycle",
            start_time=now - timedelta(seconds=9),
            end_time=now - timedelta(seconds=8.5),
            duration_ms=500.0,
            status="OK",
        )
        s3 = SpanRecord(
            span_id="span-tool-3",
            trace_id=t1_id,
            parent_span_id="span-agent-2",
            span_type=SpanType.TOOL,
            name="Tool Execution: tool-notify",
            start_time=now - timedelta(seconds=8.5),
            end_time=now - timedelta(seconds=8.4),
            duration_ms=100.0,
            status="OK",
        )

        trace1 = TraceRecord(
            trace_id=t1_id,
            workspace_id="ws-101",
            correlation_id="corr-exec-101",
            workflow_id="wf-content-production-101",
            spans=[s1, s2, s3],
            start_time=now - timedelta(seconds=10),
            end_time=now - timedelta(seconds=8),
            duration_ms=2000.0,
            status="OK",
        )
        self._traces[trace1.trace_id] = trace1

        # Seed Logs
        log1 = StructuredLogEntry(
            log_id="log-101",
            workspace_id="ws-101",
            mind_id="mind-101",
            trace_id=t1_id,
            span_id="span-agent-2",
            level=LogLevel.INFO,
            component="Executive Agent",
            message="Delegated content production workflow to Content Agent",
            metadata={"confidence": 0.96},
            timestamp=now - timedelta(seconds=9),
        )
        log2 = StructuredLogEntry(
            log_id="log-102",
            workspace_id="ws-101",
            mind_id="mind-101",
            trace_id=t1_id,
            span_id="span-tool-3",
            level=LogLevel.INFO,
            component="Tool Execution Engine",
            message="Executed sandboxed tool-notify successfully",
            metadata={"latency_ms": 100.0},
            timestamp=now - timedelta(seconds=8.4),
        )
        self._logs.extend([log1, log2])

        # Seed Alert
        alert1 = SystemAlert(
            alert_id="alert-101",
            workspace_id="ws-101",
            component="Memory Engine",
            title="Vector Memory HNSW Search Latency Spike",
            severity="WARN",
            message="HNSW similarity search latency exceeded 250ms threshold during peak query volume",
            timestamp=now - timedelta(minutes=15),
        )
        self._alerts.append(alert1)

    def record_log(
        self,
        level: LogLevel,
        component: str,
        message: str,
        workspace_id: str = "ws-101",
        trace_id: str | None = None,
        span_id: str | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> StructuredLogEntry:
        log_entry = StructuredLogEntry(
            log_id=f"log-{uuid4().hex[:6]}",
            workspace_id=workspace_id,
            mind_id=f"mind-{workspace_id}",
            level=level,
            component=component,
            message=message,
            trace_id=trace_id,
            span_id=span_id,
            metadata=metadata or {},
            timestamp=datetime.now(tz=UTC),
        )
        self._logs.append(log_entry)
        return log_entry

    def list_traces(self, workspace_id: str = "ws-101", limit: int = 50) -> list[TraceRecord]:
        traces = [t for t in self._traces.values() if t.workspace_id == workspace_id]
        traces.sort(key=lambda x: x.start_time, reverse=True)
        return traces[:limit]

    def get_trace(self, trace_id: str) -> TraceRecord:
        trace = self._traces.get(trace_id)
        if not trace:
            raise KeyError(f"Trace {trace_id} not found")
        return trace

    def list_logs(
        self,
        workspace_id: str = "ws-101",
        level: LogLevel | None = None,
        limit: int = 100,
    ) -> list[StructuredLogEntry]:
        logs = [entry for entry in self._logs if entry.workspace_id == workspace_id]
        if level:
            logs = [entry for entry in logs if entry.level == level]
        logs.sort(key=lambda x: x.timestamp, reverse=True)
        return logs[:limit]

    def get_health_scores(self) -> list[SubsystemHealth]:
        components = [
            ("Runtime State Machine", 42.0, 0.0, 0),
            ("Executive & Specialist Agents", 65.0, 0.01, 0),
            ("Vector & Episodic Memory", 120.0, 0.02, 1),
            ("Workflow Execution Engine", 55.0, 0.0, 0),
            ("Runtime Scheduler", 35.0, 0.0, 0),
            ("Tool Execution Sandbox", 85.0, 0.0, 0),
            ("Knowledge Graph Universe", 95.0, 0.0, 0),
            ("Platform Integrations", 110.0, 0.0, 0),
        ]

        subsystems: list[SubsystemHealth] = []
        for name, lat, err, al in components:
            sh = self.health_aggregator.compute_subsystem_health(
                component_name=name,
                latency_ms=lat,
                error_rate=err,
                active_alerts=al,
            )
            subsystems.append(sh)
        return subsystems

    def get_alerts(self, workspace_id: str = "ws-101") -> list[SystemAlert]:
        alerts = [a for a in self._alerts if a.workspace_id == workspace_id]
        alerts.sort(key=lambda x: x.timestamp, reverse=True)
        return alerts

    def export_opentelemetry(self, trace_id: str) -> dict[str, Any]:
        trace = self.get_trace(trace_id)
        return {
            "resourceSpans": [
                {
                    "resource": {
                        "attributes": [
                            {"key": "service.name", "value": {"stringValue": "OMNIA-Runtime"}},
                            {"key": "workspace.id", "value": {"stringValue": trace.workspace_id}},
                        ]
                    },
                    "scopeSpans": [
                        {
                            "scope": {"name": "omnia.runtime.tracer", "version": "1.0.0"},
                            "spans": [
                                {
                                    "traceId": s.trace_id,
                                    "spanId": s.span_id,
                                    "parentSpanId": s.parent_span_id,
                                    "name": s.name,
                                    "kind": s.span_type.value,
                                    "startTimeUnixNano": int(s.start_time.timestamp() * 1e9),
                                    "endTimeUnixNano": int(s.end_time.timestamp() * 1e9) if s.end_time else 0,
                                    "attributes": [{"key": k, "value": {"stringValue": str(v)}} for k, v in s.metadata.items()],
                                    "status": {"code": s.status},
                                }
                                for s in trace.spans
                            ],
                        }
                    ],
                }
            ]
        }

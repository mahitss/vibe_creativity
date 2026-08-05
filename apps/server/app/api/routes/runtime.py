"""FastAPI route handlers for OMNIA Runtime OS Kernel."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.runtime.domain import EventType
from app.modules.runtime.service import OmniaRuntimeEngine

router = APIRouter(tags=["runtime"])

_runtime_engine = OmniaRuntimeEngine()


def get_runtime_engine() -> OmniaRuntimeEngine:
    return _runtime_engine


class RunPayload(BaseModel):
    event_type: EventType = Field(default=EventType.MISSION_CREATED, description="Event type")
    payload: dict[str, Any] = Field(default_factory=dict, description="Event payload")


class EventDispatchPayload(BaseModel):
    event_type: EventType = Field(..., description="Event type to dispatch")
    payload: dict[str, Any] = Field(default_factory=dict, description="Event payload")
    source: str = Field(default="UI", description="Event source component")


def _format_step(s: Any) -> dict[str, Any]:
    return {
        "step_id": s.step_id,
        "agent_name": s.agent_name,
        "action": s.action,
        "reasoning": s.reasoning,
        "memory_grounding_ids": s.memory_grounding_ids,
        "duration_ms": s.duration_ms,
        "status": s.status,
        "timestamp": s.timestamp.isoformat(),
    }


def _format_trace(t: Any) -> dict[str, Any]:
    return {
        "trace_id": t.trace_id,
        "event_id": t.event_id,
        "state": t.state.value,
        "steps": [_format_step(s) for s in t.steps],
        "start_time": t.start_time.isoformat(),
        "end_time": t.end_time.isoformat() if t.end_time else None,
        "total_duration_ms": t.total_duration_ms,
    }


@router.post("/runtime/run")
async def execute_runtime_run(
    payload: RunPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: OmniaRuntimeEngine = Depends(get_runtime_engine),
) -> dict[str, Any]:
    trace = engine.execute_run(context.creator_id, payload.event_type, payload.payload)
    return _format_trace(trace)


@router.post("/runtime/event")
async def dispatch_runtime_event(
    payload: EventDispatchPayload,
    engine: OmniaRuntimeEngine = Depends(get_runtime_engine),
) -> dict[str, Any]:
    evt = engine.dispatch_event(payload.event_type, payload.payload, payload.source)
    return {
        "event_id": evt.event_id,
        "event_type": evt.event_type.value,
        "source": evt.source,
        "timestamp": evt.timestamp.isoformat(),
    }


@router.get("/runtime/status")
async def get_runtime_status(
    engine: OmniaRuntimeEngine = Depends(get_runtime_engine),
) -> dict[str, Any]:
    return engine.get_status()


@router.get("/runtime/history")
async def get_runtime_history(
    engine: OmniaRuntimeEngine = Depends(get_runtime_engine),
) -> list[dict[str, Any]]:
    history = engine.get_history()
    return [_format_trace(t) for t in history]


@router.get("/runtime/trace/{trace_id}")
async def get_runtime_trace_details(
    trace_id: str,
    engine: OmniaRuntimeEngine = Depends(get_runtime_engine),
) -> dict[str, Any]:
    try:
        trace = engine.get_trace(trace_id)
        return _format_trace(trace)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

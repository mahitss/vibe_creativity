"""FastAPI route handlers for OMNIA Runtime Event Bus System."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.event_bus.domain import (
    EventCategory,
    EventFilter,
    EventPriority,
    EventType,
    ReplayRequest,
)
from app.modules.event_bus.service import EventBusEngine

router = APIRouter(tags=["events"])

_event_bus_engine = EventBusEngine()


def get_event_bus_engine() -> EventBusEngine:
    return _event_bus_engine


class PublishEventPayload(BaseModel):
    event_type: EventType = Field(..., description="Event type")
    category: EventCategory = Field(default=EventCategory.RUNTIME, description="Event category")
    payload: dict[str, Any] = Field(default_factory=dict, description="Event payload")
    priority: EventPriority = Field(default=EventPriority.MEDIUM, description="Event priority")
    source_agent: str = Field(default="UI Dispatcher", description="Source agent name")


class ReplayPayload(BaseModel):
    range_type: str = Field(default="LAST_DAY", description="Range type: LAST_HOUR, LAST_DAY, LAST_WEEK, ALL")
    workspace_id: str = Field(default="ws-101", description="Workspace ID")
    filter_event_types: list[EventType] = Field(default_factory=list, description="Optional event type filter")


def _format_event(e: Any) -> dict[str, Any]:
    return {
        "event_id": e.event_id,
        "workspace_id": e.workspace_id,
        "mind_id": e.mind_id,
        "event_type": e.event_type.value,
        "category": e.category.value,
        "aggregate_type": e.aggregate_type,
        "aggregate_id": e.aggregate_id,
        "version": e.version,
        "timestamp": e.timestamp.isoformat(),
        "correlation_id": e.correlation_id,
        "causation_id": e.causation_id,
        "source_agent": e.source_agent,
        "priority": e.priority.value,
        "payload": e.payload,
        "metadata": e.metadata,
    }


@router.post("/runtime/events")
async def publish_event(
    payload: PublishEventPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: EventBusEngine = Depends(get_event_bus_engine),
) -> dict[str, Any]:
    evt = engine.create_and_publish(
        event_type=payload.event_type,
        category=payload.category,
        payload=payload.payload,
        workspace_id=context.creator_id,
        source_agent=payload.source_agent,
        priority=payload.priority,
    )
    return _format_event(evt)


@router.get("/runtime/events")
async def get_filtered_events(
    workspace_id: str | None = None,
    source_agent: str | None = None,
    limit: int = 50,
    engine: EventBusEngine = Depends(get_event_bus_engine),
) -> list[dict[str, Any]]:
    filter_spec = EventFilter(workspace_id=workspace_id, source_agent=source_agent)
    events = engine.query_history(filter_spec=filter_spec, limit=limit)
    return [_format_event(e) for e in events]


@router.get("/runtime/events/history")
async def get_events_history(
    limit: int = 100,
    engine: EventBusEngine = Depends(get_event_bus_engine),
) -> list[dict[str, Any]]:
    events = engine.query_history(limit=limit)
    return [_format_event(e) for e in events]


@router.post("/runtime/events/replay")
async def replay_events(
    payload: ReplayPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: EventBusEngine = Depends(get_event_bus_engine),
) -> dict[str, Any]:
    req = ReplayRequest(
        range_type=payload.range_type,
        workspace_id=context.creator_id,
        filter_event_types=payload.filter_event_types,
    )
    replayed = engine.replay(req)
    return {
        "status": "SUCCESS",
        "replayed_count": len(replayed),
        "replayed_events": [_format_event(e) for e in replayed],
    }

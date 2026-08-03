"""FastAPI routes for OMNIA Memory Ingestion Pipeline."""

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.ingestion.domain import EventSource, IngestionEventType
from app.modules.ingestion.service import MemoryIngestionService

router = APIRouter(tags=["ingestion"])

# Module singleton service instance
_ingestion_service = MemoryIngestionService()


def get_ingestion_service() -> MemoryIngestionService:
    return _ingestion_service


class SubmitEventRequest(BaseModel):
    event_type: IngestionEventType = Field(default=IngestionEventType.SYSTEM_OBSERVATION, description="Category type of event")
    source: EventSource = Field(default=EventSource.USER_ACTION, description="Origin source of event")
    title: str = Field(..., description="Title or event action name")
    description: str = Field(..., description="Detailed description of event context")
    payload: dict[str, object] = Field(default_factory=dict, description="Raw event payload metadata")


@router.post("/events")
async def submit_event(
    payload: SubmitEventRequest,
    context: CreatorContext = Depends(require_creator_context),
    service: MemoryIngestionService = Depends(get_ingestion_service),
) -> dict[str, object]:
    return service.submit_event(
        context.creator_id,
        event_type=payload.event_type,
        source=payload.source,
        title=payload.title,
        description=payload.description,
        payload=payload.payload,
    )


@router.get("/events")
async def list_events(
    status: str | None = Query(default="ALL"),
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: MemoryIngestionService = Depends(get_ingestion_service),
) -> list[dict[str, object]]:
    return service.get_events(context.creator_id, status=status, limit=limit)


@router.get("/events/history")
async def get_events_history(
    context: CreatorContext = Depends(require_creator_context),
    service: MemoryIngestionService = Depends(get_ingestion_service),
) -> list[dict[str, object]]:
    return service.get_history(context.creator_id)


@router.post("/memory/ingest")
async def trigger_memory_ingest(
    context: CreatorContext = Depends(require_creator_context),
    service: MemoryIngestionService = Depends(get_ingestion_service),
) -> dict[str, object]:
    return service.trigger_batch_ingest(context.creator_id)


@router.get("/memory/status")
async def get_memory_status(
    context: CreatorContext = Depends(require_creator_context),
    service: MemoryIngestionService = Depends(get_ingestion_service),
) -> dict[str, object]:
    return service.get_status_metrics(context.creator_id)

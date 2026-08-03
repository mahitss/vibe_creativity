"""FastAPI routes for OMNIA Living Memory Timeline & Interactive Memory Graph."""

from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.security import CreatorContext, require_creator_context
from app.modules.timeline.service import TimelineService

router = APIRouter(tags=["timeline"])

# Module singleton service instance
_timeline_service = TimelineService()


def get_timeline_service() -> TimelineService:
    return _timeline_service


@router.get("/timeline")
async def get_timeline(
    timeline_type: str | None = Query(default="ALL"),
    search: str | None = Query(default=None),
    bookmarked: bool = Query(default=False),
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> list[dict[str, object]]:
    return service.get_timeline(
        context.creator_id,
        timeline_type=timeline_type,
        search_query=search,
        bookmarked_only=bookmarked,
    )


@router.get("/timeline/event/{event_id}")
async def get_timeline_event(
    event_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> dict[str, object]:
    event = service.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    return event


@router.get("/timeline/playback")
async def get_timeline_playback(
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> list[dict[str, object]]:
    return service.get_playback(context.creator_id)


@router.get("/graph")
async def get_graph(
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> dict[str, object]:
    return service.get_graph_topology()


@router.get("/graph/node/{node_id}")
async def get_graph_node(
    node_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> dict[str, object]:
    node = service.get_graph_node(node_id)
    if not node:
        raise HTTPException(status_code=404, detail="Graph node not found")
    return node


@router.get("/graph/relationships")
async def get_graph_relationships(
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> list[dict[str, object]]:
    return service.get_relationships()


@router.post("/timeline/bookmark")
async def toggle_bookmark(
    event_id: str = Query(...),
    context: CreatorContext = Depends(require_creator_context),
    service: TimelineService = Depends(get_timeline_service),
) -> dict[str, object]:
    is_bookmarked = service.toggle_bookmark(event_id)
    return {"event_id": event_id, "is_bookmarked": is_bookmarked}

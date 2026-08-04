"""FastAPI routes for OMNIA Content Strategy Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.content.domain import ContentPriority, ContentState, ContentType
from app.modules.content.service import ContentStrategyEngine

router = APIRouter(prefix="/content", tags=["content"])

_content_engine = ContentStrategyEngine()


def get_content_engine() -> ContentStrategyEngine:
    return _content_engine


class CreateContentPayload(BaseModel):
    title: str = Field(..., description="Title of the content recommendation")
    description: str = Field(default="", description="Detailed description")
    content_type: ContentType = Field(default=ContentType.YOUTUBE_VIDEO, description="Type of content")
    platform: str = Field(default="YouTube", description="Target distribution platform")
    priority: ContentPriority = Field(default=ContentPriority.MEDIUM, description="Priority level")
    memory_links: list[str] = Field(default_factory=list, description="Grounding memory IDs")


class UpdateStatusPayload(BaseModel):
    content_id: str = Field(..., description="Target content item ID")
    status: ContentState = Field(..., description="Target pipeline state across 11 stages")


def _format_item(i: Any) -> dict[str, Any]:
    return {
        "id": i.id,
        "title": i.title,
        "description": i.description,
        "content_type": i.content_type.value,
        "platform": i.platform,
        "series_id": i.series_id,
        "priority": i.priority.value,
        "target_audience": i.target_audience,
        "status": i.status.value,
        "difficulty": i.difficulty,
        "estimated_time_hours": i.estimated_time_hours,
        "business_impact": i.business_impact,
        "audience_impact": i.audience_impact,
        "creator_id": i.creator_id,
        "created_at": i.created_at.isoformat(),
        "updated_at": i.updated_at.isoformat(),
        "deadline": i.deadline.isoformat() if i.deadline else None,
        "related_goals": i.related_goals,
        "dependencies": i.dependencies,
        "memory_links": i.memory_links,
        "score": i.score,
    }


@router.get("/ideas")
async def get_ideas(
    status: str | None = Query(default=None, description="Pipeline state filter"),
    priority: str | None = Query(default=None, description="Priority filter"),
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentStrategyEngine = Depends(get_content_engine),
) -> list[dict[str, Any]]:
    items = engine.get_ideas(context.creator_id, status=status, priority=priority)
    return [_format_item(i) for i in items]


@router.get("/roadmap")
async def get_roadmap(
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentStrategyEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    roadmap = engine.get_roadmap(context.creator_id)
    return {
        "today": [_format_item(i) for i in roadmap.today],
        "this_week": [_format_item(i) for i in roadmap.this_week],
        "this_month": [_format_item(i) for i in roadmap.this_month],
        "quarter_strategy": [_format_item(i) for i in roadmap.quarter_strategy],
    }


@router.get("/insights")
async def get_content_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentStrategyEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    gaps = engine.analyze_content_gaps(context.creator_id)
    series = engine.get_series_progress(context.creator_id)
    return {
        "content_gaps": [
            {
                "gap_type": g.gap_type,
                "description": g.description,
                "evidence": g.evidence,
                "suggested_action": g.suggested_action,
                "impact_score": g.impact_score,
            }
            for g in gaps
        ],
        "series_trackers": [
            {
                "series_id": s.series_id,
                "title": s.title,
                "total_episodes": s.total_episodes,
                "published_episodes": s.published_episodes,
                "overdue_episode": s.overdue_episode,
                "audience_waiting_count": s.audience_waiting_count,
                "next_episode_title": s.next_episode_title,
            }
            for s in series
        ],
    }


@router.post("/create")
async def create_content(
    payload: CreateContentPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentStrategyEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    item = engine.create_content(
        creator_id=context.creator_id,
        title=payload.title,
        description=payload.description,
        content_type=payload.content_type,
        platform=payload.platform,
        priority=payload.priority,
        memory_links=payload.memory_links,
    )
    return _format_item(item)


@router.patch("/status")
async def update_content_status(
    payload: UpdateStatusPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentStrategyEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    try:
        item = engine.update_status(context.creator_id, payload.content_id, payload.status)
        return _format_item(item)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

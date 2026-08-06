"""FastAPI route handlers for OMNIA Content Intelligence Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.content_intelligence.domain import (
    ContentAsset,
    ContentIdea,
    ContentPerformance,
    ContentState,
    RepurposeFormat,
    RepurposeJob,
)
from app.modules.content_intelligence.service import ContentIntelligenceEngine

router = APIRouter(prefix="/content_intelligence", tags=["content_intelligence"])

_content_engine = ContentIntelligenceEngine()


def get_content_engine() -> ContentIntelligenceEngine:
    return _content_engine


class RepurposePayload(BaseModel):
    content_id: str = Field(..., description="Source content asset ID")
    target_format: RepurposeFormat = Field(..., description="Derivative format")
    target_platform: str = Field(..., description="Target platform")


class UpdateStatusPayload(BaseModel):
    content_id: str = Field(..., description="Target content asset ID")
    status: ContentState = Field(..., description="New lifecycle state")


def _format_asset(c: ContentAsset) -> dict[str, Any]:
    return {
        "content_id": c.content_id,
        "workspace_id": c.workspace_id,
        "title": c.title,
        "description": c.description,
        "platform": c.platform,
        "content_type": c.content_type.value,
        "series": c.series,
        "topics": c.topics,
        "audience": c.audience,
        "status": c.status.value,
        "publish_date": c.publish_date.isoformat(),
        "performance_metrics": c.performance_metrics,
        "related_memories": c.related_memories,
        "created_at": c.created_at.isoformat(),
    }


def _format_job(j: RepurposeJob) -> dict[str, Any]:
    return {
        "job_id": j.job_id,
        "source_content_id": j.source_content_id,
        "target_format": j.target_format.value,
        "target_platform": j.target_platform,
        "output_draft": j.output_draft,
        "confidence": j.confidence,
        "source_link": j.source_link,
        "created_at": j.created_at.isoformat(),
    }


def _format_idea(i: ContentIdea) -> dict[str, Any]:
    return {
        "idea_id": i.idea_id,
        "title": i.title,
        "reasoning": i.reasoning,
        "source_signal": i.source_signal,
        "estimated_impact": i.estimated_impact,
    }


def _format_performance(p: ContentPerformance) -> dict[str, Any]:
    return {
        "content_id": p.content_id,
        "views": p.views,
        "engagement_rate": p.engagement_rate,
        "retention_pct": p.retention_pct,
        "conversions": p.conversions,
        "revenue_generated": p.revenue_generated,
    }


@router.get("")
async def list_content_library(
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> list[dict[str, Any]]:
    items = engine.get_content_library(workspace_id=context.creator_id)
    return [_format_asset(c) for c in items]


@router.get("/calendar")
async def get_calendar(
    context: CreatorContext = Depends(require_creator_context),
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> list[dict[str, Any]]:
    return engine.get_calendar(workspace_id=context.creator_id)


@router.get("/ideas")
async def list_ideas(
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> list[dict[str, Any]]:
    ideas = engine.get_ideas()
    return [_format_idea(i) for i in ideas]


@router.post("/repurpose")
async def repurpose_content(
    payload: RepurposePayload,
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    try:
        job = engine.repurpose_content(
            content_id=payload.content_id,
            target_format=payload.target_format,
            target_platform=payload.target_platform,
        )
        return _format_job(job)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/status")
async def update_status(
    payload: UpdateStatusPayload,
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    try:
        asset = engine.update_status(content_id=payload.content_id, status=payload.status)
        return _format_asset(asset)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/performance")
async def get_performance(
    content_id: str = "cnt-101",
    engine: ContentIntelligenceEngine = Depends(get_content_engine),
) -> dict[str, Any]:
    perf = engine.get_performance(content_id=content_id)
    return _format_performance(perf)

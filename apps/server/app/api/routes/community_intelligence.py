"""FastAPI route handlers for OMNIA Community Intelligence Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.community_intelligence.domain import (
    CommunityHealthMetrics,
    CommunityMember,
    ModerationRecommendation,
    TopicCluster,
    VIPStatus,
)
from app.modules.community_intelligence.service import CommunityIntelligenceEngine

router = APIRouter(prefix="/community_intelligence", tags=["community_intelligence"])

_community_engine = CommunityIntelligenceEngine()


def get_community_engine() -> CommunityIntelligenceEngine:
    return _community_engine


class ModerationPayload(BaseModel):
    item_id: str = Field(..., description="Target comment or post ID")
    member_id: str = Field(..., description="Author member ID")
    content: str = Field(..., description="Text content to evaluate")


def _format_member(m: CommunityMember) -> dict[str, Any]:
    return {
        "member_id": m.member_id,
        "workspace_id": m.workspace_id,
        "platform": m.platform,
        "display_name": m.display_name,
        "username": m.username,
        "relationship_score": m.relationship_score,
        "trust_score": m.trust_score,
        "vip_status": m.vip_status.value,
        "topics": m.topics,
        "sentiment_trend": m.sentiment_trend.value,
        "memory_links": m.memory_links,
        "last_interaction": m.last_interaction.isoformat(),
    }


def _format_topic(t: TopicCluster) -> dict[str, Any]:
    return {
        "topic_id": t.topic_id,
        "category": t.category.value,
        "title": t.title,
        "request_count": t.request_count,
        "sentiment_score": t.sentiment_score,
        "related_memories": t.related_memories,
    }


def _format_health(h: CommunityHealthMetrics) -> dict[str, Any]:
    return {
        "engagement_score": h.engagement_score,
        "positive_sentiment_pct": h.positive_sentiment_pct,
        "negative_sentiment_pct": h.negative_sentiment_pct,
        "response_time_hours": h.response_time_hours,
        "creator_participation_pct": h.creator_participation_pct,
        "spam_rate_pct": h.spam_rate_pct,
    }


def _format_moderation(r: ModerationRecommendation) -> dict[str, Any]:
    return {
        "item_id": r.item_id,
        "member_id": r.member_id,
        "content": r.content,
        "flagged": r.flagged,
        "reason": r.reason,
        "recommended_action": r.recommended_action,
        "confidence": r.confidence,
        "context_notes": r.context_notes,
    }


@router.get("")
async def get_community_summary(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    health = engine.get_health_metrics(workspace_id=context.creator_id)
    topics = engine.get_topics()
    members = engine.get_members(workspace_id=context.creator_id)
    return {
        "workspace_id": context.creator_id,
        "health": _format_health(health),
        "total_members": len(members),
        "top_topics": [_format_topic(t) for t in topics],
        "top_advocates": [_format_member(m) for m in members[:3]],
    }


@router.get("/members")
async def list_members(
    vip_status: VIPStatus | None = None,
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> list[dict[str, Any]]:
    members = engine.get_members(workspace_id=context.creator_id, vip_filter=vip_status)
    return [_format_member(m) for m in members]


@router.get("/member/{member_id}")
async def get_member_details(
    member_id: str,
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    try:
        member = engine.get_member(member_id)
        return _format_member(member)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/topics")
async def list_topics(
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> list[dict[str, Any]]:
    topics = engine.get_topics()
    return [_format_topic(t) for t in topics]


@router.get("/health")
async def get_health(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    health = engine.get_health_metrics(workspace_id=context.creator_id)
    return _format_health(health)


@router.get("/insights")
async def get_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> list[dict[str, Any]]:
    return engine.get_insights(workspace_id=context.creator_id)


@router.post("/moderation/recommend")
async def recommend_moderation(
    payload: ModerationPayload,
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    res = engine.recommend_moderation(
        item_id=payload.item_id,
        member_id=payload.member_id,
        content=payload.content,
    )
    return _format_moderation(res)

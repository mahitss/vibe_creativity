"""FastAPI routes for OMNIA Community Intelligence Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.community.service import CommunityIntelligenceEngine

router = APIRouter(prefix="/community", tags=["community"])

_community_engine = CommunityIntelligenceEngine()


def get_community_engine() -> CommunityIntelligenceEngine:
    return _community_engine


class ModerationSuggestPayload(BaseModel):
    target_user: str = Field(..., description="Target username")
    comment_text: str = Field(..., description="Comment text to analyze")


def _format_member(m: Any) -> dict[str, Any]:
    return {
        "id": m.id,
        "platform": m.platform,
        "username": m.username,
        "display_name": m.display_name,
        "profile_url": m.profile_url,
        "join_date": m.join_date.isoformat(),
        "follower_status": m.follower_status,
        "vip_status": m.vip_status.value,
        "creator_relationship_score": m.creator_relationship_score,
        "trust_score": m.trust_score,
        "sentiment_history": m.sentiment_history,
        "interaction_count": m.interaction_count,
        "creator_id": m.creator_id,
        "last_interaction": m.last_interaction.isoformat(),
        "favorite_topics": m.favorite_topics,
        "repeated_questions": m.repeated_questions,
        "moderation_history": m.moderation_history,
        "achievements": m.achievements,
        "knowledge_graph_links": m.knowledge_graph_links,
        "memory_references": m.memory_references,
    }


@router.get("")
async def get_community_overview(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    members = engine.get_members(context.creator_id)
    vips = engine.identify_vips(context.creator_id)
    health = engine.calculate_community_health(context.creator_id)
    alerts = engine.detect_behavior_changes(context.creator_id)

    return {
        "total_members": 12450,
        "active_vips": len(vips),
        "health_score": health.overall_score,
        "behavior_alerts_count": len(alerts),
        "top_members": [_format_member(m) for m in members[:5]],
    }


@router.get("/members")
async def list_members(
    vip_status: str | None = Query(default=None, description="VIP status filter"),
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> list[dict[str, Any]]:
    members = engine.get_members(context.creator_id, vip_status=vip_status)
    return [_format_member(m) for m in members]


@router.get("/health")
async def get_community_health(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    h = engine.calculate_community_health(context.creator_id)
    return {
        "overall_score": h.overall_score,
        "positivity_score": h.positivity_score,
        "participation_score": h.participation_score,
        "response_time_minutes": h.response_time_minutes,
        "creator_engagement_rate": h.creator_engagement_rate,
        "retention_rate": h.retention_rate,
        "conflict_level": h.conflict_level,
        "spam_rate": h.spam_rate,
    }


@router.get("/insights")
async def get_community_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    alerts = engine.detect_behavior_changes(context.creator_id)
    vips = engine.identify_vips(context.creator_id)

    return {
        "most_requested_topics": ["Docker Multi-Agent Systems", "React Part 5", "PostgreSQL Indexing"],
        "behavior_change_alerts": [
            {
                "id": a.id,
                "member_id": a.member_id,
                "username": a.username,
                "event_type": a.event_type,
                "description": a.description,
                "evidence": a.evidence,
                "suggested_action": a.suggested_action,
            }
            for a in alerts
        ],
        "vip_highlights": [_format_member(v) for v in vips],
    }


@router.get("/member/{member_id}")
async def get_member_detail(
    member_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    member = engine.get_member_detail(member_id)
    if not member:
        raise HTTPException(status_code=404, detail=f"Member {member_id} not found")
    return _format_member(member)


@router.post("/moderation/suggest")
async def suggest_moderation(
    payload: ModerationSuggestPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: CommunityIntelligenceEngine = Depends(get_community_engine),
) -> dict[str, Any]:
    sug = engine.generate_moderation_suggestion(context.creator_id, payload.target_user, payload.comment_text)
    return {
        "suggestion_id": sug.suggestion_id,
        "target_user": sug.target_user,
        "context": sug.context,
        "action_recommended": sug.action_recommended,
        "reasoning": sug.reasoning,
        "memory_citations": sug.memory_citations,
        "requires_approval": sug.requires_approval,
    }

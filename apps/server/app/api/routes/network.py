"""FastAPI route handlers for OMNIA AI Creator Network Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.network.domain import (
    CampaignType,
    CreatorPlaybook,
    CreatorRecommendation,
    SharedCampaign,
    VerifiedCreator,
)
from app.modules.network.service import NetworkEngine

router = APIRouter(prefix="/network", tags=["network"])

_network_engine = NetworkEngine()


def get_network_engine() -> NetworkEngine:
    return _network_engine


class ProposeCampaignPayload(BaseModel):
    title: str = Field(..., description="Joint campaign title")
    campaign_type: CampaignType = Field(default=CampaignType.JOINT_VIDEO, description="Campaign type")
    creator_ids: list[str] = Field(..., description="Participating creator IDs")
    target_date: str = Field(default="2026-09-15", description="Target release date")


def _format_creator(c: VerifiedCreator) -> dict[str, Any]:
    return {
        "creator_id": c.creator_id,
        "display_name": c.display_name,
        "handle": c.handle,
        "primary_topics": c.primary_topics,
        "audience_size": c.audience_size,
        "reputation_score": c.reputation_score,
        "verified": c.verified,
    }


def _format_rec(r: CreatorRecommendation) -> dict[str, Any]:
    return {
        "rec_id": r.rec_id,
        "target_creator_id": r.target_creator_id,
        "matched_creator_id": r.matched_creator_id,
        "topic_overlap": r.topic_overlap,
        "audience_overlap_pct": r.audience_overlap_pct,
        "executive_reasoning": r.executive_reasoning,
    }


def _format_campaign(cmp: SharedCampaign) -> dict[str, Any]:
    return {
        "campaign_id": cmp.campaign_id,
        "title": cmp.title,
        "campaign_type": cmp.campaign_type.value,
        "creator_ids": cmp.creator_ids,
        "status": cmp.status,
        "target_date": cmp.target_date,
        "created_at": cmp.created_at.isoformat(),
    }


def _format_playbook(pb: CreatorPlaybook) -> dict[str, Any]:
    return {
        "playbook_id": pb.playbook_id,
        "title": pb.title,
        "playbook_type": pb.playbook_type.value,
        "author_id": pb.author_id,
        "downloads": pb.downloads,
        "rating": pb.rating,
        "created_at": pb.created_at.isoformat(),
    }


@router.get("/creators")
async def list_verified_creators(
    engine: NetworkEngine = Depends(get_network_engine),
) -> list[dict[str, Any]]:
    creators = engine.get_verified_creators()
    return [_format_creator(c) for c in creators]


@router.get("/recommendations")
async def get_collaboration_recommendations(
    context: CreatorContext = Depends(require_creator_context),
    engine: NetworkEngine = Depends(get_network_engine),
) -> list[dict[str, Any]]:
    recs = engine.get_recommendations(creator_id=context.creator_id)
    return [_format_rec(r) for r in recs]


@router.post("/campaigns")
async def propose_shared_campaign(
    payload: ProposeCampaignPayload,
    engine: NetworkEngine = Depends(get_network_engine),
) -> dict[str, Any]:
    camp = engine.propose_campaign(
        title=payload.title,
        campaign_type=payload.campaign_type,
        creator_ids=payload.creator_ids,
        target_date=payload.target_date,
    )
    return _format_campaign(camp)


@router.get("/reputation")
async def get_creator_reputation(
    context: CreatorContext = Depends(require_creator_context),
    engine: NetworkEngine = Depends(get_network_engine),
) -> dict[str, Any]:
    return engine.get_reputation(creator_id=context.creator_id)


@router.get("/playbooks")
async def list_creator_playbooks(
    engine: NetworkEngine = Depends(get_network_engine),
) -> list[dict[str, Any]]:
    playbooks = engine.get_playbooks()
    return [_format_playbook(pb) for pb in playbooks]

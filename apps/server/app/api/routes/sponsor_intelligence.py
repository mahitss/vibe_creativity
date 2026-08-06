"""FastAPI route handlers for OMNIA Sponsor Intelligence Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.sponsor_intelligence.domain import (
    CampaignStatus,
    FollowupDraft,
    SponsorCampaign,
    SponsorOpportunity,
    SponsorProfile,
)
from app.modules.sponsor_intelligence.service import SponsorIntelligenceEngine

router = APIRouter(prefix="/sponsor_intelligence", tags=["sponsor_intelligence"])

_sponsor_engine = SponsorIntelligenceEngine()


def get_sponsor_engine() -> SponsorIntelligenceEngine:
    return _sponsor_engine


class GenerateFollowupPayload(BaseModel):
    sponsor_id: str = Field(..., description="Target sponsor ID for AI follow-up draft")


class UpdateCampaignPayload(BaseModel):
    status: CampaignStatus | None = Field(default=None, description="New campaign status")
    approval_state: str | None = Field(default=None, description="New approval state string")


def _format_sponsor(s: SponsorProfile) -> dict[str, Any]:
    return {
        "sponsor_id": s.sponsor_id,
        "workspace_id": s.workspace_id,
        "company": s.company,
        "brand": s.brand,
        "industry": s.industry,
        "primary_contact": s.primary_contact,
        "email": s.email,
        "website": s.website,
        "status": s.status.value,
        "relationship_score": s.relationship_score,
        "trust_score": s.trust_score,
        "revenue_generated": s.revenue_generated,
        "active_campaigns": s.active_campaigns,
        "memory_links": s.memory_links,
        "created_at": s.created_at.isoformat(),
    }


def _format_opportunity(o: SponsorOpportunity) -> dict[str, Any]:
    return {
        "opportunity_id": o.opportunity_id,
        "brand_name": o.brand_name,
        "industry": o.industry,
        "estimated_deal_value": o.estimated_deal_value,
        "confidence": o.confidence,
        "match_reason": o.match_reason,
    }


def _format_followup(f: FollowupDraft) -> dict[str, Any]:
    return {
        "draft_id": f.draft_id,
        "sponsor_id": f.sponsor_id,
        "subject": f.subject,
        "body": f.body,
        "suggested_timing": f.suggested_timing,
    }


def _format_campaign(c: SponsorCampaign) -> dict[str, Any]:
    return {
        "campaign_id": c.campaign_id,
        "sponsor_id": c.sponsor_id,
        "deliverables": c.deliverables,
        "platforms": c.platforms,
        "budget": c.budget,
        "status": c.status.value,
        "approval_state": c.approval_state,
        "performance_metrics": c.performance_metrics,
    }


@router.get("")
async def list_sponsors(
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> list[dict[str, Any]]:
    sponsors = engine.get_sponsors(workspace_id=context.creator_id)
    return [_format_sponsor(s) for s in sponsors]


@router.get("/pipeline")
async def get_pipeline(
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, list[dict[str, Any]]]:
    return engine.get_pipeline(workspace_id=context.creator_id)


@router.get("/opportunities")
async def list_opportunities(
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> list[dict[str, Any]]:
    opps = engine.get_opportunities()
    return [_format_opportunity(o) for o in opps]


@router.post("/followup")
async def generate_followup(
    payload: GenerateFollowupPayload,
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    try:
        draft = engine.generate_followup(sponsor_id=payload.sponsor_id)
        return _format_followup(draft)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/{sponsor_id}")
async def get_sponsor_details(
    sponsor_id: str,
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    try:
        sp = engine.get_sponsor(sponsor_id)
        return _format_sponsor(sp)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/campaigns/{campaign_id}")
async def update_campaign(
    campaign_id: str,
    payload: UpdateCampaignPayload,
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    try:
        cmp = engine.update_campaign(
            campaign_id=campaign_id,
            status=payload.status,
            approval_state=payload.approval_state,
        )
        return _format_campaign(cmp)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

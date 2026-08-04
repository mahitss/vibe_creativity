"""FastAPI routes for OMNIA Sponsor Intelligence Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.sponsors.domain import SponsorStatus
from app.modules.sponsors.service import SponsorIntelligenceEngine

router = APIRouter(prefix="/sponsors", tags=["sponsors"])

_sponsor_engine = SponsorIntelligenceEngine()


def get_sponsor_engine() -> SponsorIntelligenceEngine:
    return _sponsor_engine


class CreateSponsorPayload(BaseModel):
    company_name: str = Field(..., description="Company name")
    brand: str = Field(..., description="Brand name")
    industry: str = Field(..., description="Industry sector")
    primary_contact: str = Field(..., description="Contact person name")
    email: str = Field(..., description="Contact email")
    offered_price: float = Field(default=10000.0, description="Offered sponsorship price")


class UpdateSponsorStatusPayload(BaseModel):
    status: SponsorStatus = Field(..., description="Target pipeline status")


class FollowupDraftPayload(BaseModel):
    sponsor_id: str = Field(..., description="Target sponsor ID")


def _format_entity(s: Any) -> dict[str, Any]:
    return {
        "id": s.id,
        "company_name": s.company_name,
        "brand": s.brand,
        "industry": s.industry,
        "primary_contact": s.primary_contact,
        "email": s.email,
        "website": s.website,
        "country": s.country,
        "status": s.status.value,
        "relationship_score": s.relationship_score,
        "trust_score": s.trust_score,
        "lifetime_value": s.lifetime_value,
        "creator_id": s.creator_id,
        "first_contact": s.first_contact.isoformat(),
        "last_interaction": s.last_interaction.isoformat(),
        "negotiation_terms": {
            "offered_price": s.negotiation_terms.offered_price,
            "counter_offer": s.negotiation_terms.counter_offer,
            "deliverables": s.negotiation_terms.deliverables,
            "usage_rights": s.negotiation_terms.usage_rights,
            "exclusivity_days": s.negotiation_terms.exclusivity_days,
            "payment_terms": s.negotiation_terms.payment_terms,
            "special_requests": s.negotiation_terms.special_requests,
        },
        "campaign_history": s.campaign_history,
        "notes": s.notes,
        "memory_references": s.memory_references,
        "knowledge_graph_links": s.knowledge_graph_links,
    }


@router.get("")
async def list_sponsors(
    status: str | None = Query(default=None, description="Pipeline stage filter"),
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> list[dict[str, Any]]:
    sponsors = engine.get_sponsors(context.creator_id, status=status)
    return [_format_entity(s) for s in sponsors]


@router.get("/opportunities")
async def get_opportunities(
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> list[dict[str, Any]]:
    opps = engine.discover_opportunities(context.creator_id)
    return [
        {
            "id": o.id,
            "brand_name": o.brand_name,
            "industry": o.industry,
            "niche_match_score": o.niche_match_score,
            "estimated_value": o.estimated_value,
            "reason": o.reason,
            "suggested_action": o.suggested_action,
        }
        for o in opps
    ]


@router.get("/pipeline")
async def get_pipeline_summary(
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    sponsors = engine.get_sponsors(context.creator_id)
    risks = engine.detect_risks(context.creator_id)

    stages = {}
    for stage in SponsorStatus:
        matching = [s for s in sponsors if s.status == stage]
        stages[stage.value] = {
            "count": len(matching),
            "total_value": sum(s.lifetime_value for s in matching),
            "sponsors": [_format_entity(s) for s in matching],
        }

    return {
        "total_active_sponsors": len(sponsors),
        "total_lifetime_value": sum(s.lifetime_value for s in sponsors),
        "risk_alerts": [
            {
                "id": r.id,
                "risk_type": r.risk_type.value,
                "sponsor_id": r.sponsor_id,
                "company_name": r.company_name,
                "severity": r.severity,
                "message": r.message,
                "suggested_action": r.suggested_action,
            }
            for r in risks
        ],
        "pipeline_stages": stages,
    }


@router.get("/{sponsor_id}")
async def get_sponsor_detail(
    sponsor_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    sponsor = engine.get_sponsor_detail(sponsor_id)
    if not sponsor:
        raise HTTPException(status_code=404, detail=f"Sponsor {sponsor_id} not found")
    return _format_entity(sponsor)


@router.post("")
async def create_sponsor(
    payload: CreateSponsorPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    sponsor = engine.create_sponsor(
        creator_id=context.creator_id,
        company_name=payload.company_name,
        brand=payload.brand,
        industry=payload.industry,
        primary_contact=payload.primary_contact,
        email=payload.email,
        offered_price=payload.offered_price,
    )
    return _format_entity(sponsor)


@router.patch("/{sponsor_id}")
async def update_sponsor_status(
    sponsor_id: str,
    payload: UpdateSponsorStatusPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    try:
        sponsor = engine.update_status(context.creator_id, sponsor_id, payload.status)
        return _format_entity(sponsor)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/followup")
async def generate_followup(
    payload: FollowupDraftPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SponsorIntelligenceEngine = Depends(get_sponsor_engine),
) -> dict[str, Any]:
    try:
        return engine.generate_followup_draft(context.creator_id, payload.sponsor_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

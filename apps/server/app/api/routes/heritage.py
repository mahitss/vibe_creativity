"""FastAPI route handlers for OMNIA 2045 Living Heritage Charter Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.modules.heritage.domain import (
    ConstitutionCharter,
    HeritageMetrics,
    ProposalValidationResult,
)
from app.modules.heritage.service import OmniaHeritageService

router = APIRouter(prefix="/heritage", tags=["heritage"])

_heritage_service = OmniaHeritageService()


def get_heritage_service() -> OmniaHeritageService:
    return _heritage_service


class ValidateProposalPayload(BaseModel):
    title: str = Field(..., description="RFC Proposal Title")
    description: str = Field(..., description="Full architecture RFC specification text")


def _format_charter(c: ConstitutionCharter) -> dict[str, Any]:
    return {
        "charter_id": c.charter_id,
        "principles": c.principles,
        "ratified_year": c.ratified_year,
        "version": c.version,
        "steward_signature": c.steward_signature,
    }


def _format_metrics(m: HeritageMetrics) -> dict[str, Any]:
    return {
        "total_contributors": m.total_contributors,
        "businesses_powered": m.businesses_powered,
        "university_courses": m.university_courses,
        "research_citations": m.research_citations,
        "years_active": m.years_active,
    }


def _format_result(r: ProposalValidationResult) -> dict[str, Any]:
    return {
        "proposal_id": r.proposal_id,
        "title": r.title,
        "is_aligned": r.is_aligned,
        "violated_principles": r.violated_principles,
        "rationale": r.rationale,
        "checked_at": r.checked_at.isoformat(),
    }


@router.get("/constitution")
async def get_constitution(
    service: OmniaHeritageService = Depends(get_heritage_service),
) -> dict[str, Any]:
    charter = service.get_constitution()
    return _format_charter(charter)


@router.get("/metrics")
async def get_heritage_metrics(
    service: OmniaHeritageService = Depends(get_heritage_service),
) -> dict[str, Any]:
    metrics = service.get_metrics()
    return _format_metrics(metrics)


@router.post("/validate-proposal")
async def validate_proposal(
    payload: ValidateProposalPayload,
    service: OmniaHeritageService = Depends(get_heritage_service),
) -> dict[str, Any]:
    res = service.validate_proposal(title=payload.title, description=payload.description)
    return _format_result(res)

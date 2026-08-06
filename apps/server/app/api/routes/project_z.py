"""FastAPI route handlers for PROJECT Z (Year 2100): The Final Philosophy Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.project_z.domain import (
    HumanLoopCycle,
    HumanLoopStage,
    ProjectZSuccessMetrics,
    ThreeLawsVerification,
)
from app.modules.project_z.service import ProjectZService

router = APIRouter(prefix="/project-z", tags=["project_z"])

_project_z_service = ProjectZService()


def get_project_z_service() -> ProjectZService:
    return _project_z_service


class AdvanceHumanLoopPayload(BaseModel):
    current_stage: HumanLoopStage = Field(..., description="Current stage in 8-step Human Loop")


class VerifyCompliancePayload(BaseModel):
    agency_preserved: bool = Field(..., description="Law 1: Reduces effort, never human agency")
    user_ownership_guaranteed: bool = Field(..., description="Law 2: User owns memories and work")
    explanation_provided: bool = Field(..., description="Law 3: Cites evidence, zero blind trust")


def _format_verification(v: ThreeLawsVerification) -> dict[str, Any]:
    return {
        "law_1_agency_preserved": v.law_1_agency_preserved,
        "law_2_user_ownership_guaranteed": v.law_2_user_ownership_guaranteed,
        "law_3_explanation_provided": v.law_3_explanation_provided,
        "complies": v.complies,
        "verified_at": v.verified_at.isoformat(),
    }


def _format_cycle(c: HumanLoopCycle) -> dict[str, Any]:
    return {
        "cycle_id": c.cycle_id,
        "creator_id": c.creator_id,
        "current_stage": c.current_stage.value,
        "next_stage": c.next_stage.value,
        "acceleration_factor": c.acceleration_factor,
        "destination_defined_by_human": c.destination_defined_by_human,
    }


def _format_metrics(m: ProjectZSuccessMetrics) -> dict[str, Any]:
    return {
        "people_learned_faster": m.people_learned_faster,
        "meaningful_creations": m.meaningful_creations,
        "businesses_started": m.businesses_started,
        "research_published": m.research_published,
        "communities_built": m.communities_built,
        "problems_solved": m.problems_solved,
        "humans_helped": m.humans_helped,
    }


@router.get("/three-laws")
async def get_three_laws(
    service: ProjectZService = Depends(get_project_z_service),
) -> dict[str, Any]:
    return service.get_three_laws()


@router.post("/human-loop/step")
async def advance_human_loop_stage(
    payload: AdvanceHumanLoopPayload,
    context: CreatorContext = Depends(require_creator_context),
    service: ProjectZService = Depends(get_project_z_service),
) -> dict[str, Any]:
    cycle = service.advance_human_loop(creator_id=context.creator_id, current_stage=payload.current_stage)
    return _format_cycle(cycle)


@router.get("/impact-metrics")
async def get_human_impact_metrics(
    service: ProjectZService = Depends(get_project_z_service),
) -> dict[str, Any]:
    m = service.get_impact_metrics()
    return _format_metrics(m)


@router.post("/verify-compliance")
async def verify_compliance(
    payload: VerifyCompliancePayload,
    service: ProjectZService = Depends(get_project_z_service),
) -> dict[str, Any]:
    v = service.verify_compliance(
        agency_preserved=payload.agency_preserved,
        user_ownership_guaranteed=payload.user_ownership_guaranteed,
        explanation_provided=payload.explanation_provided,
    )
    return _format_verification(v)

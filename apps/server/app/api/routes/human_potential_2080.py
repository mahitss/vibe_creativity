"""FastAPI route handlers for OMNIA 2080 Human Potential Amplification Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.human_potential_2080.domain import (
    GenerationalKnowledgeArchive,
    HumanAmplificationMetrics,
    HumanDecisionAudit,
)
from app.modules.human_potential_2080.service import OmniaHumanPotential2080Service

router = APIRouter(prefix="/human-potential", tags=["human_potential_2080"])

_human_potential_service = OmniaHumanPotential2080Service()


def get_human_potential_service() -> OmniaHumanPotential2080Service:
    return _human_potential_service


class PreserveKnowledgePayload(BaseModel):
    title: str = Field(..., description="Knowledge title e.g. Quantum Computing Standard")
    creator_lineage: str = Field(..., description="Lineage / Attribution e.g. OMNIA Fellows 2080")


class RequestDecisionPayload(BaseModel):
    action_proposed: str = Field(..., description="Action e.g. Publish Multi-Sector Enterprise Campaign")
    reasoning_explanation: str = Field(..., description="Full explanation cite memory IDs and evidence")


def _format_metrics(m: HumanAmplificationMetrics) -> dict[str, Any]:
    return {
        "baseline_capability": m.baseline_capability,
        "amplified_capability": m.amplified_capability,
        "amplification_multiplier": m.amplification_multiplier,
        "human_agency_score": m.human_agency_score,
    }


def _format_archive(a: GenerationalKnowledgeArchive) -> dict[str, Any]:
    return {
        "archive_id": a.archive_id,
        "title": a.title,
        "creator_lineage": a.creator_lineage,
        "preservation_tier": a.preservation_tier,
        "evidence_nodes_count": a.evidence_nodes_count,
        "preserved_at": a.preserved_at.isoformat(),
    }


def _format_audit(d: HumanDecisionAudit) -> dict[str, Any]:
    return {
        "decision_id": d.decision_id,
        "action_proposed": d.action_proposed,
        "human_approver_id": d.human_approver_id,
        "reasoning_explanation": d.reasoning_explanation,
        "approved": d.approved,
        "timestamp": d.timestamp.isoformat(),
    }


@router.get("/amplification")
async def get_amplification_metrics(
    service: OmniaHumanPotential2080Service = Depends(get_human_potential_service),
) -> dict[str, Any]:
    m = service.get_amplification_metrics()
    return _format_metrics(m)


@router.post("/preserve-knowledge")
async def preserve_knowledge(
    payload: PreserveKnowledgePayload,
    service: OmniaHumanPotential2080Service = Depends(get_human_potential_service),
) -> dict[str, Any]:
    arch = service.preserve_knowledge(title=payload.title, creator_lineage=payload.creator_lineage)
    return _format_archive(arch)


@router.post("/request-decision")
async def request_decision(
    payload: RequestDecisionPayload,
    context: CreatorContext = Depends(require_creator_context),
    service: OmniaHumanPotential2080Service = Depends(get_human_potential_service),
) -> dict[str, Any]:
    aud = service.request_decision(
        action_proposed=payload.action_proposed,
        human_approver_id=context.creator_id,
        reasoning_explanation=payload.reasoning_explanation,
    )
    return _format_audit(aud)


@router.get("/archives")
async def list_archives(
    service: OmniaHumanPotential2080Service = Depends(get_human_potential_service),
) -> list[dict[str, Any]]:
    archives = service.list_archives()
    return [_format_archive(a) for a in archives]

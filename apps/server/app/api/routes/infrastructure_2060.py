"""FastAPI route handlers for OMNIA 2060 Universal Digital Infrastructure Grid Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.infrastructure_2060.domain import (
    InfrastructureGridTelemetry,
    PersonalizedLearningSession,
    ScientificDiscoveryRequest,
)
from app.modules.infrastructure_2060.service import OmniaInfrastructure2060Service

router = APIRouter(prefix="/infrastructure", tags=["infrastructure_2060"])

_infra_service = OmniaInfrastructure2060Service()


def get_infra_service() -> OmniaInfrastructure2060Service:
    return _infra_service


class ScientificReasoningPayload(BaseModel):
    domain: str = Field(..., description="Research field e.g. Quantum Physics, Synthetic Biology")
    hypothesis: str = Field(..., description="Testable scientific hypothesis")


class LearningSessionPayload(BaseModel):
    topic: str = Field(..., description="Educational topic e.g. Autonomous AI Operating Systems")


def _format_telemetry(t: InfrastructureGridTelemetry) -> dict[str, Any]:
    return {
        "global_nodes_active": t.global_nodes_active,
        "requests_processed_trillions": t.requests_processed_trillions,
        "avg_latency_ms": t.avg_latency_ms,
        "uptime_pct": t.uptime_pct,
        "privacy_guarantee_level": t.privacy_guarantee_level,
    }


def _format_discovery(d: ScientificDiscoveryRequest) -> dict[str, Any]:
    return {
        "discovery_id": d.discovery_id,
        "domain": d.domain,
        "hypothesis": d.hypothesis,
        "reasoning_trace": d.reasoning_trace,
        "confidence": d.confidence,
        "created_at": d.created_at.isoformat(),
    }


def _format_session(s: PersonalizedLearningSession) -> dict[str, Any]:
    return {
        "session_id": s.session_id,
        "student_id": s.student_id,
        "topic": s.topic,
        "mastery_pct": s.mastery_pct,
        "engagement_score": s.engagement_score,
        "started_at": s.started_at.isoformat(),
    }


@router.get("/telemetry")
async def get_grid_telemetry(
    service: OmniaInfrastructure2060Service = Depends(get_infra_service),
) -> dict[str, Any]:
    t = service.get_telemetry()
    return _format_telemetry(t)


@router.post("/scientific-reasoning")
async def run_scientific_reasoning(
    payload: ScientificReasoningPayload,
    service: OmniaInfrastructure2060Service = Depends(get_infra_service),
) -> dict[str, Any]:
    disc = service.assist_discovery(domain=payload.domain, hypothesis=payload.hypothesis)
    return _format_discovery(disc)


@router.post("/learning-session")
async def start_learning_session(
    payload: LearningSessionPayload,
    context: CreatorContext = Depends(require_creator_context),
    service: OmniaInfrastructure2060Service = Depends(get_infra_service),
) -> dict[str, Any]:
    sess = service.start_learning_session(student_id=context.creator_id, topic=payload.topic)
    return _format_session(sess)


@router.get("/domains")
async def list_infrastructure_domains(
    service: OmniaInfrastructure2060Service = Depends(get_infra_service),
) -> list[dict[str, Any]]:
    return service.list_domains()

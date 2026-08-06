"""FastAPI route handlers for OMNIA Human-AI Trust & Explainability Framework."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.trust_framework.domain import (
    ExplanationCard,
    FeedbackAction,
    HumanFeedbackItem,
    TrustMetrics,
    UncertaintyReport,
)
from app.modules.trust_framework.service import TrustFrameworkEngine

router = APIRouter(prefix="/trust", tags=["trust"])

_trust_engine = TrustFrameworkEngine()


def get_trust_engine() -> TrustFrameworkEngine:
    return _trust_engine


class RecordFeedbackPayload(BaseModel):
    card_id: str = Field(..., description="Target explanation card ID")
    action: FeedbackAction = Field(..., description="Human review action")
    notes: str = Field(default="", description="Creator feedback or correction notes")


def _format_card(c: ExplanationCard) -> dict[str, Any]:
    return {
        "card_id": c.card_id,
        "decision_title": c.decision_title,
        "evidence": c.evidence,
        "supporting_memories": c.supporting_memories,
        "supporting_analytics": c.supporting_analytics,
        "related_goals": c.related_goals,
        "confidence_score": c.confidence_score,
        "alternatives": c.alternatives,
        "known_uncertainties": c.known_uncertainties,
        "created_at": c.created_at.isoformat(),
    }


def _format_feedback(fb: HumanFeedbackItem) -> dict[str, Any]:
    return {
        "feedback_id": fb.feedback_id,
        "card_id": fb.card_id,
        "actor_id": fb.actor_id,
        "action": fb.action.value,
        "correction_notes": fb.correction_notes,
        "timestamp": fb.timestamp.isoformat(),
    }


def _format_uncertainty(u: UncertaintyReport) -> dict[str, Any]:
    return {
        "report_id": u.report_id,
        "target_decision": u.target_decision,
        "uncertainty_level": u.uncertainty_level.value,
        "weak_evidence_items": u.weak_evidence_items,
        "missing_context": u.missing_context,
    }


def _format_metrics(m: TrustMetrics) -> dict[str, Any]:
    return {
        "accuracy_rate": m.accuracy_rate,
        "total_corrections": m.total_corrections,
        "user_trust_score": m.user_trust_score,
        "avg_review_time_sec": m.avg_review_time_sec,
    }


@router.get("/explanations")
async def list_explanations(
    engine: TrustFrameworkEngine = Depends(get_trust_engine),
) -> list[dict[str, Any]]:
    cards = engine.get_explanations()
    return [_format_card(c) for c in cards]


@router.post("/feedback")
async def record_human_feedback(
    payload: RecordFeedbackPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: TrustFrameworkEngine = Depends(get_trust_engine),
) -> dict[str, Any]:
    fb = engine.record_feedback(
        card_id=payload.card_id,
        actor_id=context.creator_id,
        action=payload.action,
        notes=payload.notes,
    )
    return _format_feedback(fb)


@router.get("/uncertainty")
async def get_uncertainty_report(
    title: str = "Transition Content Schedule to 80% Deep-Dive Tutorials",
    engine: TrustFrameworkEngine = Depends(get_trust_engine),
) -> dict[str, Any]:
    report = engine.get_uncertainty(decision_title=title)
    return _format_uncertainty(report)


@router.get("/metrics")
async def get_trust_metrics(
    engine: TrustFrameworkEngine = Depends(get_trust_engine),
) -> dict[str, Any]:
    m = engine.get_metrics()
    return _format_metrics(m)

"""FastAPI routes for OMNIA Self-Improvement & Evaluation Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.evaluation.domain import OutcomeRating
from app.modules.evaluation.service import SelfImprovementEngine

router = APIRouter(prefix="/evaluation", tags=["evaluation"])

_evaluation_engine = SelfImprovementEngine()


def get_evaluation_engine() -> SelfImprovementEngine:
    return _evaluation_engine


class RecalibratePayload(BaseModel):
    decision_id: str = Field(..., description="Target decision ID")
    outcome_rating: OutcomeRating = Field(..., description="Observed outcome rating")


def _format_review(r: Any) -> dict[str, Any]:
    return {
        "decision_id": r.decision_id,
        "agent_id": r.agent_id,
        "reasoning_chain": r.reasoning_chain,
        "supporting_evidence": r.supporting_evidence,
        "initial_confidence": r.initial_confidence,
        "recalibrated_confidence": r.recalibrated_confidence,
        "expected_outcome": r.expected_outcome,
        "actual_outcome": r.actual_outcome,
        "outcome_rating": r.outcome_rating.value,
        "success_score": r.success_score,
        "failure_reason": r.failure_reason,
        "lessons_learned": r.lessons_learned,
        "evaluator_id": r.evaluator_id,
        "creator_id": r.creator_id,
        "evaluated_at": r.evaluated_at.isoformat(),
    }


def _format_agent(a: Any) -> dict[str, Any]:
    return {
        "agent_id": a.agent_id,
        "agent_name": a.agent_name,
        "total_recommendations": a.total_recommendations,
        "acceptance_rate": a.acceptance_rate,
        "prediction_accuracy": a.prediction_accuracy,
        "average_confidence": a.average_confidence,
        "rating_trend": a.rating_trend,
    }


@router.get("")
async def get_evaluation_overview(
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> dict[str, Any]:
    rep = engine.get_overview(context.creator_id)
    return {
        "recommendation_accuracy": rep.recommendation_accuracy,
        "mission_success_rate": rep.mission_success_rate,
        "creator_satisfaction": rep.creator_satisfaction,
        "followup_completion_rate": rep.followup_completion_rate,
        "prediction_accuracy": rep.prediction_accuracy,
        "learning_velocity": rep.learning_velocity,
        "agent_leaderboard": [_format_agent(a) for a in rep.agent_leaderboard],
        "failure_breakdown": rep.failure_breakdown,
        "strategy_experiments": [
            {
                "experiment_id": e.experiment_id,
                "name": e.name,
                "variant_a": e.variant_a,
                "variant_b": e.variant_b,
                "metric_tracked": e.metric_tracked,
                "winner": e.winner,
                "confidence_score": e.confidence_score,
            }
            for e in rep.strategy_experiments
        ],
        "recent_reviews": [_format_review(r) for r in rep.recent_reviews],
    }


@router.get("/metrics")
async def get_metrics(
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> dict[str, Any]:
    rep = engine.get_overview(context.creator_id)
    return {
        "recommendation_accuracy": rep.recommendation_accuracy,
        "mission_success_rate": rep.mission_success_rate,
        "creator_satisfaction": rep.creator_satisfaction,
        "followup_completion_rate": rep.followup_completion_rate,
        "prediction_accuracy": rep.prediction_accuracy,
        "learning_velocity": rep.learning_velocity,
    }


@router.get("/history")
async def get_decision_history(
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> list[dict[str, Any]]:
    history = engine.get_decision_history(context.creator_id)
    return [_format_review(r) for r in history]


@router.get("/agents")
async def get_agent_performance(
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> list[dict[str, Any]]:
    agents = engine.get_agent_metrics(context.creator_id)
    return [_format_agent(a) for a in agents]


@router.post("/run")
async def run_evaluation_cycle(
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> dict[str, Any]:
    rep = engine.run_evaluation_cycle(context.creator_id)
    return {
        "status": "COMPLETED",
        "recommendation_accuracy": rep.recommendation_accuracy,
        "learning_velocity": rep.learning_velocity,
        "latest_review": _format_review(rep.recent_reviews[0]) if rep.recent_reviews else None,
    }


@router.post("/recalibrate")
async def recalibrate_decision(
    payload: RecalibratePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SelfImprovementEngine = Depends(get_evaluation_engine),
) -> dict[str, Any]:
    try:
        rev = engine.recalibrate_confidence(payload.decision_id, payload.outcome_rating)
        return _format_review(rev)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

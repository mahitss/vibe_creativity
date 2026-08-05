"""FastAPI route handlers for OMNIA Executive Mind Orchestration Layer."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.executive_mind.domain import (
    ExecutiveDecision,
    ExecutiveReview,
    MissionSpec,
)
from app.modules.executive_mind.service import ExecutiveMindEngine

router = APIRouter(prefix="/executive", tags=["executive_mind"])

_executive_engine = ExecutiveMindEngine()


def get_executive_engine() -> ExecutiveMindEngine:
    return _executive_engine


class RunExecutiveCyclePayload(BaseModel):
    event_name: str = Field(default="MANUAL_API_TRIGGER", description="Triggering runtime event name")


def _format_decision(d: ExecutiveDecision) -> dict[str, Any]:
    return {
        "id": d.decision_id,
        "decision_id": d.decision_id,
        "workspace_id": d.workspace_id,
        "creator_id": d.workspace_id,
        "objective": d.recommended_action,
        "recommended_action": d.recommended_action,
        "reason": d.reason,
        "evidence": d.evidence,
        "supporting_memories": d.supporting_memory_ids,
        "supporting_memory_ids": d.supporting_memory_ids,
        "confidence": d.confidence,
        "priority": d.priority,
        "risk_level": d.risk_level,
        "status": "APPROVED",
        "why_now": d.why_now,
        "why_this": d.why_this,
        "why_not_alternatives": d.why_not_alternatives,
        "expected_outcome": d.expected_outcome,
        "review_date": d.review_date.isoformat(),
        "timestamp": d.review_date.isoformat(),
    }


def _format_mission(m: MissionSpec) -> dict[str, Any]:
    return {
        "mission_id": m.mission_id,
        "workspace_id": m.workspace_id,
        "decision_id": m.decision_id,
        "title": m.title,
        "description": m.description,
        "deadline": m.deadline.isoformat(),
        "estimated_effort": m.estimated_effort,
        "expected_impact": m.expected_impact,
        "success_criteria": m.success_criteria,
        "dependencies": m.dependencies,
    }


def _format_review(r: ExecutiveReview) -> dict[str, Any]:
    return {
        "review_id": r.review_id,
        "workspace_id": r.workspace_id,
        "title": r.title,
        "summary": r.summary,
        "key_decisions": [_format_decision(d) for d in r.key_decisions],
        "active_missions": [_format_mission(m) for m in r.active_missions],
        "confidence_score": r.confidence_score,
        "timestamp": r.timestamp.isoformat(),
    }


@router.post("/run_mind")
async def run_executive_mind_cycle(
    payload: RunExecutiveCyclePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveMindEngine = Depends(get_executive_engine),
) -> dict[str, Any]:
    return engine.run_reasoning_cycle(workspace_id=context.creator_id, event_name=payload.event_name)


@router.get("/mind_decisions")
async def get_executive_mind_decisions(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveMindEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    decisions = engine.get_decisions(workspace_id=context.creator_id, limit=limit)
    return [_format_decision(d) for d in decisions]


@router.get("/missions")
async def get_missions(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveMindEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    missions = engine.get_missions(workspace_id=context.creator_id, limit=limit)
    return [_format_mission(m) for m in missions]


@router.get("/reviews")
async def get_reviews(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveMindEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    reviews = engine.get_reviews(workspace_id=context.creator_id, limit=limit)
    return [_format_review(r) for r in reviews]

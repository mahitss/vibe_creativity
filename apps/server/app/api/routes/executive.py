"""FastAPI routes for OMNIA Executive Decision & Strategy Engine."""

from typing import Any

from fastapi import APIRouter, Depends

from app.core.security import CreatorContext, require_creator_context
from app.modules.executive.service import ExecutiveDecisionEngine

router = APIRouter(prefix="/executive", tags=["executive"])

_executive_engine = ExecutiveDecisionEngine()


def get_executive_engine() -> ExecutiveDecisionEngine:
    return _executive_engine


def _format_decision(d: Any) -> dict[str, Any]:
    return {
        "id": d.id,
        "timestamp": d.timestamp.isoformat(),
        "objective": d.objective,
        "reason": d.reason,
        "evidence": d.evidence,
        "supporting_memories": d.supporting_memories,
        "business_impact": d.business_impact,
        "audience_impact": d.audience_impact,
        "confidence": d.confidence,
        "risk_level": d.risk_level,
        "expected_outcome": d.expected_outcome,
        "alternative_options": d.alternative_options,
        "status": d.status,
        "creator_id": d.creator_id,
    }


def _format_conflict(c: Any) -> dict[str, Any]:
    return {
        "conflict_id": c.conflict_id,
        "subsystems_involved": c.subsystems_involved,
        "conflict_description": c.conflict_description,
        "executive_resolution": c.executive_resolution,
        "rationale": c.rationale,
        "supporting_memories": c.supporting_memories,
    }


@router.get("/strategy")
async def get_executive_strategy(
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveDecisionEngine = Depends(get_executive_engine),
) -> dict[str, Any]:
    rep = engine.get_strategy(context.creator_id)
    return {
        "status": rep.status.value,
        "today_strategy": rep.today_strategy,
        "top_focus": rep.top_focus,
        "weekly_strategy": rep.weekly_strategy,
        "top_opportunities": rep.top_opportunities,
        "highest_risks": rep.highest_risks,
        "active_conflicts": [_format_conflict(c) for c in rep.active_conflicts],
        "decisions_log": [_format_decision(d) for d in rep.decisions_log],
    }


@router.get("/decisions")
async def get_decisions_log(
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveDecisionEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    decisions = engine.get_decisions(context.creator_id)
    return [_format_decision(d) for d in decisions]


@router.get("/opportunities")
async def get_executive_opportunities(
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveDecisionEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    rep = engine.get_strategy(context.creator_id)
    return rep.top_opportunities


@router.get("/risks")
async def get_executive_risks(
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveDecisionEngine = Depends(get_executive_engine),
) -> list[dict[str, Any]]:
    rep = engine.get_strategy(context.creator_id)
    return rep.highest_risks


@router.post("/run")
async def run_executive_cycle(
    context: CreatorContext = Depends(require_creator_context),
    engine: ExecutiveDecisionEngine = Depends(get_executive_engine),
) -> dict[str, Any]:
    rep = engine.run_executive_loop(context.creator_id)
    return {
        "status": rep.status.value,
        "today_strategy": rep.today_strategy,
        "top_focus": rep.top_focus,
        "weekly_strategy": rep.weekly_strategy,
        "active_conflicts": [_format_conflict(c) for c in rep.active_conflicts],
        "latest_decision": _format_decision(rep.decisions_log[0]) if rep.decisions_log else None,
    }
    

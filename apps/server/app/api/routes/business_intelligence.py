"""FastAPI route handlers for OMNIA Autonomous Business Intelligence Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.business_intelligence.domain import (
    DecisionCard,
    RevenueForecast,
    SimulationScenario,
    StrategicOpportunity,
)
from app.modules.business_intelligence.service import BusinessIntelligenceEngine

router = APIRouter(prefix="/bi", tags=["business_intelligence"])

_bi_engine = BusinessIntelligenceEngine()


def get_bi_engine() -> BusinessIntelligenceEngine:
    return _bi_engine


class SimulateQueryPayload(BaseModel):
    query: str = Field(..., description="'What-If' simulation query prompt")


def _format_opportunity(o: StrategicOpportunity) -> dict[str, Any]:
    return {
        "opp_id": o.opp_id,
        "workspace_id": o.workspace_id,
        "category": o.category.value,
        "title": o.title,
        "impact_est": o.impact_est,
        "confidence": o.confidence,
        "evidence": o.evidence,
    }


def _format_simulation(s: SimulationScenario) -> dict[str, Any]:
    return {
        "scenario_id": s.scenario_id,
        "query": s.query,
        "variables": s.variables,
        "projected_revenue_change": s.projected_revenue_change,
        "projected_retention_change": s.projected_retention_change,
        "risk_level": s.risk_level,
    }


def _format_decision(d: DecisionCard) -> dict[str, Any]:
    return {
        "card_id": d.card_id,
        "title": d.title,
        "observation": d.observation,
        "evidence": d.evidence,
        "assumptions": d.assumptions,
        "confidence_score": d.confidence_score,
        "risks": d.risks,
        "alternative_strategies": d.alternative_strategies,
        "expected_outcomes": d.expected_outcomes,
    }


def _format_forecast(f: RevenueForecast) -> dict[str, Any]:
    return {
        "forecast_id": f.forecast_id,
        "horizon": f.horizon,
        "conservative_val": f.conservative_val,
        "projected_val": f.projected_val,
        "aggressive_val": f.aggressive_val,
        "created_at": f.created_at.isoformat(),
    }


@router.get("/opportunities")
async def list_opportunities(
    context: CreatorContext = Depends(require_creator_context),
    engine: BusinessIntelligenceEngine = Depends(get_bi_engine),
) -> list[dict[str, Any]]:
    opps = engine.get_opportunities(workspace_id=context.creator_id)
    return [_format_opportunity(o) for o in opps]


@router.post("/simulate")
async def run_scenario_simulation(
    payload: SimulateQueryPayload,
    engine: BusinessIntelligenceEngine = Depends(get_bi_engine),
) -> dict[str, Any]:
    sim = engine.run_simulation(query=payload.query)
    return _format_simulation(sim)


@router.get("/forecast")
async def get_revenue_forecast(
    engine: BusinessIntelligenceEngine = Depends(get_bi_engine),
) -> dict[str, Any]:
    fc = engine.get_forecast()
    return _format_forecast(fc)


@router.get("/decisions")
async def list_decision_cards(
    engine: BusinessIntelligenceEngine = Depends(get_bi_engine),
) -> list[dict[str, Any]]:
    cards = engine.get_decisions()
    return [_format_decision(d) for d in cards]

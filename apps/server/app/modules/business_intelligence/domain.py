"""Domain models for OMNIA Autonomous Business Intelligence Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class OpportunityCategory(StrEnum):
    PRODUCT_LAUNCH = "PRODUCT_LAUNCH"
    PUBLISHING_CADENCE = "PUBLISHING_CADENCE"
    SPONSOR_DEAL = "SPONSOR_DEAL"
    CONTENT_REPURPOSING = "CONTENT_REPURPOSING"


@dataclass(slots=True)
class StrategicOpportunity:
    opp_id: str
    workspace_id: str
    category: OpportunityCategory
    title: str
    impact_est: str
    confidence: float
    evidence: str


@dataclass(slots=True)
class SimulationScenario:
    scenario_id: str
    query: str
    variables: dict[str, Any]
    projected_revenue_change: str
    projected_retention_change: str
    risk_level: str


@dataclass(slots=True)
class DecisionCard:
    card_id: str
    title: str
    observation: str
    evidence: str
    assumptions: str
    confidence_score: float
    risks: list[str]
    alternative_strategies: list[str]
    expected_outcomes: str


@dataclass(slots=True)
class RevenueForecast:
    forecast_id: str
    horizon: str
    conservative_val: float
    projected_val: float
    aggressive_val: float
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

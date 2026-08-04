"""Domain models for OMNIA Executive Decision & Strategy Engine."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum
from typing import Any


class StrategyStatus(StrEnum):
    OPTIMAL = "OPTIMAL"
    ATTENTION_REQUIRED = "ATTENTION_REQUIRED"
    HIGH_RISK = "HIGH_RISK"
    CRITICAL = "CRITICAL"


class ConflictSource(StrEnum):
    CONTENT_VS_SPONSOR = "CONTENT_VS_SPONSOR"
    COMMUNITY_VS_TIMELINE = "COMMUNITY_VS_TIMELINE"
    ANALYTICS_VS_COMMUNITY = "ANALYTICS_VS_COMMUNITY"


@dataclass(slots=True)
class ExecutiveDecision:
    id: str
    timestamp: datetime
    objective: str
    reason: str
    evidence: str
    supporting_memories: list[str]
    business_impact: float
    audience_impact: float
    confidence: float
    risk_level: str
    expected_outcome: str
    alternative_options: list[str]
    status: str
    creator_id: str = "creator-default"


@dataclass(slots=True)
class AgentConflictResolution:
    conflict_id: str
    subsystems_involved: list[str]
    conflict_description: str
    executive_resolution: str
    rationale: str
    supporting_memories: list[str]


@dataclass(slots=True)
class ExecutiveStrategyReport:
    status: StrategyStatus
    today_strategy: str
    top_focus: str
    weekly_strategy: list[str]
    top_opportunities: list[dict[str, Any]]
    highest_risks: list[dict[str, Any]]
    active_conflicts: list[AgentConflictResolution]
    decisions_log: list[ExecutiveDecision]

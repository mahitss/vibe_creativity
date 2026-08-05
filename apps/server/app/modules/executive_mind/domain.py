"""Domain models for OMNIA Executive Mind Orchestration Layer."""

from dataclasses import dataclass, field
from datetime import UTC, datetime


@dataclass(slots=True)
class ConflictResolution:
    conflict_id: str
    topic: str
    competing_agent_proposals: dict[str, str]
    resolved_strategy: str
    evidence_summary: str
    reasoning: str


@dataclass(slots=True)
class ExecutiveDecision:
    decision_id: str
    workspace_id: str
    recommended_action: str
    reason: str
    evidence: str
    supporting_memory_ids: list[str]
    confidence: float
    priority: str
    risk_level: str
    why_now: str
    why_this: str
    why_not_alternatives: str
    expected_outcome: str
    review_date: datetime


@dataclass(slots=True)
class MissionSpec:
    mission_id: str
    workspace_id: str
    decision_id: str
    title: str
    description: str
    deadline: datetime
    estimated_effort: str
    expected_impact: str
    success_criteria: list[str]
    dependencies: list[str]


@dataclass(slots=True)
class ExecutiveReview:
    review_id: str
    workspace_id: str
    title: str
    summary: str
    key_decisions: list[ExecutiveDecision]
    active_missions: list[MissionSpec]
    confidence_score: float
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

"""Domain models for OMNIA Self-Improvement & Evaluation Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class OutcomeRating(StrEnum):
    EXCEEDED_EXPECTATIONS = "EXCEEDED_EXPECTATIONS"
    SUCCESS = "SUCCESS"
    PARTIAL_SUCCESS = "PARTIAL_SUCCESS"
    FAILED = "FAILED"
    IGNORED = "IGNORED"


class FailureCategory(StrEnum):
    REPEATED_IGNORED = "REPEATED_IGNORED"
    INCORRECT_PREDICTION = "INCORRECT_PREDICTION"
    POOR_PRIORITIZATION = "POOR_PRIORITIZATION"
    WEAK_EVIDENCE = "WEAK_EVIDENCE"
    TIMING_MISTAKE = "TIMING_MISTAKE"


@dataclass(slots=True)
class DecisionReview:
    decision_id: str
    agent_id: str
    reasoning_chain: str
    supporting_evidence: str
    initial_confidence: float
    recalibrated_confidence: float
    expected_outcome: str
    actual_outcome: str
    outcome_rating: OutcomeRating
    success_score: float
    failure_reason: str | None = None
    lessons_learned: str = ""
    evaluator_id: str = "evaluator-auto"
    creator_id: str = "creator-default"
    evaluated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class AgentPerformanceMetrics:
    agent_id: str
    agent_name: str
    total_recommendations: int
    acceptance_rate: float
    prediction_accuracy: float
    average_confidence: float
    rating_trend: str


@dataclass(slots=True)
class StrategyExperiment:
    experiment_id: str
    name: str
    variant_a: str
    variant_b: str
    metric_tracked: str
    winner: str
    confidence_score: float


@dataclass(slots=True)
class EvaluationOverviewReport:
    recommendation_accuracy: float
    mission_success_rate: float
    creator_satisfaction: float
    followup_completion_rate: float
    prediction_accuracy: float
    learning_velocity: float
    agent_leaderboard: list[AgentPerformanceMetrics]
    failure_breakdown: dict[str, int]
    strategy_experiments: list[StrategyExperiment]
    recent_reviews: list[DecisionReview]

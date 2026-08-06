"""Domain models for OMNIA Human-AI Trust & Explainability Framework."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class FeedbackAction(StrEnum):
    APPROVE = "APPROVE"
    REJECT = "REJECT"
    REQUEST_MORE_EVIDENCE = "REQUEST_MORE_EVIDENCE"
    CHALLENGE_ASSUMPTION = "CHALLENGE_ASSUMPTION"
    PROVIDE_CORRECTION = "PROVIDE_CORRECTION"


class UncertaintyLevel(StrEnum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


@dataclass(slots=True)
class ExplanationCard:
    card_id: str
    decision_title: str
    evidence: str
    supporting_memories: list[str]
    supporting_analytics: str
    related_goals: list[str]
    confidence_score: float
    alternatives: list[str]
    known_uncertainties: list[str]
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class HumanFeedbackItem:
    feedback_id: str
    card_id: str
    actor_id: str
    action: FeedbackAction
    correction_notes: str = ""
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class UncertaintyReport:
    report_id: str
    target_decision: str
    uncertainty_level: UncertaintyLevel
    weak_evidence_items: list[str]
    missing_context: list[str]


@dataclass(slots=True)
class TrustMetrics:
    accuracy_rate: float = 98.4
    total_corrections: int = 12
    user_trust_score: float = 96.8
    avg_review_time_sec: float = 14.5

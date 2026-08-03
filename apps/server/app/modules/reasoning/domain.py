"""Domain models for OMNIA Executive Reasoning Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import UUID, uuid4


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class EvidenceType(StrEnum):
    IDENTITY = "IDENTITY"
    GOAL = "GOAL"
    COMMUNITY = "COMMUNITY"
    RELATIONSHIP = "RELATIONSHIP"
    EPISODE = "EPISODE"
    PROJECT = "PROJECT"
    PERFORMANCE = "PERFORMANCE"
    EXECUTIVE_REVIEW = "EXECUTIVE_REVIEW"
    MISSION_HISTORY = "MISSION_HISTORY"
    TIMELINE_EVENT = "TIMELINE_EVENT"


@dataclass(slots=True)
class EvidenceItem:
    """A grounded piece of evidence retrieved from persistent memory."""

    id: str = field(default_factory=lambda: f"ev-{uuid4().hex[:8]}")
    evidence_type: EvidenceType = EvidenceType.PERFORMANCE
    source_memory_id: str = ""
    summary: str = ""
    weight: float = 0.9
    timestamp: datetime = field(default_factory=utc_now)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "evidence_type": self.evidence_type.value,
            "source_memory_id": self.source_memory_id,
            "summary": self.summary,
            "weight": self.weight,
            "timestamp": self.timestamp.isoformat(),
        }


@dataclass(slots=True)
class AlternativeOption:
    """An alternative option considered and rejected during executive reasoning."""

    title: str = ""
    description: str = ""
    rejected_reason: str = ""
    risk_score: float = 0.5

    def to_dict(self) -> dict[str, Any]:
        return {
            "title": self.title,
            "description": self.description,
            "rejected_reason": self.rejected_reason,
            "risk_score": self.risk_score,
        }


@dataclass(slots=True)
class ConfidenceFactors:
    """Multi-factor confidence scoring metrics."""

    memory_freshness: float = 0.95
    evidence_count: float = 0.9
    historical_success: float = 0.92
    relationship_strength: float = 0.88
    goal_alignment: float = 0.96

    @property
    def total_score(self) -> float:
        weights = [
            self.memory_freshness * 0.2,
            self.evidence_count * 0.2,
            self.historical_success * 0.2,
            self.relationship_strength * 0.2,
            self.goal_alignment * 0.2,
        ]
        return round(sum(weights), 2)

    def to_dict(self) -> dict[str, Any]:
        return {
            "memory_freshness": self.memory_freshness,
            "evidence_count": self.evidence_count,
            "historical_success": self.historical_success,
            "relationship_strength": self.relationship_strength,
            "goal_alignment": self.goal_alignment,
            "total_score": self.total_score,
        }


@dataclass(slots=True)
class ReasoningChain:
    """An immutable, explainable reasoning chain grounded in persistent memory."""

    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    timestamp: datetime = field(default_factory=utc_now)
    trigger_name: str = ""
    recommendation_title: str = ""
    observation: str = ""
    evidence: list[EvidenceItem] = field(default_factory=list)
    historical_comparison: str = ""
    business_impact: str = "HIGH"
    confidence_factors: ConfidenceFactors = field(default_factory=ConfidenceFactors)
    risk_factors: list[str] = field(default_factory=list)
    expected_outcome: str = ""
    alternative_options: list[AlternativeOption] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str(self.id),
            "creator_id": self.creator_id,
            "timestamp": self.timestamp.isoformat(),
            "trigger_name": self.trigger_name,
            "recommendation_title": self.recommendation_title,
            "observation": self.observation,
            "evidence": [ev.to_dict() for ev in self.evidence],
            "historical_comparison": self.historical_comparison,
            "business_impact": self.business_impact,
            "confidence_score": self.confidence_factors.total_score,
            "confidence_factors": self.confidence_factors.to_dict(),
            "risk_factors": self.risk_factors,
            "expected_outcome": self.expected_outcome,
            "alternative_options": [alt.to_dict() for alt in self.alternative_options],
        }

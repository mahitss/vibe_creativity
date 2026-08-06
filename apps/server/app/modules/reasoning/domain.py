"""Domain models for OMNIA Executive Reasoning & Explainability Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import uuid4


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class ConfidenceLevel(StrEnum):
    VERY_HIGH = "Very High"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


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
    """A ranked piece of evidence retrieved from persistent memory."""

    id: str = field(default_factory=lambda: f"ev-{uuid4().hex[:8]}")
    evidence_type: EvidenceType = EvidenceType.PERFORMANCE
    source_memory_id: str = ""
    summary: str = ""
    weight: float = 0.9
    relevance: float = 0.95
    recency: float = 0.92
    reliability: float = 0.98
    goal_alignment: float = 0.96
    historical_success: float = 0.94
    timestamp: datetime = field(default_factory=utc_now)

    @property
    def composite_score(self) -> float:
        return round(
            (self.relevance * 0.25)
            + (self.recency * 0.20)
            + (self.reliability * 0.20)
            + (self.goal_alignment * 0.20)
            + (self.historical_success * 0.15),
            3,
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "evidence_type": self.evidence_type.value,
            "source_memory_id": self.source_memory_id,
            "summary": self.summary,
            "weight": self.weight,
            "composite_score": self.composite_score,
            "relevance": self.relevance,
            "recency": self.recency,
            "reliability": self.reliability,
            "goal_alignment": self.goal_alignment,
            "historical_success": self.historical_success,
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
    change_reason: str = "Confidence boosted +0.05 due to 14 repeated audience requests."

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

    @property
    def confidence_level(self) -> ConfidenceLevel:
        score = self.total_score
        if score >= 0.90:
            return ConfidenceLevel.VERY_HIGH
        if score >= 0.80:
            return ConfidenceLevel.HIGH
        if score >= 0.70:
            return ConfidenceLevel.MEDIUM
        return ConfidenceLevel.LOW

    def to_dict(self) -> dict[str, Any]:
        return {
            "memory_freshness": self.memory_freshness,
            "evidence_count": self.evidence_count,
            "historical_success": self.historical_success,
            "relationship_strength": self.relationship_strength,
            "goal_alignment": self.goal_alignment,
            "total_score": self.total_score,
            "confidence_level": self.confidence_level.value,
            "change_reason": self.change_reason,
        }


@dataclass(slots=True)
class ReasoningObject:
    """An immutable, explainable reasoning object grounded in persistent memory."""

    reasoning_id: str = field(default_factory=lambda: f"rsn-{uuid4().hex[:8]}")
    workspace_id: str = "ws-101"
    decision_id: str = field(default_factory=lambda: f"dec-{uuid4().hex[:8]}")
    mission_id: str = "m-101"
    confidence: float = 0.96
    priority: str = "CRITICAL"
    evidence: list[EvidenceItem] = field(default_factory=list)
    supporting_memories: list[str] = field(default_factory=list)
    supporting_analytics: str = ""
    community_signals: list[str] = field(default_factory=list)
    sponsor_signals: list[str] = field(default_factory=list)
    reflection_references: list[str] = field(default_factory=list)
    alternative_strategies: list[AlternativeOption] = field(default_factory=list)
    expected_outcome: str = ""
    risks: list[str] = field(default_factory=list)
    timestamp: datetime = field(default_factory=utc_now)
    recommendation_title: str = "Publish Docker Multi-Agent System Tutorial & Repurpose Content"
    reasoning_explanation: str = "Why this mission? 14 audience comments specifically requested Docker orchestration setup."

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.reasoning_id,
            "reasoning_id": self.reasoning_id,
            "workspace_id": self.workspace_id,
            "decision_id": self.decision_id,
            "mission_id": self.mission_id,
            "confidence": self.confidence,
            "confidence_score": self.confidence,
            "priority": self.priority,
            "recommendation_title": self.recommendation_title,
            "reasoning_explanation": self.reasoning_explanation,
            "evidence": [ev.to_dict() for ev in sorted(self.evidence, key=lambda x: x.composite_score, reverse=True)],
            "supporting_memories": self.supporting_memories,
            "supporting_analytics": self.supporting_analytics,
            "community_signals": self.community_signals,
            "sponsor_signals": self.sponsor_signals,
            "reflection_references": self.reflection_references,
            "alternative_strategies": [alt.to_dict() for alt in self.alternative_strategies],
            "alternative_options": [alt.to_dict() for alt in self.alternative_strategies],
            "expected_outcome": self.expected_outcome,
            "risks": self.risks,
            "timestamp": self.timestamp.isoformat(),
        }


# Backward compatibility aliases
ReasoningChain = ReasoningObject

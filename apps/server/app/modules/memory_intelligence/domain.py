"""Domain models for OMNIA Memory Intelligence System."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class EvolutionStage(StrEnum):
    RAW_MEMORY = "RAW_MEMORY"
    VALIDATED_MEMORY = "VALIDATED_MEMORY"
    PATTERN = "PATTERN"
    INSIGHT = "INSIGHT"
    KNOWLEDGE = "KNOWLEDGE"
    STRATEGY = "STRATEGY"


class ContradictionType(StrEnum):
    CONFLICTING_PREFERENCES = "CONFLICTING_PREFERENCES"
    CONFLICTING_GOALS = "CONFLICTING_GOALS"
    OUTDATED_ASSUMPTION = "OUTDATED_ASSUMPTION"
    DUPLICATE_KNOWLEDGE = "DUPLICATE_KNOWLEDGE"


@dataclass(slots=True)
class KnowledgeObject:
    knowledge_id: str
    workspace_id: str
    stage: EvolutionStage
    title: str
    source_memories: list[str]
    confidence: float
    evidence: str
    supporting_events: list[str]
    related_goals: list[str]
    business_impact: str
    quality_score: float = 94.5
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ContradictionReport:
    report_id: str
    workspace_id: str
    contradiction_type: ContradictionType
    conflicting_items: list[str]
    explanation: str
    recommended_resolution: str


@dataclass(slots=True)
class KnowledgeSnapshot:
    snapshot_id: str
    workspace_id: str
    period_type: str
    total_knowledge_nodes: int
    top_insights: list[str]
    generated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

"""Domain models for OMNIA Persistent Memory Service."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class MemoryType(StrEnum):
    IDENTITY = "IDENTITY"
    PREFERENCE = "PREFERENCE"
    GOAL = "GOAL"
    EPISODE = "EPISODE"
    PROJECT = "PROJECT"
    RELATIONSHIP = "RELATIONSHIP"
    COMMUNITY = "COMMUNITY"
    SPONSOR = "SPONSOR"
    PERFORMANCE = "PERFORMANCE"
    REFLECTION = "REFLECTION"
    DECISION = "DECISION"
    WORKFLOW = "WORKFLOW"
    KNOWLEDGE = "KNOWLEDGE"


class MemoryLifecycleStage(StrEnum):
    CREATED = "CREATED"
    ACTIVE = "ACTIVE"
    REFERENCED = "REFERENCED"
    CONSOLIDATED = "CONSOLIDATED"
    ARCHIVED = "ARCHIVED"
    RESTORED = "RESTORED"


@dataclass(slots=True)
class MemoryRow:
    memory_id: str
    workspace_id: str
    mind_id: str
    type: MemoryType
    title: str
    summary: str
    content: str
    embedding: list[float]
    source: str
    importance: float
    confidence: float
    version: int = 1
    access_count: int = 1
    relationships: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    stage: MemoryLifecycleStage = MemoryLifecycleStage.ACTIVE
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    last_accessed: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class MemorySearchResult:
    memory: MemoryRow
    relevance_score: float
    ranking_signals: dict[str, float]


@dataclass(slots=True)
class ConsolidationReport:
    consolidated_count: int
    archived_count: int
    merged_count: int
    confidence_boosts: int
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

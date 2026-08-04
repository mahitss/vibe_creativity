"""Domain models for OMNIA Creator Knowledge Universe."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class EntityType(StrEnum):
    IDEA = "IDEA"
    VIDEO = "VIDEO"
    SERIES = "SERIES"
    COURSE = "COURSE"
    SPONSOR = "SPONSOR"
    BRAND = "BRAND"
    AUDIENCE_MEMBER = "AUDIENCE_MEMBER"
    COMMUNITY = "COMMUNITY"
    PROJECT = "PROJECT"
    GOAL = "GOAL"
    COLLABORATOR = "COLLABORATOR"
    PRODUCT = "PRODUCT"
    REVENUE = "REVENUE"
    MILESTONE = "MILESTONE"
    PLATFORM = "PLATFORM"


class RelationshipType(StrEnum):
    CREATED = "CREATED"
    INSPIRED = "INSPIRED"
    DEPENDS_ON = "DEPENDS_ON"
    MENTIONS = "MENTIONS"
    SPONSORED_BY = "SPONSORED_BY"
    REQUESTED_BY = "REQUESTED_BY"
    COLLABORATES_WITH = "COLLABORATES_WITH"
    DERIVED_FROM = "DERIVED_FROM"
    BELONGS_TO = "BELONGS_TO"
    SUPPORTS = "SUPPORTS"
    CONFLICTS_WITH = "CONFLICTS_WITH"
    INFLUENCES = "INFLUENCES"
    LEADS_TO = "LEADS_TO"


@dataclass(slots=True)
class UniverseEdge:
    id: str
    source_id: str
    target_id: str
    relationship_type: RelationshipType
    strength: float = 1.0
    description: str = ""


@dataclass(slots=True)
class UniverseEntity:
    id: str
    title: str
    entity_type: EntityType
    description: str
    owner: str = "creator-default"
    importance: float = 0.8
    confidence: float = 0.9
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    status: str = "ACTIVE"
    metadata: dict[str, Any] = field(default_factory=dict)
    relationships: list[UniverseEdge] = field(default_factory=list)
    history: list[str] = field(default_factory=list)
    x: float = 0.0
    y: float = 0.0


@dataclass(slots=True)
class UniversePathResult:
    source_id: str
    target_id: str
    nodes: list[UniverseEntity]
    edges: list[UniverseEdge]
    hop_count: int
    total_strength: float


@dataclass(slots=True)
class UniverseAIInsights:
    most_influential_entity: str
    fastest_growing_topic: str
    weakest_relationship: str
    hidden_opportunity: str
    knowledge_gaps: list[str] = field(default_factory=list)
    unused_assets: list[str] = field(default_factory=list)
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

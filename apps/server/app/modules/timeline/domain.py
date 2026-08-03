"""Domain models for OMNIA Living Memory Timeline & Interactive Memory Graph."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import UUID, uuid4


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class TimelineType(StrEnum):
    CONTENT = "CONTENT"
    COMMUNITY = "COMMUNITY"
    SPONSOR = "SPONSOR"
    PROJECT = "PROJECT"
    GOAL = "GOAL"
    CREATOR = "CREATOR"
    MISSION = "MISSION"
    MEMORY = "MEMORY"


class EvolutionStage(StrEnum):
    IDEA = "IDEA"
    RESEARCH = "RESEARCH"
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    UPDATED = "UPDATED"
    REPURPOSED = "REPURPOSED"
    ARCHIVED = "ARCHIVED"


class RelationshipType(StrEnum):
    CREATED = "CREATED"
    INSPIRED = "INSPIRED"
    MENTIONED = "MENTIONED"
    REQUESTED = "REQUESTED"
    DEPENDS_ON = "DEPENDS_ON"
    SPONSORED_BY = "SPONSORED_BY"
    ANSWERED = "ANSWERED"
    GENERATED = "GENERATED"
    REPURPOSED = "REPURPOSED"
    CONNECTED_TO = "CONNECTED_TO"


class NodeType(StrEnum):
    VIDEO = "VIDEO"
    PLAYLIST = "PLAYLIST"
    SPONSOR = "SPONSOR"
    FOLLOWER = "FOLLOWER"
    GOAL = "GOAL"
    MISSION = "MISSION"
    BRAND = "BRAND"
    IDEA = "IDEA"
    COURSE = "COURSE"
    COMMENT = "COMMENT"
    PLATFORM = "PLATFORM"


@dataclass(frozen=True, slots=True)
class ReflectionBlock:
    """Reflection details attached to a major timeline event."""

    ai_reflection: str = ""
    creator_reflection: str = ""
    lessons_learned: tuple[str, ...] = ()
    future_recommendation: str = ""


@dataclass(slots=True)
class TimelineEvent:
    """A continuously evolving event in the creator's Living Memory Timeline."""

    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    timestamp: datetime = field(default_factory=utc_now)
    event_type: TimelineType = TimelineType.CONTENT
    evolution_stage: EvolutionStage = EvolutionStage.IDEA
    title: str = ""
    description: str = ""
    source: str = "OMNIA Platform"
    importance: float = 0.5
    confidence: float = 0.8
    related_objects: list[str] = field(default_factory=list)
    related_memories: list[str] = field(default_factory=list)
    related_projects: list[str] = field(default_factory=list)
    related_people: list[str] = field(default_factory=list)
    related_goals: list[str] = field(default_factory=list)
    agent_responsible: str = "executive"
    reflection: ReflectionBlock = field(default_factory=ReflectionBlock)
    is_bookmarked: bool = False
    is_pinned: bool = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str(self.id),
            "creator_id": self.creator_id,
            "timestamp": self.timestamp.isoformat(),
            "event_type": self.event_type.value,
            "evolution_stage": self.evolution_stage.value,
            "title": self.title,
            "description": self.description,
            "source": self.source,
            "importance": self.importance,
            "confidence": self.confidence,
            "related_objects": self.related_objects,
            "related_memories": self.related_memories,
            "related_projects": self.related_projects,
            "related_people": self.related_people,
            "related_goals": self.related_goals,
            "agent_responsible": self.agent_responsible,
            "reflection": {
                "ai_reflection": self.reflection.ai_reflection,
                "creator_reflection": self.reflection.creator_reflection,
                "lessons_learned": list(self.reflection.lessons_learned),
                "future_recommendation": self.reflection.future_recommendation,
            },
            "is_bookmarked": self.is_bookmarked,
            "is_pinned": self.is_pinned,
        }


@dataclass(slots=True)
class GraphNode:
    """A node in the Living Memory Graph."""

    id: str
    name: str
    node_type: NodeType
    metadata: dict[str, Any] = field(default_factory=dict)
    importance: float = 0.5

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "node_type": self.node_type.value,
            "metadata": self.metadata,
            "importance": self.importance,
        }


@dataclass(slots=True)
class GraphEdge:
    """A directed edge in the Living Memory Graph representing a relationship."""

    source_id: str
    target_id: str
    relationship: RelationshipType
    weight: float = 1.0
    description: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "source_id": self.source_id,
            "target_id": self.target_id,
            "relationship": self.relationship.value,
            "weight": self.weight,
            "description": self.description,
        }

"""Domain models for OMNIA Memory Ingestion Pipeline."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import UUID, uuid4


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class IngestionEventType(StrEnum):
    MISSION_COMPLETED = "MISSION_COMPLETED"
    MISSION_CREATED = "MISSION_CREATED"
    CONTENT_PUBLISHED = "CONTENT_PUBLISHED"
    SPONSOR_CONTACT = "SPONSOR_CONTACT"
    AUDIENCE_REQUEST = "AUDIENCE_REQUEST"
    COMMUNITY_INSIGHT = "COMMUNITY_INSIGHT"
    GOAL_UPDATED = "GOAL_UPDATED"
    ANALYTICS_SPIKE = "ANALYTICS_SPIKE"
    ANALYTICS_DROP = "ANALYTICS_DROP"
    REFLECTION = "REFLECTION"
    MILESTONE = "MILESTONE"
    COLLABORATION = "COLLABORATION"
    REMINDER = "REMINDER"
    SYSTEM_OBSERVATION = "SYSTEM_OBSERVATION"


class EventSource(StrEnum):
    USER_ACTION = "USER_ACTION"
    AGENT_ACTION = "AGENT_ACTION"
    YOUTUBE = "YOUTUBE"
    DISCORD = "DISCORD"
    GITHUB = "GITHUB"
    TWITTER = "TWITTER"
    LINKEDIN = "LINKEDIN"
    TIKTOK = "TIKTOK"


class IngestionStatus(StrEnum):
    QUEUED = "QUEUED"
    PROCESSING = "PROCESSING"
    INGESTED = "INGESTED"
    FAILED = "FAILED"
    DEAD_LETTER = "DEAD_LETTER"


class PriorityLevel(StrEnum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


@dataclass(slots=True)
class ImportanceMetrics:
    """Calculated importance and cognitive metrics for an ingested event."""

    importance: float = 0.5
    confidence: float = 0.8
    emotional_weight: float = 0.5
    business_value: float = 0.5
    future_relevance: float = 0.7
    priority: PriorityLevel = PriorityLevel.MEDIUM

    def to_dict(self) -> dict[str, Any]:
        return {
            "importance": round(self.importance, 2),
            "confidence": round(self.confidence, 2),
            "emotional_weight": round(self.emotional_weight, 2),
            "business_value": round(self.business_value, 2),
            "future_relevance": round(self.future_relevance, 2),
            "priority": self.priority.value,
        }


@dataclass(slots=True)
class RawIngestionEvent:
    """An incoming raw event entering the memory ingestion pipeline."""

    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    timestamp: datetime = field(default_factory=utc_now)
    event_type: IngestionEventType = IngestionEventType.SYSTEM_OBSERVATION
    source: EventSource = EventSource.AGENT_ACTION
    title: str = ""
    description: str = ""
    payload: dict[str, Any] = field(default_factory=dict)
    metrics: ImportanceMetrics = field(default_factory=ImportanceMetrics)
    status: IngestionStatus = IngestionStatus.QUEUED
    attempts: int = 0
    resulting_memory_id: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str(self.id),
            "creator_id": self.creator_id,
            "timestamp": self.timestamp.isoformat(),
            "event_type": self.event_type.value,
            "source": self.source.value,
            "title": self.title,
            "description": self.description,
            "payload": self.payload,
            "metrics": self.metrics.to_dict(),
            "status": self.status.value,
            "attempts": self.attempts,
            "resulting_memory_id": self.resulting_memory_id,
        }

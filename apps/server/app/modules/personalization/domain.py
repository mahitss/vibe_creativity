"""Domain models for OMNIA Adaptive Personalization & Evolution Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class HabitCategory(StrEnum):
    WORK_HOURS = "WORK_HOURS"
    PUBLISHING_CADENCE = "PUBLISHING_CADENCE"
    CONTENT_LENGTH = "CONTENT_LENGTH"
    SPONSOR_RESPONSE = "SPONSOR_RESPONSE"
    COMMUNITY_ENGAGEMENT = "COMMUNITY_ENGAGEMENT"
    MISSION_CHOICE = "MISSION_CHOICE"
    FEATURE_USAGE = "FEATURE_USAGE"


class AdaptationStatus(StrEnum):
    PROPOSED = "PROPOSED"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    PINNED = "PINNED"
    AUTO_APPLIED = "AUTO_APPLIED"


class TrendDirection(StrEnum):
    STRENGTHENING = "STRENGTHENING"
    STABLE = "STABLE"
    WEAKENING = "WEAKENING"


@dataclass(slots=True)
class LearnedHabit:
    id: str
    category: HabitCategory
    title: str
    description: str
    confidence: float
    evidence_count: int
    trend: TrendDirection
    status: AdaptationStatus
    decay_score: float = 0.05
    last_observed: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class PersonalizationExperiment:
    id: str
    name: str
    hypothesis: str
    variant_a: str
    variant_b: str
    winner: str | None = None
    confidence: float = 0.85
    status: str = "RUNNING"


@dataclass(slots=True)
class ProductivityInsight:
    key: str
    title: str
    value: str
    impact_score: float
    grounded_memories: list[str] = field(default_factory=list)


@dataclass(slots=True)
class CreatorPreferences:
    preferred_work_hours: str = "17:00 - 21:00 UTC"
    preferred_tone: str = "Concise & Analytical"
    notification_window: str = "Evening (18:00 UTC)"
    auto_adaptation_enabled: bool = True
    pinned_preferences: list[str] = field(default_factory=lambda: ["Thursday Upload Cadence"])


@dataclass(slots=True)
class PersonalizationModel:
    creator_id: str
    preferences: CreatorPreferences
    habits: list[LearnedHabit] = field(default_factory=list)
    experiments: list[PersonalizationExperiment] = field(default_factory=list)
    insights: list[ProductivityInsight] = field(default_factory=list)
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

"""Domain models for OMNIA Content Strategy Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class ContentType(StrEnum):
    YOUTUBE_VIDEO = "YOUTUBE_VIDEO"
    SHORTS = "SHORTS"
    SERIES_EPISODE = "SERIES_EPISODE"
    COURSE_MODULE = "COURSE_MODULE"
    NEWSLETTER = "NEWSLETTER"
    COMMUNITY_POST = "COMMUNITY_POST"
    SPONSOR_INTEGRATION = "SPONSOR_INTEGRATION"


class ContentState(StrEnum):
    IDEA = "IDEA"
    RESEARCH = "RESEARCH"
    OUTLINE = "OUTLINE"
    SCRIPT = "SCRIPT"
    RECORDING = "RECORDING"
    EDITING = "EDITING"
    THUMBNAIL = "THUMBNAIL"
    SCHEDULED = "SCHEDULED"
    PUBLISHED = "PUBLISHED"
    REPURPOSED = "REPURPOSED"
    ARCHIVED = "ARCHIVED"


class ContentPriority(StrEnum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


@dataclass(slots=True)
class ContentItem:
    id: str
    title: str
    description: str
    content_type: ContentType
    platform: str
    series_id: str | None = None
    priority: ContentPriority = ContentPriority.MEDIUM
    target_audience: str = "General Developers"
    status: ContentState = ContentState.IDEA
    difficulty: str = "MODERATE"
    estimated_time_hours: float = 8.0
    business_impact: float = 0.85
    audience_impact: float = 0.90
    creator_id: str = "creator-default"
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    deadline: datetime | None = None
    related_goals: list[str] = field(default_factory=list)
    dependencies: list[str] = field(default_factory=list)
    memory_links: list[str] = field(default_factory=list)
    score: float = 0.85


@dataclass(slots=True)
class SeriesTracker:
    series_id: str
    title: str
    total_episodes: int
    published_episodes: int
    overdue_episode: str | None = None
    audience_waiting_count: int = 0
    next_episode_title: str = ""


@dataclass(slots=True)
class ContentGapInsight:
    gap_type: str
    description: str
    evidence: str
    suggested_action: str
    impact_score: float = 0.90


@dataclass(slots=True)
class ContentRoadmap:
    today: list[ContentItem] = field(default_factory=list)
    this_week: list[ContentItem] = field(default_factory=list)
    this_month: list[ContentItem] = field(default_factory=list)
    quarter_strategy: list[ContentItem] = field(default_factory=list)

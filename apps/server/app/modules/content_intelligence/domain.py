"""Domain models for OMNIA Content Intelligence Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class ContentState(StrEnum):
    IDEA = "IDEA"
    RESEARCH = "RESEARCH"
    OUTLINE = "OUTLINE"
    DRAFT = "DRAFT"
    REVIEW = "REVIEW"
    SCHEDULED = "SCHEDULED"
    PUBLISHED = "PUBLISHED"
    REPURPOSED = "REPURPOSED"
    ARCHIVED = "ARCHIVED"


class RepurposeFormat(StrEnum):
    LONGFORM_TO_SHORTS = "LONGFORM_TO_SHORTS"
    VIDEO_TO_CAROUSEL = "VIDEO_TO_CAROUSEL"
    VIDEO_TO_NEWSLETTER = "VIDEO_TO_NEWSLETTER"
    THREAD_TO_SCRIPT = "THREAD_TO_SCRIPT"
    FAQ_TO_VIDEO = "FAQ_TO_VIDEO"


class ContentType(StrEnum):
    VIDEO = "VIDEO"
    SHORT = "SHORT"
    BLOG = "BLOG"
    NEWSLETTER = "NEWSLETTER"
    CAROUSEL = "CAROUSEL"
    PODCAST = "PODCAST"
    POST = "POST"


@dataclass(slots=True)
class ContentAsset:
    content_id: str
    workspace_id: str
    title: str
    description: str
    platform: str
    content_type: ContentType
    series: str
    topics: list[str]
    audience: str
    status: ContentState
    publish_date: datetime
    performance_metrics: dict[str, Any] = field(default_factory=dict)
    related_memories: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class RepurposeJob:
    job_id: str
    source_content_id: str
    target_format: RepurposeFormat
    target_platform: str
    output_draft: str
    confidence: float
    source_link: str
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ContentIdea:
    idea_id: str
    title: str
    reasoning: str
    source_signal: str
    estimated_impact: str


@dataclass(slots=True)
class ContentPerformance:
    content_id: str
    views: int
    engagement_rate: float
    retention_pct: float
    conversions: int
    revenue_generated: float

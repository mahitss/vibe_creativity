"""Domain models for OMNIA Community Intelligence Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class VIPStatus(StrEnum):
    NONE = "NONE"
    TOP_SUPPORTER = "TOP_SUPPORTER"
    HELPFUL_MEMBER = "HELPFUL_MEMBER"
    MODERATOR_CANDIDATE = "MODERATOR_CANDIDATE"
    ADVOCATE = "ADVOCATE"


class SentimentType(StrEnum):
    POSITIVE = "POSITIVE"
    NEUTRAL = "NEUTRAL"
    NEGATIVE = "NEGATIVE"
    MIXED = "MIXED"


class TopicCategory(StrEnum):
    TUTORIAL_REQUEST = "TUTORIAL_REQUEST"
    BUG_REPORT = "BUG_REPORT"
    FEATURE_REQUEST = "FEATURE_REQUEST"
    GENERAL_DISCUSSION = "GENERAL_DISCUSSION"
    FEEDBACK = "FEEDBACK"


@dataclass(slots=True)
class CommunityMember:
    member_id: str
    workspace_id: str
    platform: str
    display_name: str
    username: str
    relationship_score: float
    trust_score: float
    vip_status: VIPStatus
    topics: list[str] = field(default_factory=list)
    sentiment_trend: SentimentType = SentimentType.POSITIVE
    memory_links: list[str] = field(default_factory=list)
    last_interaction: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class TopicCluster:
    topic_id: str
    category: TopicCategory
    title: str
    request_count: int
    sentiment_score: float
    related_memories: list[str] = field(default_factory=list)


@dataclass(slots=True)
class CommunityHealthMetrics:
    engagement_score: float
    positive_sentiment_pct: float
    negative_sentiment_pct: float
    response_time_hours: float
    creator_participation_pct: float
    spam_rate_pct: float


@dataclass(slots=True)
class ModerationRecommendation:
    item_id: str
    member_id: str
    content: str
    flagged: bool
    reason: str
    recommended_action: str
    confidence: float
    context_notes: str

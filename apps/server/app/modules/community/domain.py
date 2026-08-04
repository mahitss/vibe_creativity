"""Domain models for OMNIA Community Intelligence & Relationship Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class VipStatus(StrEnum):
    NONE = "NONE"
    TOP_SUPPORTER = "TOP_SUPPORTER"
    HELPFUL_MEMBER = "HELPFUL_MEMBER"
    POTENTIAL_MODERATOR = "POTENTIAL_MODERATOR"
    COMMUNITY_LEADER = "COMMUNITY_LEADER"
    COURSE_CUSTOMER = "COURSE_CUSTOMER"


class ModerationRisk(StrEnum):
    HARASSMENT = "HARASSMENT"
    SPAM = "SPAM"
    SCAM = "SCAM"
    HATE_SPEECH = "HATE_SPEECH"
    BOT_BEHAVIOR = "BOT_BEHAVIOR"
    SELF_PROMOTION = "SELF_PROMOTION"


@dataclass(slots=True)
class CommunityMember:
    id: str
    platform: str
    username: str
    display_name: str
    profile_url: str
    join_date: datetime
    follower_status: bool
    vip_status: VipStatus
    creator_relationship_score: float
    trust_score: float
    sentiment_history: list[float]
    interaction_count: int
    creator_id: str = "creator-default"
    last_interaction: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    favorite_topics: list[str] = field(default_factory=list)
    repeated_questions: list[str] = field(default_factory=list)
    moderation_history: list[str] = field(default_factory=list)
    achievements: list[str] = field(default_factory=list)
    knowledge_graph_links: list[str] = field(default_factory=list)
    memory_references: list[str] = field(default_factory=list)


@dataclass(slots=True)
class CommunityHealthScore:
    overall_score: float
    positivity_score: float
    participation_score: float
    response_time_minutes: float
    creator_engagement_rate: float
    retention_rate: float
    conflict_level: float
    spam_rate: float


@dataclass(slots=True)
class BehaviorChangeAlert:
    id: str
    member_id: str
    username: str
    event_type: str
    description: str
    evidence: str
    suggested_action: str


@dataclass(slots=True)
class ModerationSuggestion:
    suggestion_id: str
    target_user: str
    context: str
    action_recommended: str
    reasoning: str
    memory_citations: list[str]
    requires_approval: bool = True

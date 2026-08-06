"""Domain models for OMNIA AI Creator Network Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class CampaignType(StrEnum):
    JOINT_VIDEO = "JOINT_VIDEO"
    CROSS_PROMOTION = "CROSS_PROMOTION"
    SHARED_SPONSOR = "SHARED_SPONSOR"
    LIVE_EVENT = "LIVE_EVENT"


class PlaybookType(StrEnum):
    TEMPLATE = "TEMPLATE"
    WORKFLOW = "WORKFLOW"
    PLAYBOOK = "PLAYBOOK"
    PROMPT_LIBRARY = "PROMPT_LIBRARY"


@dataclass(slots=True)
class VerifiedCreator:
    creator_id: str
    display_name: str
    handle: str
    primary_topics: list[str]
    audience_size: int
    reputation_score: float = 96.5
    verified: bool = True


@dataclass(slots=True)
class CreatorRecommendation:
    rec_id: str
    target_creator_id: str
    matched_creator_id: str
    topic_overlap: list[str]
    audience_overlap_pct: float
    executive_reasoning: str


@dataclass(slots=True)
class SharedCampaign:
    campaign_id: str
    title: str
    campaign_type: CampaignType
    creator_ids: list[str]
    status: str = "PROPOSED"
    target_date: str = "2026-09-15"
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class CreatorPlaybook:
    playbook_id: str
    title: str
    playbook_type: PlaybookType
    author_id: str
    downloads: int = 142
    rating: float = 4.9
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

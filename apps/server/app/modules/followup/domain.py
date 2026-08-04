"""Domain models for OMNIA Autonomous Follow-up Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from uuid import UUID, uuid4


class FollowUpType(StrEnum):
    SPONSOR_REMINDER = "SPONSOR_REMINDER"
    AUDIENCE_PROMISE_REMINDER = "AUDIENCE_PROMISE_REMINDER"
    CONTENT_SERIES_REMINDER = "CONTENT_SERIES_REMINDER"
    PROJECT_REMINDER = "PROJECT_REMINDER"
    GOAL_REMINDER = "GOAL_REMINDER"
    COMMUNITY_FOLLOW_UP = "COMMUNITY_FOLLOW_UP"
    ANALYTICS_INVESTIGATION = "ANALYTICS_INVESTIGATION"
    MILESTONE_REMINDER = "MILESTONE_REMINDER"
    LEARNING_REMINDER = "LEARNING_REMINDER"
    COLLABORATION_REMINDER = "COLLABORATION_REMINDER"
    REVENUE_OPPORTUNITY = "REVENUE_OPPORTUNITY"
    RISK_WARNING = "RISK_WARNING"


class FollowUpPriority(StrEnum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    SOMEDAY = "SOMEDAY"


class FollowUpState(StrEnum):
    PENDING = "PENDING"
    SCHEDULED = "SCHEDULED"
    DISMISSED = "DISMISSED"
    APPROVED = "APPROVED"
    COMPLETED = "COMPLETED"
    EXPIRED = "EXPIRED"
    CONVERTED_TO_MISSION = "CONVERTED_TO_MISSION"


class RiskLevel(StrEnum):
    LOW = "LOW"
    HIGH = "HIGH"


@dataclass(slots=True)
class FollowUpItem:
    id: str
    title: str
    description: str
    reason: str
    trigger: str
    followup_type: FollowUpType
    priority: FollowUpPriority
    state: FollowUpState
    risk_level: RiskLevel
    confidence: float
    creator_id: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    deadline: datetime | None = None
    supporting_memories: list[str] = field(default_factory=list)
    related_goals: list[str] = field(default_factory=list)
    related_projects: list[str] = field(default_factory=list)
    suggested_actions: list[str] = field(default_factory=list)
    approval_status: str = "PENDING_REVIEW"
    outcome: str = ""
    score: float = 0.85


@dataclass(slots=True)
class FollowUpEvaluationOutcome:
    evaluated_count: int
    created_count: int
    auto_executed_count: int
    queued_for_approval_count: int
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class FollowUpHistoryItem:
    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    followup_id: str = ""
    action: str = ""
    performed_by: str = "OMNIA_ENGINE"
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

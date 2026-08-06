"""Domain models for OMNIA Autonomous Follow-up Engine Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from uuid import UUID, uuid4


class FollowUpType(StrEnum):
    CONTENT_FOLLOW_UP = "CONTENT_FOLLOW_UP"
    SPONSOR_FOLLOW_UP = "SPONSOR_FOLLOW_UP"
    COMMUNITY_FOLLOW_UP = "COMMUNITY_FOLLOW_UP"
    GOAL_FOLLOW_UP = "GOAL_FOLLOW_UP"
    LEARNING_FOLLOW_UP = "LEARNING_FOLLOW_UP"
    WORKFLOW_FOLLOW_UP = "WORKFLOW_FOLLOW_UP"

    # Legacy attributes for backward compatibility
    SPONSOR_REMINDER = "SPONSOR_REMINDER"
    AUDIENCE_PROMISE_REMINDER = "AUDIENCE_PROMISE_REMINDER"
    ANALYTICS_INVESTIGATION = "ANALYTICS_INVESTIGATION"


class FollowUpPriority(StrEnum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class FollowUpStatus(StrEnum):
    PENDING = "PENDING"
    SCHEDULED = "SCHEDULED"
    IN_PROGRESS = "IN_PROGRESS"
    APPROVED = "APPROVED"
    COMPLETED = "COMPLETED"
    DISMISSED = "DISMISSED"
    EXPIRED = "EXPIRED"
    CONVERTED_TO_MISSION = "CONVERTED_TO_MISSION"


# Backward compatibility aliases
FollowUpState = FollowUpStatus


class RiskLevel(StrEnum):
    LOW = "LOW"
    HIGH = "HIGH"


@dataclass(slots=True)
class FollowUpEvidence:
    memories: list[str] = field(default_factory=list)
    analytics: str = ""
    comments: list[str] = field(default_factory=list)
    goals: list[str] = field(default_factory=list)
    previous_decisions: list[str] = field(default_factory=list)
    reflection_results: str = ""


@dataclass(slots=True)
class FollowUpModel:
    id: str
    workspace_id: str
    mind_id: str
    source_event: str
    reason: str
    evidence: FollowUpEvidence
    priority: FollowUpPriority
    confidence: float
    suggested_action: str
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    due_date: datetime | None = None
    status: FollowUpStatus = FollowUpStatus.PENDING
    title: str = ""
    followup_type: FollowUpType = FollowUpType.CONTENT_FOLLOW_UP
    merged_count: int = 1
    trigger: str = "COMMUNITY_SIGNAL"
    risk_level: RiskLevel = RiskLevel.LOW
    approval_status: str = "PENDING_REVIEW"
    outcome: str = ""
    supporting_memories: list[str] = field(default_factory=list)
    related_goals: list[str] = field(default_factory=list)
    related_projects: list[str] = field(default_factory=list)
    suggested_actions: list[str] = field(default_factory=list)

    @property
    def state(self) -> FollowUpStatus:
        return self.status

    @property
    def score(self) -> float:
        return self.confidence


@dataclass(slots=True)
class AwaySummary:
    message: str = "I worked while you were away."
    new_memories_count: int = 4
    new_opportunities_count: int = 2
    completed_background_tasks_count: int = 9
    prepared_content_count: int = 4
    todays_priority_mission: str = "Publish Docker Multi-Agent System Tutorial & Repurpose Content"


@dataclass(slots=True)
class FollowUpHistoryItem:
    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    followup_id: str = ""
    action: str = ""
    performed_by: str = "OMNIA_ENGINE"
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

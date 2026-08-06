"""Domain models for OMNIA Team Collaboration Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class TeamRole(StrEnum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    CREATOR = "CREATOR"
    EDITOR = "EDITOR"
    MODERATOR = "MODERATOR"
    DESIGNER = "DESIGNER"
    MARKETING = "MARKETING"
    FINANCE = "FINANCE"
    VIEWER = "VIEWER"


class ApprovalStatus(StrEnum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    EXPIRED = "EXPIRED"


class MemoryPrivacy(StrEnum):
    PRIVATE = "PRIVATE"
    SHARED = "SHARED"
    TEAM = "TEAM"
    PROJECT = "PROJECT"


@dataclass(slots=True)
class TeamMember:
    member_id: str
    workspace_id: str
    user_id: str
    display_name: str
    email: str
    role: TeamRole
    permissions: list[str] = field(default_factory=list)
    status: str = "ACTIVE"
    joined_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class SharedMission:
    mission_id: str
    workspace_id: str
    title: str
    description: str
    assignee_id: str
    priority: str
    status: str = "IN_PROGRESS"
    evidence_links: list[str] = field(default_factory=list)
    executive_reasoning: str = ""
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ApprovalRequest:
    approval_id: str
    workspace_id: str
    requester_id: str
    target_action: str
    payload: dict[str, Any]
    status: ApprovalStatus = ApprovalStatus.PENDING
    reviewer_id: str | None = None
    comment: str = ""
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ActivityItem:
    activity_id: str
    workspace_id: str
    actor_id: str
    action: str
    target: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

"""Domain models for OMNIA Workflow Automation & Agent Orchestration Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class WorkflowType(StrEnum):
    CONTENT_PRODUCTION = "CONTENT_PRODUCTION"
    SPONSOR_CAMPAIGN = "SPONSOR_CAMPAIGN"
    COMMUNITY_GROWTH = "COMMUNITY_GROWTH"
    SERIES_PUBLISHING = "SERIES_PUBLISHING"
    WEEKLY_REVIEW = "WEEKLY_REVIEW"


class WorkflowStatus(StrEnum):
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class TaskStatus(StrEnum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    WAITING_APPROVAL = "WAITING_APPROVAL"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


@dataclass(slots=True)
class DAGTask:
    task_id: str
    workflow_id: str
    name: str
    assigned_agent: str
    dependencies: list[str]
    priority: int
    status: TaskStatus
    estimated_time_mins: int
    requires_approval: bool
    expected_output: str
    actual_output: str | None = None


@dataclass(slots=True)
class WorkflowInstance:
    workflow_id: str
    name: str
    workflow_type: WorkflowType
    status: WorkflowStatus
    current_step: int
    tasks: list[DAGTask]
    creator_id: str = "creator-default"
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class WorkflowTemplate:
    template_id: str
    name: str
    description: str
    workflow_type: WorkflowType
    default_tasks: list[dict[str, Any]]

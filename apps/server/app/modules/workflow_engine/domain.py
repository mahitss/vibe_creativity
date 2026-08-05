"""Domain models for OMNIA Workflow Execution Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class WorkflowState(StrEnum):
    QUEUED = "QUEUED"
    PREPARING = "PREPARING"
    WAITING = "WAITING"
    EXECUTING = "EXECUTING"
    PAUSED = "PAUSED"
    RETRYING = "RETRYING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class TaskState(StrEnum):
    QUEUED = "QUEUED"
    EXECUTING = "EXECUTING"
    WAITING_APPROVAL = "WAITING_APPROVAL"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    SKIPPED = "SKIPPED"


class WorkflowType(StrEnum):
    CONTENT_PRODUCTION = "CONTENT_PRODUCTION"
    SPONSOR_CAMPAIGN = "SPONSOR_CAMPAIGN"
    COMMUNITY_REVIEW = "COMMUNITY_REVIEW"
    EXECUTIVE_REVIEW = "EXECUTIVE_REVIEW"
    MEMORY_CONSOLIDATION = "MEMORY_CONSOLIDATION"
    PLATFORM_SYNC = "PLATFORM_SYNC"
    ANALYTICS_REVIEW = "ANALYTICS_REVIEW"
    REFLECTION_CYCLE = "REFLECTION_CYCLE"
    CUSTOM = "CUSTOM"


class ExecutionMode(StrEnum):
    SEQUENTIAL = "SEQUENTIAL"
    PARALLEL = "PARALLEL"
    CONDITIONAL = "CONDITIONAL"
    LOOP = "LOOP"
    MAP = "MAP"
    REDUCE = "REDUCE"
    APPROVAL_GATE = "APPROVAL_GATE"


@dataclass(slots=True)
class WorkflowTask:
    task_id: str
    workflow_id: str
    stage_id: str
    assigned_agent: str
    priority: int
    dependencies: list[str]
    execution_mode: ExecutionMode
    approval_required: bool
    estimated_duration_sec: int
    retry_policy: str
    state: TaskState = TaskState.QUEUED
    result_payload: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class WorkflowStage:
    stage_id: str
    name: str
    tasks: list[WorkflowTask]
    state: WorkflowState = WorkflowState.QUEUED


@dataclass(slots=True)
class WorkflowExecutionPlan:
    workflow_id: str
    workspace_id: str
    title: str
    workflow_type: WorkflowType
    stages: list[WorkflowStage]
    state: WorkflowState = WorkflowState.QUEUED
    current_stage_index: int = 0
    checkpoint_data: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

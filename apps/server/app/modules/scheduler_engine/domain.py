"""Domain models for OMNIA Runtime Scheduler."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class JobState(StrEnum):
    SCHEDULED = "SCHEDULED"
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    WAITING = "WAITING"
    PAUSED = "PAUSED"
    RETRYING = "RETRYING"
    SUCCEEDED = "SUCCEEDED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
    EXPIRED = "EXPIRED"


class JobType(StrEnum):
    DAILY_EXECUTIVE_REVIEW = "DAILY_EXECUTIVE_REVIEW"
    WEEKLY_STRATEGY = "WEEKLY_STRATEGY"
    MONTHLY_REFLECTION = "MONTHLY_REFLECTION"
    MEMORY_CONSOLIDATION = "MEMORY_CONSOLIDATION"
    KNOWLEDGE_GRAPH_OPTIMIZATION = "KNOWLEDGE_GRAPH_OPTIMIZATION"
    ANALYTICS_REFRESH = "ANALYTICS_REFRESH"
    COMMUNITY_SCAN = "COMMUNITY_SCAN"
    SPONSOR_OPPORTUNITY_SCAN = "SPONSOR_OPPORTUNITY_SCAN"
    GOAL_REVIEW = "GOAL_REVIEW"
    PLATFORM_SYNC = "PLATFORM_SYNC"
    NOTIFICATION_DELIVERY = "NOTIFICATION_DELIVERY"
    WORKFLOW_TRIGGER = "WORKFLOW_TRIGGER"
    CUSTOM = "CUSTOM"


class JobPriority(StrEnum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    NORMAL = "NORMAL"
    LOW = "LOW"
    BACKGROUND = "BACKGROUND"


@dataclass(slots=True)
class SchedulerJob:
    job_id: str
    workspace_id: str
    mind_id: str
    job_type: JobType
    priority: JobPriority
    scheduled_time: datetime
    created_time: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    started_time: datetime | None = None
    completed_time: datetime | None = None
    retry_count: int = 0
    dependencies: list[str] = field(default_factory=list)
    state: JobState = JobState.SCHEDULED
    owner_agent: str = "Executive Agent"
    metadata: dict[str, Any] = field(default_factory=dict)

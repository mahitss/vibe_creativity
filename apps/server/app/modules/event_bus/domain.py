"""Domain models for OMNIA Production Runtime Event Bus System."""

from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from typing import Any


class EventCategory(StrEnum):
    WORKSPACE = "WORKSPACE"
    MIND = "MIND"
    MISSION = "MISSION"
    MEMORY = "MEMORY"
    COMMUNITY = "COMMUNITY"
    SPONSOR = "SPONSOR"
    ANALYTICS = "ANALYTICS"
    WORKFLOW = "WORKFLOW"
    NOTIFICATION = "NOTIFICATION"
    RUNTIME = "RUNTIME"


class EventType(StrEnum):
    WorkspaceCreated = "WorkspaceCreated"
    MindInitialized = "MindInitialized"
    MissionCreated = "MissionCreated"
    MissionCompleted = "MissionCompleted"
    MemoryStored = "MemoryStored"
    MemoryUpdated = "MemoryUpdated"
    GoalCreated = "GoalCreated"
    GoalCompleted = "GoalCompleted"
    VideoImported = "VideoImported"
    CommentReceived = "CommentReceived"
    CommunityTrendDetected = "CommunityTrendDetected"
    SponsorOpportunityDetected = "SponsorOpportunityDetected"
    ReflectionGenerated = "ReflectionGenerated"
    WorkflowStarted = "WorkflowStarted"
    WorkflowCompleted = "WorkflowCompleted"
    RuntimeStarted = "RuntimeStarted"
    RuntimeFailed = "RuntimeFailed"


class EventPriority(StrEnum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


@dataclass(slots=True)
class OmniaEvent:
    event_id: str
    workspace_id: str
    mind_id: str
    event_type: EventType
    category: EventCategory
    aggregate_type: str
    aggregate_id: str
    version: int
    timestamp: datetime
    correlation_id: str
    causation_id: str
    source_agent: str
    priority: EventPriority
    payload: dict[str, Any]
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class EventFilter:
    workspace_id: str | None = None
    event_types: list[EventType] = field(default_factory=list)
    categories: list[EventCategory] = field(default_factory=list)
    source_agent: str | None = None
    min_priority: EventPriority | None = None


@dataclass(slots=True)
class ReplayRequest:
    range_type: str  # LAST_HOUR, LAST_DAY, LAST_WEEK, ALL
    workspace_id: str = "ws-101"
    filter_event_types: list[EventType] = field(default_factory=list)

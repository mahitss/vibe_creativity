"""Domain models for OMNIA Runtime OS Kernel."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class RuntimeState(StrEnum):
    IDLE = "IDLE"
    THINKING = "THINKING"
    PLANNING = "PLANNING"
    WAITING = "WAITING"
    EXECUTING = "EXECUTING"
    REFLECTING = "REFLECTING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class EventType(StrEnum):
    MISSION_CREATED = "MISSION_CREATED"
    MISSION_COMPLETED = "MISSION_COMPLETED"
    VIDEO_PUBLISHED = "VIDEO_PUBLISHED"
    COMMENT_RECEIVED = "COMMENT_RECEIVED"
    SPONSOR_REPLY = "SPONSOR_REPLY"
    REFLECTION_GENERATED = "REFLECTION_GENERATED"
    GOAL_UPDATED = "GOAL_UPDATED"
    MEMORY_STORED = "MEMORY_STORED"


@dataclass(slots=True)
class RuntimeEvent:
    event_id: str
    event_type: EventType
    payload: dict[str, Any]
    source: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ExecutionContext:
    workspace_id: str
    creator_id: str
    active_goals: list[str]
    memory_namespaces: list[str]
    community_signals: list[str]
    sponsor_deals: list[str]
    analytics_summary: dict[str, Any]
    current_missions: list[str]


@dataclass(slots=True)
class ExecutionStep:
    step_id: str
    agent_name: str
    action: str
    reasoning: str
    memory_grounding_ids: list[str]
    duration_ms: int
    status: str = "SUCCESS"
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ExecutionTrace:
    trace_id: str
    event_id: str
    state: RuntimeState
    steps: list[ExecutionStep] = field(default_factory=list)
    start_time: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    end_time: datetime | None = None
    total_duration_ms: int = 0

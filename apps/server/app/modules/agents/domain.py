"""Domain models for agent platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from uuid import UUID, uuid4


class TaskPriority(StrEnum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AgentStatus(StrEnum):
    IDLE = "IDLE"
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    ERROR = "ERROR"


@dataclass(slots=True)
class AgentDescriptor:
    agent_id: str
    name: str
    version: str
    description: str
    capabilities: list[str]
    dependencies: list[str]
    status: AgentStatus = AgentStatus.ACTIVE
    health: str = "HEALTHY"
    average_latency_ms: float = 12.5
    last_execution_at: datetime | None = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class AgentFinding:
    id: UUID = field(default_factory=uuid4)
    agent_id: str = ""
    topic: str = ""
    summary: str = ""
    confidence: float = 0.9
    proposed_action: str = ""
    evidence: list[str] = field(default_factory=list)
    priority_hint: TaskPriority = TaskPriority.NORMAL
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

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


class AgentLifecycleState(StrEnum):
    REGISTERED = "REGISTERED"
    VALIDATED = "VALIDATED"
    INITIALIZED = "INITIALIZED"
    READY = "READY"
    RUNNING = "RUNNING"
    PAUSED = "PAUSED"
    STOPPED = "STOPPED"
    RETIRED = "RETIRED"


class AgentCapability(StrEnum):
    PLANNING = "PLANNING"
    REASONING = "REASONING"
    RETRIEVAL = "RETRIEVAL"
    PREDICTION = "PREDICTION"
    REFLECTION = "REFLECTION"
    SCHEDULING = "SCHEDULING"
    MEMORY = "MEMORY"
    MODERATION = "MODERATION"
    ANALYTICS = "ANALYTICS"
    CONTENT_STRATEGY = "CONTENT_STRATEGY"
    WORKFLOW = "WORKFLOW"


@dataclass(slots=True)
class AgentToolSpec:
    name: str
    description: str
    input_schema: dict[str, str]
    output_schema: dict[str, str]
    permissions: list[str]
    timeout_sec: int
    retry_policy: str
    owner_agent_id: str


@dataclass(slots=True)
class AgentHealthStatus:
    heartbeat: datetime
    latency_ms: float
    error_rate: float
    success_rate: float
    queue_size: int
    memory_usage_mb: float
    cpu_usage_pct: float


@dataclass(slots=True)
class AgentManifest:
    id: str
    name: str
    version: str
    description: str
    owner: str
    capabilities: list[AgentCapability]
    dependencies: list[str]
    priority: int
    supported_events: list[str]
    supported_tools: list[AgentToolSpec]
    supported_memory_types: list[str]
    supported_workflows: list[str]
    state: AgentLifecycleState = AgentLifecycleState.READY
    health: AgentHealthStatus | None = None


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

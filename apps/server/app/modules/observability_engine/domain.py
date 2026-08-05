"""Domain models for OMNIA Runtime Observability Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class SpanType(StrEnum):
    RUNTIME = "RUNTIME"
    AGENT = "AGENT"
    MEMORY = "MEMORY"
    WORKFLOW = "WORKFLOW"
    TOOL = "TOOL"
    DATABASE = "DATABASE"
    LLM = "LLM"
    KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH"
    SCHEDULER = "SCHEDULER"
    NOTIFICATION = "NOTIFICATION"


class LogLevel(StrEnum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARN = "WARN"
    ERROR = "ERROR"
    FATAL = "FATAL"


class HealthStatus(StrEnum):
    HEALTHY = "HEALTHY"
    DEGRADED = "DEGRADED"
    UNHEALTHY = "UNHEALTHY"
    OFFLINE = "OFFLINE"


@dataclass(slots=True)
class SpanRecord:
    span_id: str
    trace_id: str
    span_type: SpanType
    name: str
    start_time: datetime
    parent_span_id: str | None = None
    end_time: datetime | None = None
    duration_ms: float = 0.0
    status: str = "OK"
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class TraceRecord:
    trace_id: str
    workspace_id: str
    correlation_id: str
    workflow_id: str | None = None
    spans: list[SpanRecord] = field(default_factory=list)
    start_time: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    end_time: datetime | None = None
    duration_ms: float = 0.0
    status: str = "OK"


@dataclass(slots=True)
class StructuredLogEntry:
    log_id: str
    workspace_id: str
    mind_id: str
    level: LogLevel
    component: str
    message: str
    trace_id: str | None = None
    span_id: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class SubsystemHealth:
    component_name: str
    status: HealthStatus
    health_score: float
    latency_ms: float
    error_rate: float
    active_alerts: int


@dataclass(slots=True)
class SystemAlert:
    alert_id: str
    workspace_id: str
    component: str
    title: str
    severity: str
    message: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

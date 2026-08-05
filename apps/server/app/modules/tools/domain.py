"""Domain models for OMNIA Tool Execution Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class ToolExecutionMode(StrEnum):
    SYNCHRONOUS = "SYNCHRONOUS"
    ASYNCHRONOUS = "ASYNCHRONOUS"
    STREAMING = "STREAMING"
    SCHEDULED = "SCHEDULED"
    BATCH = "BATCH"


class ToolType(StrEnum):
    HTTP_API = "HTTP_API"
    DATABASE = "DATABASE"
    VECTOR_SEARCH = "VECTOR_SEARCH"
    KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH"
    EMAIL = "EMAIL"
    CALENDAR = "CALENDAR"
    NOTIFICATION = "NOTIFICATION"
    FILE_STORAGE = "FILE_STORAGE"
    LLM_CALL = "LLM_CALL"
    BACKGROUND_JOB = "BACKGROUND_JOB"
    MCP_TOOL = "MCP_TOOL"


class ToolExecutionStatus(StrEnum):
    REQUESTED = "REQUESTED"
    STARTED = "STARTED"
    SUCCEEDED = "SUCCEEDED"
    FAILED = "FAILED"
    RETRIED = "RETRIED"
    CANCELLED = "CANCELLED"


@dataclass(slots=True)
class ToolManifestSpec:
    id: str
    name: str
    description: str
    version: str
    owner: str
    tool_type: ToolType
    input_schema: dict[str, str]
    output_schema: dict[str, str]
    permissions: list[str]
    timeout_sec: int = 10
    retry_policy: str = "EXPONENTIAL_BACKOFF_3"
    rate_limit_per_min: int = 60
    cost_estimate_usd: float = 0.001


@dataclass(slots=True)
class ToolExecutionRecord:
    record_id: str
    tool_id: str
    requesting_agent_id: str
    status: ToolExecutionStatus
    input_params: dict[str, Any]
    output_data: dict[str, Any] | None = None
    error_message: str | None = None
    latency_ms: float = 0.0
    retries_taken: int = 0
    cost_usd: float = 0.0
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

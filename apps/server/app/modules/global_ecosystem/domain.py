"""Domain models for OMNIA Global Intelligence Ecosystem Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class ProtocolType(StrEnum):
    AGENT_MESSAGE = "AGENT_MESSAGE"
    WORKFLOW_TRANSFER = "WORKFLOW_TRANSFER"
    MEMORY_EXPORT = "MEMORY_EXPORT"
    TOOL_DISCOVERY = "TOOL_DISCOVERY"


class MigrationStatus(StrEnum):
    INITIATED = "INITIATED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    VERIFIED = "VERIFIED"


@dataclass(slots=True)
class EcosystemMessage:
    msg_id: str
    protocol_type: ProtocolType
    sender_runtime: str
    receiver_runtime: str
    payload: dict[str, Any]
    signature: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class PortableMemoryPackage:
    package_id: str
    creator_id: str
    memory_count: int
    schema_version: str
    checksum: str
    exported_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class PlatformMigrationResult:
    migration_id: str
    creator_id: str
    source_platform: str
    target_platform: str
    transferred_memories: int
    transferred_workflows: int
    status: MigrationStatus

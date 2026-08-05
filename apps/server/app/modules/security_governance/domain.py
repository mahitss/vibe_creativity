"""Domain models for OMNIA Runtime Security & Governance Layer."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class SecurityRole(StrEnum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    EDITOR = "EDITOR"
    VIEWER = "VIEWER"
    RUNTIME = "RUNTIME"
    AGENT = "AGENT"
    SYSTEM = "SYSTEM"


class RiskLevel(StrEnum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class ApprovalStatus(StrEnum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    EXPIRED = "EXPIRED"


@dataclass(slots=True)
class PolicyRule:
    rule_id: str
    name: str
    description: str
    required_role: SecurityRole
    requires_approval: bool
    min_risk_level: RiskLevel


@dataclass(slots=True)
class SecurityContextSpec:
    workspace_id: str
    mind_id: str
    user_id: str
    role: SecurityRole
    session_id: str
    requested_action: str
    requested_resource: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ApprovalRequestSpec:
    approval_id: str
    workspace_id: str
    action: str
    resource: str
    risk_level: RiskLevel
    requester_agent: str
    status: ApprovalStatus = ApprovalStatus.PENDING
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    decided_at: datetime | None = None


@dataclass(slots=True)
class AuditLogEntry:
    audit_id: str
    workspace_id: str
    action: str
    resource: str
    performed_by: str
    risk_level: RiskLevel
    status: str
    trace_id: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

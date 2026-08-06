"""Domain models for OMNIA Open Intelligence Foundation Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class StandardCategory(StrEnum):
    MEMORY_EXCHANGE = "MEMORY_EXCHANGE"
    AGENT_MANIFEST = "AGENT_MANIFEST"
    WORKFLOW_DEF = "WORKFLOW_DEF"
    CONNECTOR_PROTOCOL = "CONNECTOR_PROTOCOL"
    AUDIT_TRACE = "AUDIT_TRACE"


class ComplianceStatus(StrEnum):
    PASSED = "PASSED"
    WARNING = "WARNING"
    FAILED = "FAILED"


@dataclass(slots=True)
class OpenStandard:
    spec_id: str
    category: StandardCategory
    title: str
    version: str
    spec_url: str
    schema_definition: dict[str, Any]


@dataclass(slots=True)
class CertificationResult:
    cert_id: str
    target_name: str
    target_type: str
    compliance_status: ComplianceStatus
    score: float
    checks: list[dict[str, Any]]
    issued_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class GrantProgram:
    grant_id: str
    title: str
    category: str
    funding_usd: float
    status: str

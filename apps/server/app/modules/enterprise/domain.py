"""Domain models for OMNIA Enterprise Governance Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class EnterpriseRole(StrEnum):
    ORG_OWNER = "ORG_OWNER"
    ORG_ADMIN = "ORG_ADMIN"
    WORKSPACE_ADMIN = "WORKSPACE_ADMIN"
    TEAM_LEAD = "TEAM_LEAD"
    CREATOR = "CREATOR"
    EDITOR = "EDITOR"
    VIEWER = "VIEWER"
    AUDITOR = "AUDITOR"


class PolicyRule(StrEnum):
    MEMORY_RETENTION_DAYS = "MEMORY_RETENTION_DAYS"
    MAX_WORKSPACES = "MAX_WORKSPACES"
    REQUIRE_PUBLISH_APPROVAL = "REQUIRE_PUBLISH_APPROVAL"
    RESTRICT_AI_PROVIDERS = "RESTRICT_AI_PROVIDERS"


@dataclass(slots=True)
class Organization:
    org_id: str
    name: str
    owner_id: str
    departments: list[str] = field(default_factory=list)
    workspaces: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class OrgPolicy:
    policy_id: str
    org_id: str
    rule_name: str
    rule_value: str
    enabled: bool = True


@dataclass(slots=True)
class AuditEvent:
    audit_id: str
    org_id: str
    workspace_id: str
    actor_id: str
    action: str
    details: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class BillingQuota:
    org_id: str
    plan_tier: str
    memory_limit_mb: float
    ai_token_quota: int
    current_usage_mb: float = 142.5

"""Service layer for OMNIA Enterprise Governance Platform."""

from datetime import UTC, datetime
from uuid import uuid4

from app.modules.enterprise.domain import (
    AuditEvent,
    BillingQuota,
    Organization,
    OrgPolicy,
    PolicyRule,
)


class OrganizationService:
    """Manages multi-workspace enterprise organization structures."""

    def create_org(self, name: str, owner_id: str) -> Organization:
        return Organization(
            org_id=f"org-{uuid4().hex[:6]}",
            name=name,
            owner_id=owner_id,
            departments=["Media Network", "Brand Sponsorships"],
            workspaces=["ws-101", "ws-102"],
            created_at=datetime.now(tz=UTC),
        )


class PolicyEngine:
    """Enforces organization-wide compliance policies and workspace boundaries."""

    def get_default_policies(self, org_id: str) -> list[OrgPolicy]:
        return [
            OrgPolicy("pol-1", org_id, PolicyRule.MEMORY_RETENTION_DAYS.value, "365", True),
            OrgPolicy("pol-2", org_id, PolicyRule.REQUIRE_PUBLISH_APPROVAL.value, "true", True),
        ]


class AuditCenterEngine:
    """Collects immutable enterprise compliance audit streams."""

    def record_event(
        self, org_id: str, workspace_id: str, actor_id: str, action: str, details: str
    ) -> AuditEvent:
        return AuditEvent(
            audit_id=f"aud-{uuid4().hex[:6]}",
            org_id=org_id,
            workspace_id=workspace_id,
            actor_id=actor_id,
            action=action,
            details=details,
            timestamp=datetime.now(tz=UTC),
        )


class EnterpriseEngine:
    """Master Enterprise Engine coordinating organizations, policies, audit streams, and billing quotas."""

    def __init__(self) -> None:
        self.org_service = OrganizationService()
        self.policy_engine = PolicyEngine()
        self.audit_engine = AuditCenterEngine()
        self._orgs: dict[str, Organization] = {}
        self._policies: dict[str, OrgPolicy] = {}
        self._audit_logs: list[AuditEvent] = []
        self._quotas: dict[str, BillingQuota] = {}
        self._seed_default_data()

    def _seed_default_data(self) -> None:
        org = self.org_service.create_org("Acro Media Enterprise Network", "creator-alex-101")
        self._orgs[org.org_id] = org

        pols = self.policy_engine.get_default_policies(org.org_id)
        for p in pols:
            self._policies[p.policy_id] = p

        evt = self.audit_engine.record_event(
            org.org_id, "ws-101", "creator-alex-101", "ORG_CREATED", "Initialized Acro Media Enterprise Network."
        )
        self._audit_logs.append(evt)

        quota = BillingQuota(org.org_id, "ENTERPRISE", 10000.0, 5000000, 142.5)
        self._quotas[org.org_id] = quota

    def get_organizations(self) -> list[Organization]:
        return list(self._orgs.values())

    def get_organization_by_id(self, org_id: str) -> Organization | None:
        return self._orgs.get(org_id)

    def create_organization(self, name: str, owner_id: str) -> Organization:
        org = self.org_service.create_org(name, owner_id)
        self._orgs[org.org_id] = org
        return org

    def get_audit_logs(self, org_id: str = "") -> list[AuditEvent]:
        if not org_id:
            return self._audit_logs
        return [a for a in self._audit_logs if a.org_id == org_id]

    def get_policies(self, org_id: str = "") -> list[OrgPolicy]:
        if not org_id:
            return list(self._policies.values())
        return [p for p in self._policies.values() if p.org_id == org_id]

    def update_policy(self, policy_id: str, rule_value: str, enabled: bool) -> OrgPolicy:
        p = self._policies.get(policy_id)
        if not p:
            raise KeyError(f"Policy {policy_id} not found")
        p.rule_value = rule_value
        p.enabled = enabled
        return p

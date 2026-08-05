"""Service layer for OMNIA Runtime Security & Governance Layer."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.security_governance.domain import (
    ApprovalRequestSpec,
    ApprovalStatus,
    AuditLogEntry,
    PolicyRule,
    RiskLevel,
    SecurityContextSpec,
    SecurityRole,
)


class RiskEvaluator:
    """Evaluates risk levels for requested actions."""

    def evaluate(self, action: str, resource: str) -> RiskLevel:
        act = action.lower()
        if "delete_workspace" in act or "delete_database" in act:
            return RiskLevel.CRITICAL
        if any(kw in act for kw in ["publish", "email", "payment", "contract", "delete_memory"]):
            return RiskLevel.HIGH
        if any(kw in act for kw in ["update", "modify", "patch", "schedule"]):
            return RiskLevel.MEDIUM
        return RiskLevel.LOW


class PolicyEngine:
    """Validates RBAC permissions and policy compliance."""

    def is_authorized(self, role: SecurityRole, required_role: SecurityRole) -> bool:
        hierarchy = {
            SecurityRole.OWNER: 7,
            SecurityRole.ADMIN: 6,
            SecurityRole.SYSTEM: 5,
            SecurityRole.RUNTIME: 4,
            SecurityRole.EDITOR: 3,
            SecurityRole.AGENT: 2,
            SecurityRole.VIEWER: 1,
        }
        return hierarchy.get(role, 0) >= hierarchy.get(required_role, 0)


class SecurityGovernanceEngine:
    """Master Security Engine evaluating security policies, risk scoring, approval gates, and audit trails."""

    def __init__(self) -> None:
        self.risk_evaluator = RiskEvaluator()
        self.policy_engine = PolicyEngine()
        self._policies: dict[str, PolicyRule] = {}
        self._approvals: dict[str, ApprovalRequestSpec] = {}
        self._audit_trail: list[AuditLogEntry] = []
        self._seed_default_security_rules()

    def _seed_default_security_rules(self) -> None:
        p1 = PolicyRule(
            rule_id="pol-delete-workspace",
            name="Workspace Deletion Protection",
            description="Only workspace Owners may delete a Creator Workspace.",
            required_role=SecurityRole.OWNER,
            requires_approval=True,
            min_risk_level=RiskLevel.CRITICAL,
        )
        p2 = PolicyRule(
            rule_id="pol-content-publish",
            name="Content Publishing Approval Gate",
            description="External content publishing requires creator approval.",
            required_role=SecurityRole.EDITOR,
            requires_approval=True,
            min_risk_level=RiskLevel.HIGH,
        )
        p3 = PolicyRule(
            rule_id="pol-sponsor-deal",
            name="Sponsor Deal Accept Gate",
            description="Sponsorship contract acceptance requires explicit creator approval.",
            required_role=SecurityRole.ADMIN,
            requires_approval=True,
            min_risk_level=RiskLevel.HIGH,
        )

        for p in [p1, p2, p3]:
            self._policies[p.rule_id] = p

    def evaluate_action(
        self,
        context: SecurityContextSpec,
        requester_agent: str = "Executive Agent",
    ) -> dict[str, Any]:
        risk = self.risk_evaluator.evaluate(context.requested_action, context.requested_resource)
        now = datetime.now(tz=UTC)

        requires_approval = risk in [RiskLevel.CRITICAL, RiskLevel.HIGH]
        allowed = True
        approval_id = None

        if "delete_workspace" in context.requested_action.lower() and context.role != SecurityRole.OWNER:
            allowed = False
            requires_approval = False

        if allowed and requires_approval:
            approval_id = f"appr-{uuid4().hex[:6]}"
            req = ApprovalRequestSpec(
                approval_id=approval_id,
                workspace_id=context.workspace_id,
                action=context.requested_action,
                resource=context.requested_resource,
                risk_level=risk,
                requester_agent=requester_agent,
                status=ApprovalStatus.PENDING,
                created_at=now,
            )
            self._approvals[approval_id] = req

        # Audit log
        audit = AuditLogEntry(
            audit_id=f"audit-{uuid4().hex[:6]}",
            workspace_id=context.workspace_id,
            action=context.requested_action,
            resource=context.requested_resource,
            performed_by=requester_agent,
            risk_level=risk,
            status="APPROVAL_PENDING" if requires_approval else ("ALLOWED" if allowed else "DENIED"),
            timestamp=now,
        )
        self._audit_trail.append(audit)

        return {
            "allowed": allowed,
            "requires_approval": requires_approval,
            "approval_id": approval_id,
            "risk_level": risk.value,
            "role": context.role.value,
            "audit_id": audit.audit_id,
        }

    def decide_approval(self, approval_id: str, approved: bool) -> ApprovalRequestSpec:
        req = self._approvals.get(approval_id)
        if not req:
            raise KeyError(f"Approval request {approval_id} not found")

        req.status = ApprovalStatus.APPROVED if approved else ApprovalStatus.REJECTED
        req.decided_at = datetime.now(tz=UTC)

        audit = AuditLogEntry(
            audit_id=f"audit-{uuid4().hex[:6]}",
            workspace_id=req.workspace_id,
            action=req.action,
            resource=req.resource,
            performed_by="Creator User",
            risk_level=req.risk_level,
            status=req.status.value,
            timestamp=datetime.now(tz=UTC),
        )
        self._audit_trail.append(audit)
        return req

    def get_policies(self) -> list[PolicyRule]:
        return list(self._policies.values())

    def get_audit_trail(self, workspace_id: str = "ws-101", limit: int = 100) -> list[AuditLogEntry]:
        logs = [a for a in self._audit_trail if a.workspace_id == workspace_id]
        logs.sort(key=lambda x: x.timestamp, reverse=True)
        return logs[:limit]

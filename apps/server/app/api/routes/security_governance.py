"""FastAPI route handlers for OMNIA Runtime Security & Governance Layer."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.security_governance.domain import (
    ApprovalRequestSpec,
    AuditLogEntry,
    PolicyRule,
    SecurityContextSpec,
    SecurityRole,
)
from app.modules.security_governance.service import SecurityGovernanceEngine

router = APIRouter(tags=["security"])

_security_engine = SecurityGovernanceEngine()


def get_security_engine() -> SecurityGovernanceEngine:
    return _security_engine


class EvaluateActionPayload(BaseModel):
    requested_action: str = Field(..., description="Requested action name")
    requested_resource: str = Field(..., description="Target resource path or ID")
    role: SecurityRole = Field(default=SecurityRole.AGENT, description="Role executing the action")
    requester_agent: str = Field(default="Executive Agent", description="Requester agent name")


class ApproveActionPayload(BaseModel):
    approval_id: str = Field(..., description="Approval request ID")
    approved: bool = Field(..., description="True to approve, False to reject")


def _format_policy(p: PolicyRule) -> dict[str, Any]:
    return {
        "rule_id": p.rule_id,
        "name": p.name,
        "description": p.description,
        "required_role": p.required_role.value,
        "requires_approval": p.requires_approval,
        "min_risk_level": p.min_risk_level.value,
    }


def _format_approval(req: ApprovalRequestSpec) -> dict[str, Any]:
    return {
        "approval_id": req.approval_id,
        "workspace_id": req.workspace_id,
        "action": req.action,
        "resource": req.resource,
        "risk_level": req.risk_level.value,
        "requester_agent": req.requester_agent,
        "status": req.status.value,
        "created_at": req.created_at.isoformat(),
        "decided_at": req.decided_at.isoformat() if req.decided_at else None,
    }


def _format_audit(a: AuditLogEntry) -> dict[str, Any]:
    return {
        "audit_id": a.audit_id,
        "workspace_id": a.workspace_id,
        "action": a.action,
        "resource": a.resource,
        "performed_by": a.performed_by,
        "risk_level": a.risk_level.value,
        "status": a.status,
        "trace_id": a.trace_id,
        "timestamp": a.timestamp.isoformat(),
    }


@router.post("/runtime/security/evaluate")
async def evaluate_action(
    payload: EvaluateActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SecurityGovernanceEngine = Depends(get_security_engine),
) -> dict[str, Any]:
    sec_ctx = SecurityContextSpec(
        workspace_id=context.creator_id,
        mind_id=f"mind-{context.creator_id}",
        user_id=context.creator_id,
        role=payload.role,
        session_id=f"sess-{context.creator_id}",
        requested_action=payload.requested_action,
        requested_resource=payload.requested_resource,
    )
    return engine.evaluate_action(sec_ctx, requester_agent=payload.requester_agent)


@router.get("/runtime/security/policies")
async def list_policies(
    engine: SecurityGovernanceEngine = Depends(get_security_engine),
) -> list[dict[str, Any]]:
    policies = engine.get_policies()
    return [_format_policy(p) for p in policies]


@router.get("/runtime/security/audit")
async def get_audit_trail(
    limit: int = 100,
    context: CreatorContext = Depends(require_creator_context),
    engine: SecurityGovernanceEngine = Depends(get_security_engine),
) -> list[dict[str, Any]]:
    logs = engine.get_audit_trail(workspace_id=context.creator_id, limit=limit)
    return [_format_audit(a) for a in logs]


@router.post("/runtime/security/approve")
async def approve_action(
    payload: ApproveActionPayload,
    engine: SecurityGovernanceEngine = Depends(get_security_engine),
) -> dict[str, Any]:
    try:
        req = engine.decide_approval(payload.approval_id, payload.approved)
        return _format_approval(req)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

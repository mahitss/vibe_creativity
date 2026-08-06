"""FastAPI route handlers for OMNIA Enterprise Governance Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.enterprise.domain import AuditEvent, Organization, OrgPolicy
from app.modules.enterprise.service import EnterpriseEngine

router = APIRouter(tags=["enterprise"])

_enterprise_engine = EnterpriseEngine()


def get_enterprise_engine() -> EnterpriseEngine:
    return _enterprise_engine


class CreateOrgPayload(BaseModel):
    name: str = Field(..., description="Enterprise organization name")


class UpdatePolicyPayload(BaseModel):
    policy_id: str = Field(..., description="Target policy ID")
    rule_value: str = Field(..., description="Updated policy rule value")
    enabled: bool = Field(..., description="Enforcement toggle")


def _format_org(o: Organization) -> dict[str, Any]:
    return {
        "org_id": o.org_id,
        "name": o.name,
        "owner_id": o.owner_id,
        "departments": o.departments,
        "workspaces": o.workspaces,
        "created_at": o.created_at.isoformat(),
    }


def _format_policy(p: OrgPolicy) -> dict[str, Any]:
    return {
        "policy_id": p.policy_id,
        "org_id": p.org_id,
        "rule_name": p.rule_name,
        "rule_value": p.rule_value,
        "enabled": p.enabled,
    }


def _format_audit(a: AuditEvent) -> dict[str, Any]:
    return {
        "audit_id": a.audit_id,
        "org_id": a.org_id,
        "workspace_id": a.workspace_id,
        "actor_id": a.actor_id,
        "action": a.action,
        "details": a.details,
        "timestamp": a.timestamp.isoformat(),
    }


@router.get("/organizations")
async def list_organizations(
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> list[dict[str, Any]]:
    orgs = engine.get_organizations()
    return [_format_org(o) for o in orgs]


@router.post("/organizations")
async def create_organization(
    payload: CreateOrgPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> dict[str, Any]:
    org = engine.create_organization(name=payload.name, owner_id=context.creator_id)
    return _format_org(org)


@router.get("/organizations/{id}")
async def get_organization_by_id(
    id: str,
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> dict[str, Any]:
    org = engine.get_organization_by_id(id)
    if not org:
        raise HTTPException(status_code=404, detail=f"Organization {id} not found")
    return _format_org(org)


@router.get("/audit")
async def list_audit_trail(
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> list[dict[str, Any]]:
    audits = engine.get_audit_logs()
    return [_format_audit(a) for a in audits]


@router.get("/policies")
async def list_policies(
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> list[dict[str, Any]]:
    policies = engine.get_policies()
    return [_format_policy(p) for p in policies]


@router.patch("/policies")
async def update_policy(
    payload: UpdatePolicyPayload,
    engine: EnterpriseEngine = Depends(get_enterprise_engine),
) -> dict[str, Any]:
    try:
        p = engine.update_policy(
            policy_id=payload.policy_id,
            rule_value=payload.rule_value,
            enabled=payload.enabled,
        )
        return _format_policy(p)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

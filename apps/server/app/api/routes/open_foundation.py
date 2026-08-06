"""FastAPI route handlers for OMNIA Open Intelligence Foundation Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.modules.open_foundation.domain import (
    CertificationResult,
    GrantProgram,
    OpenStandard,
)
from app.modules.open_foundation.service import FoundationEngine

router = APIRouter(prefix="/foundation", tags=["foundation"])

_foundation_engine = FoundationEngine()


def get_foundation_engine() -> FoundationEngine:
    return _foundation_engine


class CertifyTargetPayload(BaseModel):
    target_name: str = Field(..., description="Target runtime/connector/agent name")
    target_type: str = Field(..., description="Target category e.g. CONNECTOR, AGENT, RUNTIME")


def _format_standard(s: OpenStandard) -> dict[str, Any]:
    return {
        "spec_id": s.spec_id,
        "category": s.category.value,
        "title": s.title,
        "version": s.version,
        "spec_url": s.spec_url,
        "schema_definition": s.schema_definition,
    }


def _format_certification(c: CertificationResult) -> dict[str, Any]:
    return {
        "cert_id": c.cert_id,
        "target_name": c.target_name,
        "target_type": c.target_type,
        "compliance_status": c.compliance_status.value,
        "score": c.score,
        "checks": c.checks,
        "issued_at": c.issued_at.isoformat(),
    }


def _format_grant(g: GrantProgram) -> dict[str, Any]:
    return {
        "grant_id": g.grant_id,
        "title": g.title,
        "category": g.category,
        "funding_usd": g.funding_usd,
        "status": g.status,
    }


@router.get("/standards")
async def list_open_standards(
    engine: FoundationEngine = Depends(get_foundation_engine),
) -> list[dict[str, Any]]:
    standards = engine.get_standards()
    return [_format_standard(s) for s in standards]


@router.post("/certify")
async def certify_ecosystem_target(
    payload: CertifyTargetPayload,
    engine: FoundationEngine = Depends(get_foundation_engine),
) -> dict[str, Any]:
    res = engine.certify_target(target_name=payload.target_name, target_type=payload.target_type)
    return _format_certification(res)


@router.get("/certifications")
async def list_certifications(
    engine: FoundationEngine = Depends(get_foundation_engine),
) -> list[dict[str, Any]]:
    certs = engine.get_certifications()
    return [_format_certification(c) for c in certs]


@router.get("/grants")
async def list_developer_grants(
    engine: FoundationEngine = Depends(get_foundation_engine),
) -> list[dict[str, Any]]:
    grants = engine.get_grants()
    return [_format_grant(g) for g in grants]

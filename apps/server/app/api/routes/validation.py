"""FastAPI route handlers for OMNIA Runtime Integration & Validation Framework."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.validation_engine.domain import (
    CategoryScore,
    CertificationReport,
    CreatorScenario,
)
from app.modules.validation_engine.service import ValidationEngine

router = APIRouter(tags=["validation"])

_validation_engine = ValidationEngine()


def get_validation_engine() -> ValidationEngine:
    return _validation_engine


class SimulateScenarioPayload(BaseModel):
    scenario: CreatorScenario = Field(default=CreatorScenario.VIRAL_CREATOR, description="Creator simulation scenario")


def _format_category_score(cs: CategoryScore) -> dict[str, Any]:
    return {
        "category": cs.category,
        "score": cs.score,
        "status": cs.status,
    }


def _format_certification(cr: CertificationReport) -> dict[str, Any]:
    return {
        "certification_id": cr.certification_id,
        "workspace_id": cr.workspace_id,
        "overall_score": cr.overall_score,
        "grade": cr.grade.value,
        "category_scores": [_format_category_score(cs) for cs in cr.category_scores],
        "total_tests": cr.total_tests,
        "passed_tests": cr.passed_tests,
        "failed_tests": cr.failed_tests,
        "timestamp": cr.timestamp.isoformat(),
    }


@router.post("/runtime/validate")
async def run_validation_suite(
    context: CreatorContext = Depends(require_creator_context),
    engine: ValidationEngine = Depends(get_validation_engine),
) -> dict[str, Any]:
    report = engine.run_validation_suite(workspace_id=context.creator_id)
    return _format_certification(report)


@router.post("/runtime/simulate")
async def run_simulation(
    payload: SimulateScenarioPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ValidationEngine = Depends(get_validation_engine),
) -> dict[str, Any]:
    return engine.run_simulation(scenario=payload.scenario, workspace_id=context.creator_id)


@router.get("/runtime/report")
async def get_validation_report(
    engine: ValidationEngine = Depends(get_validation_engine),
) -> dict[str, Any]:
    return engine.get_validation_report()


@router.get("/runtime/certification")
async def get_certification(
    context: CreatorContext = Depends(require_creator_context),
    engine: ValidationEngine = Depends(get_validation_engine),
) -> dict[str, Any]:
    report = engine.get_certification_report(workspace_id=context.creator_id)
    return _format_certification(report)

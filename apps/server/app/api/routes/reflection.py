"""FastAPI route handlers for OMNIA Reflection & Learning Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.reflection_engine.domain import (
    LearningPatternSpec,
    ReflectionRecord,
    ReflectionTrigger,
)
from app.modules.reflection_engine.service import ReflectionEngine

router = APIRouter(tags=["reflection"])

_reflection_engine = ReflectionEngine()


def get_reflection_engine() -> ReflectionEngine:
    return _reflection_engine


class RunReflectionPayload(BaseModel):
    source_workflow_id: str = Field(..., description="Source workflow ID")
    trigger_event: ReflectionTrigger = Field(default=ReflectionTrigger.WORKFLOW_COMPLETED, description="Trigger event")
    observation: str = Field(..., description="Observation summary")
    expected_result: str = Field(..., description="Expected outcome description")
    actual_result: str = Field(..., description="Actual outcome description")


def _format_reflection(r: ReflectionRecord) -> dict[str, Any]:
    return {
        "reflection_id": r.reflection_id,
        "workspace_id": r.workspace_id,
        "mind_id": r.mind_id,
        "source_workflow_id": r.source_workflow_id,
        "trigger_event": r.trigger_event.value,
        "observation": r.observation,
        "outcome": r.outcome,
        "expected_result": r.expected_result,
        "actual_result": r.actual_result,
        "root_cause": r.root_cause,
        "lessons_learned": r.lessons_learned,
        "recommended_improvements": r.recommended_improvements,
        "confidence_adjustment": r.confidence_adjustment,
        "timestamp": r.timestamp.isoformat(),
    }


def _format_learning(pattern: LearningPatternSpec) -> dict[str, Any]:
    return {
        "pattern_id": pattern.pattern_id,
        "workspace_id": pattern.workspace_id,
        "title": pattern.title,
        "learning_type": pattern.learning_type.value,
        "confidence_score": pattern.confidence_score,
        "evidence_count": pattern.evidence_count,
        "description": pattern.description,
        "timestamp": pattern.timestamp.isoformat(),
    }


@router.post("/runtime/reflections/run")
async def run_reflection(
    payload: RunReflectionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ReflectionEngine = Depends(get_reflection_engine),
) -> dict[str, Any]:
    rec = engine.run_reflection(
        source_workflow_id=payload.source_workflow_id,
        trigger_event=payload.trigger_event,
        observation=payload.observation,
        expected_result=payload.expected_result,
        actual_result=payload.actual_result,
        workspace_id=context.creator_id,
    )
    return _format_reflection(rec)


@router.get("/runtime/reflections")
async def list_reflections(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ReflectionEngine = Depends(get_reflection_engine),
) -> list[dict[str, Any]]:
    reflections = engine.list_reflections(workspace_id=context.creator_id, limit=limit)
    return [_format_reflection(r) for r in reflections]


@router.get("/runtime/learnings")
async def list_learnings(
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: ReflectionEngine = Depends(get_reflection_engine),
) -> list[dict[str, Any]]:
    learnings = engine.list_learnings(workspace_id=context.creator_id, limit=limit)
    return [_format_learning(p) for p in learnings]


@router.get("/runtime/confidence")
async def get_confidence_metrics(
    engine: ReflectionEngine = Depends(get_reflection_engine),
) -> dict[str, Any]:
    return engine.get_confidence_metrics()


@router.get("/runtime/reflections/{reflection_id}")
async def get_reflection_details(
    reflection_id: str,
    engine: ReflectionEngine = Depends(get_reflection_engine),
) -> dict[str, Any]:
    try:
        reflections = engine.list_reflections(limit=500)
        target = next((r for r in reflections if r.reflection_id == reflection_id), None)
        if not target:
            raise KeyError(f"Reflection {reflection_id} not found")
        return _format_reflection(target)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

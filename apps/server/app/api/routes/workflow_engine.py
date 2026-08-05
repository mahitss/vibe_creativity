"""FastAPI route handlers for OMNIA Workflow Execution Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.workflow_engine.domain import (
    WorkflowExecutionPlan,
    WorkflowStage,
    WorkflowTask,
    WorkflowType,
)
from app.modules.workflow_engine.service import WorkflowEngine

router = APIRouter(tags=["workflows"])

_workflow_engine = WorkflowEngine()


def get_workflow_engine() -> WorkflowEngine:
    return _workflow_engine


class CreateWorkflowPayload(BaseModel):
    title: str = Field(..., description="Workflow title")
    workflow_type: WorkflowType = Field(default=WorkflowType.CONTENT_PRODUCTION, description="Workflow type")


class WorkflowActionPayload(BaseModel):
    workflow_id: str = Field(..., description="Target workflow ID")


def _format_task(t: WorkflowTask) -> dict[str, Any]:
    return {
        "task_id": t.task_id,
        "workflow_id": t.workflow_id,
        "stage_id": t.stage_id,
        "assigned_agent": t.assigned_agent,
        "priority": t.priority,
        "dependencies": t.dependencies,
        "execution_mode": t.execution_mode.value,
        "approval_required": t.approval_required,
        "estimated_duration_sec": t.estimated_duration_sec,
        "retry_policy": t.retry_policy,
        "state": t.state.value,
        "result_payload": t.result_payload,
    }


def _format_stage(s: WorkflowStage) -> dict[str, Any]:
    return {
        "stage_id": s.stage_id,
        "name": s.name,
        "tasks": [_format_task(t) for t in s.tasks],
        "state": s.state.value,
    }


def _format_plan(p: WorkflowExecutionPlan) -> dict[str, Any]:
    return {
        "workflow_id": p.workflow_id,
        "workspace_id": p.workspace_id,
        "title": p.title,
        "workflow_type": p.workflow_type.value,
        "stages": [_format_stage(s) for s in p.stages],
        "state": p.state.value,
        "current_stage_index": p.current_stage_index,
        "checkpoint_data": p.checkpoint_data,
        "created_at": p.created_at.isoformat(),
        "updated_at": p.updated_at.isoformat(),
    }


@router.post("/runtime/workflows")
async def create_workflow(
    payload: CreateWorkflowPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    plan = engine.create_workflow(
        title=payload.title,
        workflow_type=payload.workflow_type,
        workspace_id=context.creator_id,
    )
    return _format_plan(plan)


@router.post("/runtime/workflows/run")
async def run_workflow(
    payload: WorkflowActionPayload,
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        plan = engine.run_workflow(payload.workflow_id)
        return _format_plan(plan)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/runtime/workflows/pause")
async def pause_workflow(
    payload: WorkflowActionPayload,
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        plan = engine.pause_workflow(payload.workflow_id)
        return _format_plan(plan)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/runtime/workflows/resume")
async def resume_workflow(
    payload: WorkflowActionPayload,
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        plan = engine.resume_workflow(payload.workflow_id)
        return _format_plan(plan)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/runtime/workflows/history")
async def get_workflow_history(
    context: CreatorContext = Depends(require_creator_context),
    limit: int = 50,
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> list[dict[str, Any]]:
    history = engine.list_history(workspace_id=context.creator_id, limit=limit)
    return [_format_plan(p) for p in history]


@router.get("/runtime/workflows/{workflow_id}")
async def get_workflow_details(
    workflow_id: str,
    engine: WorkflowEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        plan = engine.get_workflow(workflow_id)
        return _format_plan(plan)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

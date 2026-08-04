"""FastAPI routes for OMNIA Workflow Automation & Agent Orchestration Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.workflows.service import WorkflowOrchestratorEngine

router = APIRouter(prefix="/workflows", tags=["workflows"])

_workflow_engine = WorkflowOrchestratorEngine()


def get_workflow_engine() -> WorkflowOrchestratorEngine:
    return _workflow_engine


class CreateWorkflowPayload(BaseModel):
    template_id: str = Field(..., description="Target template ID")
    name: str = Field(..., description="Workflow instance name")


class WorkflowActionPayload(BaseModel):
    workflow_id: str = Field(..., description="Target workflow ID")


def _format_task(t: Any) -> dict[str, Any]:
    return {
        "task_id": t.task_id,
        "workflow_id": t.workflow_id,
        "name": t.name,
        "assigned_agent": t.assigned_agent,
        "dependencies": t.dependencies,
        "priority": t.priority,
        "status": t.status.value,
        "estimated_time_mins": t.estimated_time_mins,
        "requires_approval": t.requires_approval,
        "expected_output": t.expected_output,
        "actual_output": t.actual_output,
    }


def _format_workflow(w: Any) -> dict[str, Any]:
    return {
        "workflow_id": w.workflow_id,
        "name": w.name,
        "workflow_type": w.workflow_type.value,
        "status": w.status.value,
        "current_step": w.current_step,
        "tasks": [_format_task(t) for t in w.tasks],
        "creator_id": w.creator_id,
        "created_at": w.created_at.isoformat(),
    }


@router.get("")
async def list_workflows(
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> list[dict[str, Any]]:
    workflows = engine.get_workflows(context.creator_id)
    return [_format_workflow(w) for w in workflows]


@router.get("/templates")
async def list_templates(
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> list[dict[str, Any]]:
    tmpls = engine.get_templates()
    return [
        {
            "template_id": t.template_id,
            "name": t.name,
            "description": t.description,
            "workflow_type": t.workflow_type.value,
            "default_tasks": t.default_tasks,
        }
        for t in tmpls
    ]


@router.get("/{workflow_id}")
async def get_workflow_by_id(
    workflow_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        wf = engine.get_workflow_by_id(workflow_id, context.creator_id)
        return _format_workflow(wf)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("")
async def create_workflow_instance(
    payload: CreateWorkflowPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    wf = engine.create_workflow(payload.template_id, payload.name, context.creator_id)
    return _format_workflow(wf)


@router.post("/run")
async def run_workflow(
    payload: WorkflowActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        wf = engine.run_workflow(payload.workflow_id, context.creator_id)
        return _format_workflow(wf)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/pause")
async def pause_workflow(
    payload: WorkflowActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        wf = engine.pause_workflow(payload.workflow_id, context.creator_id)
        return _format_workflow(wf)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/resume")
async def resume_workflow(
    payload: WorkflowActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: WorkflowOrchestratorEngine = Depends(get_workflow_engine),
) -> dict[str, Any]:
    try:
        wf = engine.resume_workflow(payload.workflow_id, context.creator_id)
        return _format_workflow(wf)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

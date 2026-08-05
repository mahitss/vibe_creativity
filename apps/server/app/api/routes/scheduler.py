"""FastAPI route handlers for OMNIA Runtime Scheduler."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.scheduler_engine.domain import JobPriority, JobState, JobType, SchedulerJob
from app.modules.scheduler_engine.service import RuntimeSchedulerEngine

router = APIRouter(tags=["scheduler"])

_scheduler_engine = RuntimeSchedulerEngine()


def get_scheduler_engine() -> RuntimeSchedulerEngine:
    return _scheduler_engine


class ScheduleJobPayload(BaseModel):
    job_type: JobType = Field(default=JobType.DAILY_EXECUTIVE_REVIEW, description="Job type")
    priority: JobPriority = Field(default=JobPriority.NORMAL, description="Job priority")
    owner_agent: str = Field(default="Executive Agent", description="Owner agent ID")
    metadata: dict[str, Any] = Field(default_factory=dict, description="Job metadata")


class JobActionPayload(BaseModel):
    job_id: str = Field(..., description="Target job ID")


def _format_job(j: SchedulerJob) -> dict[str, Any]:
    return {
        "job_id": j.job_id,
        "workspace_id": j.workspace_id,
        "mind_id": j.mind_id,
        "job_type": j.job_type.value,
        "priority": j.priority.value,
        "scheduled_time": j.scheduled_time.isoformat(),
        "created_time": j.created_time.isoformat(),
        "started_time": j.started_time.isoformat() if j.started_time else None,
        "completed_time": j.completed_time.isoformat() if j.completed_time else None,
        "retry_count": j.retry_count,
        "dependencies": j.dependencies,
        "state": j.state.value,
        "owner_agent": j.owner_agent,
        "metadata": j.metadata,
    }


@router.post("/runtime/jobs")
async def schedule_job(
    payload: ScheduleJobPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> dict[str, Any]:
    job = engine.schedule_job(
        job_type=payload.job_type,
        workspace_id=context.creator_id,
        priority=payload.priority,
        owner_agent=payload.owner_agent,
        metadata=payload.metadata,
    )
    return _format_job(job)


@router.get("/runtime/jobs")
async def list_jobs(
    state: JobState | None = None,
    limit: int = 50,
    context: CreatorContext = Depends(require_creator_context),
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> list[dict[str, Any]]:
    jobs = engine.list_jobs(workspace_id=context.creator_id, state=state, limit=limit)
    return [_format_job(j) for j in jobs]


@router.post("/runtime/jobs/cancel")
async def cancel_job(
    payload: JobActionPayload,
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> dict[str, Any]:
    try:
        job = engine.cancel_job(payload.job_id)
        return _format_job(job)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/runtime/jobs/retry")
async def retry_job(
    payload: JobActionPayload,
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> dict[str, Any]:
    try:
        job = engine.retry_job(payload.job_id)
        return _format_job(job)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/runtime/jobs/metrics")
async def get_scheduler_metrics(
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> dict[str, Any]:
    return engine.get_metrics()


@router.get("/runtime/jobs/{job_id}")
async def get_job_details(
    job_id: str,
    engine: RuntimeSchedulerEngine = Depends(get_scheduler_engine),
) -> dict[str, Any]:
    try:
        job = engine.get_job(job_id)
        return _format_job(job)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

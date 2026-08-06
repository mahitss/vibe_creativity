"""FastAPI routes for OMNIA Autonomous Follow-up Engine Platform."""

from datetime import UTC, datetime, timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.followup.domain import (
    FollowUpEvidence,
    FollowUpModel,
    FollowUpPriority,
    FollowUpStatus,
    FollowUpType,
)
from app.modules.followup.service import AutonomousFollowUpEngine

router = APIRouter(prefix="/followups", tags=["followup"])

_followup_engine = AutonomousFollowUpEngine()


def get_followup_engine() -> AutonomousFollowUpEngine:
    return _followup_engine


class CreateFollowUpPayload(BaseModel):
    source_event: str = Field(..., description="Source event string")
    title: str = Field(..., description="Follow-up title")
    reason: str = Field(..., description="Reason for follow-up")
    priority: FollowUpPriority = Field(default=FollowUpPriority.HIGH)
    confidence: float = Field(default=0.90, ge=0.0, le=1.0)
    suggested_action: str = Field(..., description="Suggested action")
    followup_type: FollowUpType = Field(default=FollowUpType.CONTENT_FOLLOW_UP)
    memories: list[str] = Field(default_factory=list)
    comments: list[str] = Field(default_factory=list)
    analytics: str = Field(default="")


class PatchFollowUpPayload(BaseModel):
    status: FollowUpStatus | None = Field(default=None)
    priority: FollowUpPriority | None = Field(default=None)


def _format_followup(f: FollowUpModel) -> dict[str, Any]:
    return {
        "id": f.id,
        "workspace_id": f.workspace_id,
        "mind_id": f.mind_id,
        "source_event": f.source_event,
        "title": f.title,
        "description": f.reason,
        "reason": f.reason,
        "trigger": f.trigger,
        "evidence": {
            "memories": f.evidence.memories,
            "analytics": f.evidence.analytics,
            "comments": f.evidence.comments,
            "goals": f.evidence.goals,
            "previous_decisions": f.evidence.previous_decisions,
            "reflection_results": f.evidence.reflection_results,
        },
        "priority": f.priority.value,
        "confidence": f.confidence,
        "suggested_action": f.suggested_action,
        "suggested_actions": [f.suggested_action],
        "created_at": f.created_at.isoformat(),
        "timestamp": f.created_at.isoformat(),
        "due_date": f.due_date.isoformat() if f.due_date else None,
        "deadline": f.due_date.isoformat() if f.due_date else None,
        "status": f.status.value,
        "state": f.state.value,
        "risk_level": f.risk_level.value,
        "followup_type": f.followup_type.value,
        "merged_count": f.merged_count,
        "score": f.score,
        "supporting_memories": f.evidence.memories,
        "related_goals": f.evidence.goals,
        "related_projects": f.evidence.previous_decisions,
        "approval_status": f.approval_status,
        "outcome": f.outcome,
    }


@router.get("")
async def list_followups(
    status: str | None = Query(default=None, description="Status filter"),
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> list[dict[str, Any]]:
    items = engine.get_followups(context.creator_id, status=status)
    return [_format_followup(i) for i in items]


@router.post("")
async def create_followup(
    payload: CreateFollowUpPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    now = datetime.now(tz=UTC)
    item = FollowUpModel(
        id=f"flw-{now.strftime('%H%M%S')}",
        workspace_id=context.creator_id,
        mind_id="mind-exec-01",
        source_event=payload.source_event,
        title=payload.title,
        reason=payload.reason,
        evidence=FollowUpEvidence(
            memories=payload.memories,
            analytics=payload.analytics,
            comments=payload.comments,
        ),
        priority=payload.priority,
        confidence=payload.confidence,
        suggested_action=payload.suggested_action,
        created_at=now,
        due_date=now + timedelta(days=2),
        status=FollowUpStatus.PENDING,
        followup_type=payload.followup_type,
    )
    result = engine.create_followup(item)
    return _format_followup(result)


@router.patch("/{followup_id}")
async def patch_followup(
    followup_id: str,
    payload: PatchFollowUpPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    try:
        updated = engine.patch_followup(
            followup_id,
            status=payload.status.value if payload.status else None,
            priority=payload.priority.value if payload.priority else None,
        )
        return _format_followup(updated)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/today")
async def get_today_summary(
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    return engine.get_today_summary(context.creator_id)


@router.get("/history")
async def get_followup_history(
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> list[dict[str, Any]]:
    history = engine.get_history(context.creator_id)
    return [
        {
            "id": str(h.id),
            "creator_id": h.creator_id,
            "followup_id": h.followup_id,
            "action": h.action,
            "performed_by": h.performed_by,
            "timestamp": h.timestamp.isoformat(),
        }
        for h in history
    ]


class FollowUpActionPayload(BaseModel):
    followup_id: str = Field(..., description="Target follow-up ID")
    reason: str = Field(default="")
    convert_to_mission: bool = Field(default=False)


@router.get("/{followup_id}")
async def get_followup_detail(
    followup_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    item = engine.get_followup_by_id(followup_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Follow-up {followup_id} not found")
    return _format_followup(item)


@router.post("/approve")
async def approve_followup(
    payload: FollowUpActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    try:
        if payload.convert_to_mission:
            item = engine.convert_to_mission(context.creator_id, payload.followup_id)
        else:
            item = engine.approve_followup(context.creator_id, payload.followup_id)
        return _format_followup(item)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/dismiss")
async def dismiss_followup(
    payload: FollowUpActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    try:
        item = engine.dismiss_followup(context.creator_id, payload.followup_id, reason=payload.reason)
        return _format_followup(item)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/run")
async def run_evaluation_cycle(
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    outcome = engine.evaluate_all(context.creator_id)
    return {
        "evaluated_count": outcome.evaluated_count,
        "created_count": outcome.created_count,
        "auto_executed_count": outcome.auto_executed_count,
        "queued_for_approval_count": outcome.queued_for_approval_count,
        "timestamp": outcome.timestamp.isoformat(),
    }


@router.post("/jobs/run")
async def run_background_jobs(
    context: CreatorContext = Depends(require_creator_context),
    engine: AutonomousFollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    return engine.run_background_jobs()

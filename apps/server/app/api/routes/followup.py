"""FastAPI routes for OMNIA Autonomous Follow-up Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.followup.service import FollowUpEngine

router = APIRouter(prefix="/followups", tags=["followup"])

_followup_engine = FollowUpEngine()


def get_followup_engine() -> FollowUpEngine:
    return _followup_engine


class FollowUpActionPayload(BaseModel):
    followup_id: str = Field(..., description="Target follow-up ID")
    reason: str = Field(default="", description="Reason for dismissal or approval note")
    convert_to_mission: bool = Field(default=False, description="Whether to convert into Mission Control task")


def _format_item(item: Any) -> dict[str, Any]:
    return {
        "id": item.id,
        "title": item.title,
        "description": item.description,
        "reason": item.reason,
        "trigger": item.trigger,
        "followup_type": item.followup_type.value,
        "priority": item.priority.value,
        "state": item.state.value,
        "risk_level": item.risk_level.value,
        "confidence": item.confidence,
        "creator_id": item.creator_id,
        "timestamp": item.timestamp.isoformat(),
        "deadline": item.deadline.isoformat() if item.deadline else None,
        "supporting_memories": item.supporting_memories,
        "related_goals": item.related_goals,
        "related_projects": item.related_projects,
        "suggested_actions": item.suggested_actions,
        "approval_status": item.approval_status,
        "outcome": item.outcome,
        "score": item.score,
    }


@router.get("")
async def list_followups(
    category: str | None = Query(default=None, description="Category type filter"),
    state: str | None = Query(default=None, description="State filter"),
    priority: str | None = Query(default=None, description="Priority filter"),
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
) -> list[dict[str, Any]]:
    items = engine.get_all_followups(
        context.creator_id,
        category=category,
        state=state,
        priority=priority,
    )
    return [_format_item(i) for i in items]


@router.get("/history")
async def get_followup_history(
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
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


@router.get("/{followup_id}")
async def get_followup_detail(
    followup_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    item = engine.get_followup_by_id(followup_id)
    if not item:
        raise HTTPException(status_code=44, detail=f"Follow-up {followup_id} not found")
    return _format_item(item)


@router.post("/approve")
async def approve_followup(
    payload: FollowUpActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    try:
        if payload.convert_to_mission:
            item = engine.convert_to_mission(context.creator_id, payload.followup_id)
        else:
            item = engine.approve_followup(context.creator_id, payload.followup_id)
        return _format_item(item)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/dismiss")
async def dismiss_followup(
    payload: FollowUpActionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    try:
        item = engine.dismiss_followup(context.creator_id, payload.followup_id, reason=payload.reason)
        return _format_item(item)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/run")
async def run_evaluation_cycle(
    context: CreatorContext = Depends(require_creator_context),
    engine: FollowUpEngine = Depends(get_followup_engine),
) -> dict[str, Any]:
    outcome = engine.evaluate_all(context.creator_id)
    return {
        "evaluated_count": outcome.evaluated_count,
        "created_count": outcome.created_count,
        "auto_executed_count": outcome.auto_executed_count,
        "queued_for_approval_count": outcome.queued_for_approval_count,
        "timestamp": outcome.timestamp.isoformat(),
    }

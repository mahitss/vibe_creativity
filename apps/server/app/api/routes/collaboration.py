"""FastAPI route handlers for OMNIA Team Collaboration Platform."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.collaboration.domain import (
    ActivityItem,
    ApprovalRequest,
    SharedMission,
    TeamMember,
    TeamRole,
)
from app.modules.collaboration.service import CollaborationEngine

router = APIRouter(tags=["collaboration"])

_collab_engine = CollaborationEngine()


def get_collab_engine() -> CollaborationEngine:
    return _collab_engine


class AddMemberPayload(BaseModel):
    user_id: str = Field(..., description="Target user ID")
    display_name: str = Field(..., description="Display name")
    email: str = Field(..., description="Email address")
    role: TeamRole = Field(default=TeamRole.EDITOR, description="Assigned team RBAC role")


class AssignMissionPayload(BaseModel):
    title: str = Field(..., description="Shared mission title")
    description: str = Field(..., description="Mission details")
    assignee_id: str = Field(..., description="Assigned team member ID")


class ApprovalActionPayload(BaseModel):
    action: str = Field(..., description="Target action to approve (e.g. PUBLISH, SPONSOR_CONTRACT)")
    payload: dict[str, Any] = Field(default_factory=dict, description="Action payload data")


class DecideApprovalPayload(BaseModel):
    approval_id: str = Field(..., description="Target approval request ID")
    approve: bool = Field(..., description="True to approve, False to reject")
    comment: str = Field(default="", description="Reviewer comments")


def _format_member(m: TeamMember) -> dict[str, Any]:
    return {
        "member_id": m.member_id,
        "workspace_id": m.workspace_id,
        "user_id": m.user_id,
        "display_name": m.display_name,
        "email": m.email,
        "role": m.role.value,
        "permissions": m.permissions,
        "status": m.status,
        "joined_at": m.joined_at.isoformat(),
    }


def _format_mission(s: SharedMission) -> dict[str, Any]:
    return {
        "mission_id": s.mission_id,
        "workspace_id": s.workspace_id,
        "title": s.title,
        "description": s.description,
        "assignee_id": s.assignee_id,
        "priority": s.priority,
        "status": s.status,
        "evidence_links": s.evidence_links,
        "executive_reasoning": s.executive_reasoning,
        "created_at": s.created_at.isoformat(),
    }


def _format_approval(a: ApprovalRequest) -> dict[str, Any]:
    return {
        "approval_id": a.approval_id,
        "workspace_id": a.workspace_id,
        "requester_id": a.requester_id,
        "target_action": a.target_action,
        "payload": a.payload,
        "status": a.status.value,
        "reviewer_id": a.reviewer_id,
        "comment": a.comment,
        "created_at": a.created_at.isoformat(),
    }


def _format_activity(act: ActivityItem) -> dict[str, Any]:
    return {
        "activity_id": act.activity_id,
        "workspace_id": act.workspace_id,
        "actor_id": act.actor_id,
        "action": act.action,
        "target": act.target,
        "timestamp": act.timestamp.isoformat(),
    }


@router.get("/teams")
@router.get("/members")
async def list_members(
    context: CreatorContext = Depends(require_creator_context),
    engine: CollaborationEngine = Depends(get_collab_engine),
) -> list[dict[str, Any]]:
    members = engine.get_members(workspace_id=context.creator_id)
    return [_format_member(m) for m in members]


@router.post("/teams")
async def add_team_member(
    payload: AddMemberPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: CollaborationEngine = Depends(get_collab_engine),
) -> dict[str, Any]:
    member = engine.add_member(
        workspace_id=context.creator_id,
        user_id=payload.user_id,
        display_name=payload.display_name,
        email=payload.email,
        role=payload.role,
    )
    return _format_member(member)


@router.post("/missions/assign")
async def assign_mission(
    payload: AssignMissionPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: CollaborationEngine = Depends(get_collab_engine),
) -> dict[str, Any]:
    mission = engine.assign_mission(
        workspace_id=context.creator_id,
        title=payload.title,
        description=payload.description,
        assignee_id=payload.assignee_id,
    )
    return _format_mission(mission)


@router.post("/approvals")
async def submit_or_decide_approval(
    payload: ApprovalActionPayload | DecideApprovalPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: CollaborationEngine = Depends(get_collab_engine),
) -> dict[str, Any]:
    if isinstance(payload, DecideApprovalPayload):
        try:
            res = engine.decide_approval(
                approval_id=payload.approval_id,
                reviewer_id=context.creator_id,
                approve=payload.approve,
                comment=payload.comment,
            )
            return _format_approval(res)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
    else:
        res = engine.create_approval(
            workspace_id=context.creator_id,
            requester_id=context.creator_id,
            action=payload.action,
            payload=payload.payload,
        )
        return _format_approval(res)


@router.get("/activity")
async def get_activity_feed(
    context: CreatorContext = Depends(require_creator_context),
    engine: CollaborationEngine = Depends(get_collab_engine),
) -> list[dict[str, Any]]:
    activities = engine.get_activity(workspace_id=context.creator_id)
    return [_format_activity(a) for a in activities]

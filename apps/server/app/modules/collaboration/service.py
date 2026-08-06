"""Service layer for OMNIA Team Collaboration Platform."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.collaboration.domain import (
    ActivityItem,
    ApprovalRequest,
    ApprovalStatus,
    SharedMission,
    TeamMember,
    TeamRole,
)


class MemberService:
    """Manages workspace team member role assignments and permissions."""

    def create_member(
        self, workspace_id: str, user_id: str, display_name: str, email: str, role: TeamRole
    ) -> TeamMember:
        return TeamMember(
            member_id=f"mem-{uuid4().hex[:6]}",
            workspace_id=workspace_id,
            user_id=user_id,
            display_name=display_name,
            email=email,
            role=role,
            permissions=["VIEW_WORKSPACE", "EXECUTE_ASSIGNED_TASKS"],
            status="ACTIVE",
            joined_at=datetime.now(tz=UTC),
        )


class SharedMissionService:
    """Manages shared mission delegation with Executive Mind reasoning."""

    def assign_mission(
        self,
        workspace_id: str,
        title: str,
        description: str,
        assignee_id: str,
        priority: str = "HIGH",
    ) -> SharedMission:
        return SharedMission(
            mission_id=f"miss-{uuid4().hex[:6]}",
            workspace_id=workspace_id,
            title=title,
            description=description,
            assignee_id=assignee_id,
            priority=priority,
            status="IN_PROGRESS",
            evidence_links=["mem-101", "mem-204"],
            executive_reasoning="Assigned to Video Editor based on upcoming sponsor deadline & channel release window.",
            created_at=datetime.now(tz=UTC),
        )


class ApprovalFlowEngine:
    """Manages approval gates for high-risk actions (publishing, budget, contracts)."""

    def request_approval(self, workspace_id: str, requester_id: str, action: str, payload: dict[str, Any]) -> ApprovalRequest:
        return ApprovalRequest(
            approval_id=f"appr-{uuid4().hex[:6]}",
            workspace_id=workspace_id,
            requester_id=requester_id,
            target_action=action,
            payload=payload,
            status=ApprovalStatus.PENDING,
            created_at=datetime.now(tz=UTC),
        )

    def decide_approval(self, request: ApprovalRequest, reviewer_id: str, approve: bool, comment: str = "") -> ApprovalRequest:
        request.status = ApprovalStatus.APPROVED if approve else ApprovalStatus.REJECTED
        request.reviewer_id = reviewer_id
        request.comment = comment
        return request


class CollaborationEngine:
    """Master Collaboration Engine managing team workspace, shared missions, approvals, and activity feed."""

    def __init__(self) -> None:
        self.member_service = MemberService()
        self.mission_service = SharedMissionService()
        self.approval_engine = ApprovalFlowEngine()
        self._members: dict[str, TeamMember] = {}
        self._missions: dict[str, SharedMission] = {}
        self._approvals: dict[str, ApprovalRequest] = {}
        self._activity: list[ActivityItem] = []
        self._seed_default_data()

    def _seed_default_data(self) -> None:
        now = datetime.now(tz=UTC)
        m1 = self.member_service.create_member("ws-101", "usr-alex", "Alex Creator", "alex@omnia.creator", TeamRole.OWNER)
        m2 = self.member_service.create_member("ws-101", "usr-sam", "Sam Video Editor", "sam@omnia.creator", TeamRole.EDITOR)
        self._members[m1.member_id] = m1
        self._members[m2.member_id] = m2

        miss1 = self.mission_service.assign_mission(
            workspace_id="ws-101",
            title="Edit Docker Tutorial Mid-Roll Integration",
            description="Cut 60s mid-roll sponsor segment for CloudCorp.",
            assignee_id=m2.member_id,
        )
        self._missions[miss1.mission_id] = miss1

        act1 = ActivityItem(
            activity_id=f"act-{uuid4().hex[:6]}",
            workspace_id="ws-101",
            actor_id=m1.member_id,
            action="ASSIGNED_MISSION",
            target=miss1.title,
            timestamp=now,
        )
        self._activity.append(act1)

    def get_members(self, workspace_id: str = "ws-101") -> list[TeamMember]:
        return [m for m in self._members.values() if m.workspace_id == workspace_id]

    def add_member(self, workspace_id: str, user_id: str, display_name: str, email: str, role: TeamRole) -> TeamMember:
        m = self.member_service.create_member(workspace_id, user_id, display_name, email, role)
        self._members[m.member_id] = m
        return m

    def assign_mission(self, workspace_id: str, title: str, description: str, assignee_id: str) -> SharedMission:
        miss = self.mission_service.assign_mission(workspace_id, title, description, assignee_id)
        self._missions[miss.mission_id] = miss
        return miss

    def create_approval(self, workspace_id: str, requester_id: str, action: str, payload: dict[str, Any]) -> ApprovalRequest:
        appr = self.approval_engine.request_approval(workspace_id, requester_id, action, payload)
        self._approvals[appr.approval_id] = appr
        return appr

    def decide_approval(self, approval_id: str, reviewer_id: str, approve: bool, comment: str = "") -> ApprovalRequest:
        appr = self._approvals.get(approval_id)
        if not appr:
            raise KeyError(f"Approval request {approval_id} not found")
        return self.approval_engine.decide_approval(appr, reviewer_id, approve, comment)

    def get_activity(self, workspace_id: str = "ws-101") -> list[ActivityItem]:
        return [a for a in self._activity if a.workspace_id == workspace_id]

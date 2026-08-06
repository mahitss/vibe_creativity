"""Automated Pytest suite for OMNIA Team Collaboration Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.collaboration.domain import ApprovalStatus, TeamRole
from app.modules.collaboration.service import (
    ApprovalFlowEngine,
    CollaborationEngine,
    MemberService,
    SharedMissionService,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_rbac() -> None:
    mem_service = MemberService()
    m = mem_service.create_member("ws-101", "usr-1", "Alex", "alex@test.com", TeamRole.OWNER)
    assert m.role == TeamRole.OWNER

    mission_service = SharedMissionService()
    miss = mission_service.assign_mission("ws-101", "Edit Video", "Cut mid-roll", m.member_id)
    assert miss.assignee_id == m.member_id

    appr_engine = ApprovalFlowEngine()
    req = appr_engine.request_approval("ws-101", m.member_id, "PUBLISH", {"video_id": "v-1"})
    assert req.status == ApprovalStatus.PENDING
    dec = appr_engine.decide_approval(req, m.member_id, True, "Looks good")
    assert dec.status == ApprovalStatus.APPROVED


def test_collaboration_engine_flow() -> None:
    engine = CollaborationEngine()

    members = engine.get_members("ws-101")
    assert len(members) >= 2

    m_new = engine.add_member("ws-101", "usr-design", "Designer", "des@test.com", TeamRole.DESIGNER)
    assert m_new.role == TeamRole.DESIGNER

    miss = engine.assign_mission("ws-101", "Design Thumbnail", "YouTube thumbnail", m_new.member_id)
    assert miss.assignee_id == m_new.member_id

    appr = engine.create_approval("ws-101", m_new.member_id, "SPONSOR_CONTRACT", {"amount": 5000})
    dec = engine.decide_approval(appr.approval_id, members[0].member_id, True, "Approved contract")
    assert dec.status == ApprovalStatus.APPROVED


def test_collaboration_api_endpoints() -> None:
    # 1. GET /api/teams & /api/members
    mem_resp = client.get("/api/members", headers=TEST_CREATOR_HEADER)
    assert mem_resp.status_code == 200
    assert len(mem_resp.json()) >= 2
    assignee_id = mem_resp.json()[0]["member_id"]

    # 2. POST /api/teams
    add_resp = client.post(
        "/api/teams",
        headers=TEST_CREATOR_HEADER,
        json={
            "user_id": "usr-marketer",
            "display_name": "Marketing Specialist",
            "email": "mkt@test.com",
            "role": "MARKETING",
        },
    )
    assert add_resp.status_code == 200
    assert add_resp.json()["role"] == "MARKETING"

    # 3. POST /api/missions/assign
    assign_resp = client.post(
        "/api/missions/assign",
        headers=TEST_CREATOR_HEADER,
        json={
            "title": "Launch Sponsor Post",
            "description": "Post sponsor update on Discord",
            "assignee_id": assignee_id,
        },
    )
    assert assign_resp.status_code == 200
    assert assign_resp.json()["assignee_id"] == assignee_id

    # 4. POST /api/approvals (Submit)
    appr_sub_resp = client.post(
        "/api/approvals",
        headers=TEST_CREATOR_HEADER,
        json={"action": "PUBLISH_SHORT", "payload": {"short_id": "sh-101"}},
    )
    assert appr_sub_resp.status_code == 200
    appr_id = appr_sub_resp.json()["approval_id"]

    # 5. POST /api/approvals (Decide)
    appr_dec_resp = client.post(
        "/api/approvals",
        headers=TEST_CREATOR_HEADER,
        json={"approval_id": appr_id, "approve": True, "comment": "Approved for release"},
    )
    assert appr_dec_resp.status_code == 200
    assert appr_dec_resp.json()["status"] == "APPROVED"

    # 6. GET /api/activity
    act_resp = client.get("/api/activity", headers=TEST_CREATOR_HEADER)
    assert act_resp.status_code == 200
    assert len(act_resp.json()) >= 1

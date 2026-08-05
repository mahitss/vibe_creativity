"""Automated Pytest suite for OMNIA Runtime Security & Governance Layer."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.security_governance.domain import RiskLevel, SecurityContextSpec, SecurityRole
from app.modules.security_governance.service import PolicyEngine, RiskEvaluator, SecurityGovernanceEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_risk_evaluator_and_policy_engine() -> None:
    evaluator = RiskEvaluator()
    assert evaluator.evaluate("delete_workspace", "ws-101") == RiskLevel.CRITICAL
    assert evaluator.evaluate("publish_video", "video-101") == RiskLevel.HIGH
    assert evaluator.evaluate("get_analytics", "analytics-101") == RiskLevel.LOW

    policy = PolicyEngine()
    assert policy.is_authorized(SecurityRole.OWNER, SecurityRole.ADMIN) is True
    assert policy.is_authorized(SecurityRole.VIEWER, SecurityRole.ADMIN) is False


def test_security_governance_engine_evaluation() -> None:
    engine = SecurityGovernanceEngine()

    sec_ctx = SecurityContextSpec(
        workspace_id="ws-101",
        mind_id="mind-101",
        user_id="user-101",
        role=SecurityRole.AGENT,
        session_id="sess-101",
        requested_action="publish_video_post",
        requested_resource="video-101",
    )

    result = engine.evaluate_action(sec_ctx, requester_agent="Content Agent")
    assert result["allowed"] is True
    assert result["requires_approval"] is True
    assert result["approval_id"] is not None

    # Decide approval
    appr_id = result["approval_id"]
    decision = engine.decide_approval(appr_id, approved=True)
    assert decision.status == "APPROVED"


def test_security_governance_api_endpoints() -> None:
    # 1. POST /api/runtime/security/evaluate
    eval_resp = client.post(
        "/api/runtime/security/evaluate",
        headers=TEST_CREATOR_HEADER,
        json={
            "requested_action": "send_sponsor_proposal_email",
            "requested_resource": "sponsor-deal-101",
            "role": "AGENT",
            "requester_agent": "Sponsor Agent",
        },
    )
    assert eval_resp.status_code == 200
    res_data = eval_resp.json()
    assert res_data["requires_approval"] is True
    appr_id = res_data["approval_id"]

    # 2. POST /api/runtime/security/approve
    appr_resp = client.post(
        "/api/runtime/security/approve",
        json={"approval_id": appr_id, "approved": True},
    )
    assert appr_resp.status_code == 200
    assert appr_resp.json()["status"] == "APPROVED"

    # 3. GET /api/runtime/security/policies
    pol_resp = client.get("/api/runtime/security/policies")
    assert pol_resp.status_code == 200
    assert len(pol_resp.json()) >= 3

    # 4. GET /api/runtime/security/audit
    audit_resp = client.get("/api/runtime/security/audit", headers=TEST_CREATOR_HEADER)
    assert audit_resp.status_code == 200
    assert len(audit_resp.json()) >= 2

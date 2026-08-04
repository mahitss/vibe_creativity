"""Automated Pytest suite for OMNIA Autonomous Follow-up Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.followup.domain import FollowUpPriority, FollowUpState, FollowUpType, RiskLevel
from app.modules.followup.service import FollowUpEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-77"}


def test_followup_engine_seeding_and_filtering() -> None:
    engine = FollowUpEngine()
    items = engine.get_all_followups("creator-test-77")

    assert len(items) >= 4
    top_item = items[0]
    assert top_item.score > 0.80
    assert top_item.confidence > 0.85

    # Filter by category
    sponsor_items = engine.get_all_followups("creator-test-77", category="SPONSOR_REMINDER")
    assert len(sponsor_items) >= 1
    assert sponsor_items[0].followup_type == FollowUpType.SPONSOR_REMINDER


def test_evaluation_cycle_and_risk_scoping() -> None:
    engine = FollowUpEngine()
    outcome = engine.evaluate_all("creator-test-77")

    assert outcome.evaluated_count >= 4
    assert outcome.auto_executed_count >= 1
    history = engine.get_history("creator-test-77")
    assert len(history) >= 1
    assert history[0].action == "EVALUATION_CYCLE_COMPLETED"


def test_creator_approval_workflow() -> None:
    engine = FollowUpEngine()

    # 1. Approve follow-up
    approved = engine.approve_followup("creator-test-77", "flw-102")
    assert approved.state == FollowUpState.APPROVED
    assert "APPROVED" in approved.approval_status

    # 2. Convert follow-up to mission
    converted = engine.convert_to_mission("creator-test-77", "flw-103")
    assert converted.state == FollowUpState.CONVERTED_TO_MISSION

    # 3. Dismiss follow-up
    dismissed = engine.dismiss_followup("creator-test-77", "flw-104", reason="Scheduled for next month")
    assert dismissed.state == FollowUpState.DISMISSED
    assert "Dismissed by creator" in dismissed.outcome


def test_followup_api_endpoints() -> None:
    # 1. GET /api/followups
    response = client.get("/api/followups", headers=TEST_CREATOR_HEADER)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 4

    # 2. GET /api/followups/{id}
    detail_resp = client.get("/api/followups/flw-101", headers=TEST_CREATOR_HEADER)
    assert detail_resp.status_code == 200
    detail = detail_resp.json()
    assert detail["id"] == "flw-101"
    assert "React" in detail["title"]

    # 3. POST /api/followups/approve
    appr_resp = client.post(
        "/api/followups/approve",
        headers=TEST_CREATOR_HEADER,
        json={"followup_id": "flw-102", "convert_to_mission": False},
    )
    assert appr_resp.status_code == 200
    assert appr_resp.json()["state"] == "APPROVED"

    # 4. POST /api/followups/dismiss
    dism_resp = client.post(
        "/api/followups/dismiss",
        headers=TEST_CREATOR_HEADER,
        json={"followup_id": "flw-104", "reason": "Handled off-platform"},
    )
    assert dism_resp.status_code == 200
    assert dism_resp.json()["state"] == "DISMISSED"

    # 5. POST /api/followups/run
    run_resp = client.post("/api/followups/run", headers=TEST_CREATOR_HEADER)
    assert run_resp.status_code == 200
    assert run_resp.json()["evaluated_count"] >= 4

    # 6. GET /api/followups/history
    hist_resp = client.get("/api/followups/history", headers=TEST_CREATOR_HEADER)
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 1

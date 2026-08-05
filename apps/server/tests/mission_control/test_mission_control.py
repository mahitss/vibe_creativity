"""Automated Pytest suite for OMNIA Mission Control Command Center."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.mission_control.service import MissionControlEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-default"}


def test_mission_control_engine_payload() -> None:
    engine = MissionControlEngine()
    payload = engine.get_payload("creator-default", "Mahit")

    assert payload.creator_name == "Mahit"
    assert "Mahit" in payload.greeting
    assert len(payload.executive_summary) >= 4
    assert payload.primary_mission.mission_id == "mission-top-101"
    assert payload.primary_mission.confidence >= 0.90
    assert len(payload.autonomous_work) >= 3
    assert len(payload.strategic_insights) >= 2
    assert len(payload.timeline) >= 3
    assert "Executive Mind" in payload.agent_health


def test_mission_control_api_endpoints() -> None:
    # 1. GET /api/mission-control/summary
    resp = client.get("/api/mission-control/summary", headers=TEST_CREATOR_HEADER)
    assert resp.status_code == 200
    data = resp.json()
    assert data["creator_name"] == "Mahit"
    assert data["primary_mission"]["status"] == "PENDING"

    # 2. POST /api/mission-control/mission/approve
    appr_resp = client.post("/api/mission-control/mission/approve", headers=TEST_CREATOR_HEADER)
    assert appr_resp.status_code == 200
    assert appr_resp.json()["status"] == "APPROVED"

    # Verify updated status
    resp_after = client.get("/api/mission-control/summary", headers=TEST_CREATOR_HEADER)
    assert resp_after.json()["primary_mission"]["status"] == "APPROVED"

    # 3. POST /api/mission-control/mission/postpone
    postp_resp = client.post("/api/mission-control/mission/postpone", headers=TEST_CREATOR_HEADER)
    assert postp_resp.status_code == 200
    assert postp_resp.json()["status"] == "POSTPONED"

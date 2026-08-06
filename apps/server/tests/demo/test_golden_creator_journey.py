"""Automated Pytest suite for OMNIA Golden Creator Journey (Hackathon Demo)."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.demo.journey import GoldenJourneyService

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_golden_journey_service_flow() -> None:
    service = GoldenJourneyService()

    day1 = service.execute_day1_import()
    assert day1["current_day"] == 1
    assert day1["import_data"]["comments_ingested"] == 420
    assert len(day1["memories_created"]) >= 3

    day2 = service.execute_day2_return()
    assert day2["current_day"] == 2
    assert day2["mission_card"]["mission_id"] == "m-101"
    assert day2["mission_card"]["confidence"] == 0.96
    assert len(day2["mission_card"]["supporting_memories"]) == 3
    assert "youtube_short_script" in day2["repurposed_content"]
    assert "linkedin_post" in day2["repurposed_content"]
    assert len(day2["repurposed_content"]["x_thread"]) == 3
    assert "sponsor_email_draft" in day2["repurposed_content"]
    assert day2["explainability"]["why"] is not None


def test_golden_journey_api_endpoints() -> None:
    # 1. POST /api/demo/journey/day1
    d1_resp = client.post("/api/demo/journey/day1", headers=TEST_CREATOR_HEADER)
    assert d1_resp.status_code == 200
    assert d1_resp.json()["current_day"] == 1

    # 2. POST /api/demo/journey/day2
    d2_resp = client.post("/api/demo/journey/day2", headers=TEST_CREATOR_HEADER)
    assert d2_resp.status_code == 200
    assert d2_resp.json()["current_day"] == 2
    assert d2_resp.json()["mission_card"]["confidence"] == 0.96

    # 3. GET /api/demo/journey/state
    st_resp = client.get("/api/demo/journey/state", headers=TEST_CREATOR_HEADER)
    assert st_resp.status_code == 200
    assert st_resp.json()["current_day"] == 2

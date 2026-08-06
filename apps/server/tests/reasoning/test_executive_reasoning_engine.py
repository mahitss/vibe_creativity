"""Automated Pytest suite for OMNIA Executive Reasoning & Explainability Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.reasoning.service import ReasoningEngineService

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_reasoning_service_flow() -> None:
    service = ReasoningEngineService()

    reasonings = service.get_reasonings("ws-101")
    assert len(reasonings) >= 1
    top_r = reasonings[0]
    assert top_r["reasoning_id"] == "rsn-101"
    assert top_r["confidence"] == 0.96
    assert len(top_r["evidence"]) >= 3
    assert len(top_r["alternative_strategies"]) >= 1

    # Composite evidence ranking
    top_ev = top_r["evidence"][0]
    assert "composite_score" in top_ev

    # Mission explanation
    exp = service.get_mission_explanation("m-101")
    assert exp["mission_id"] == "m-101"
    assert exp["confidence_score"] == 0.96
    assert "Why this mission?" in exp["why_this_mission"]


def test_reasoning_api_endpoints() -> None:
    # 1. GET /api/reasoning
    r_resp = client.get("/api/reasoning", headers=TEST_CREATOR_HEADER)
    assert r_resp.status_code == 200
    assert len(r_resp.json()) >= 1

    # 2. GET /api/reasoning/{id}
    detail_resp = client.get("/api/reasoning/rsn-101", headers=TEST_CREATOR_HEADER)
    assert detail_resp.status_code == 200
    assert detail_resp.json()["reasoning_id"] == "rsn-101"

    # 3. GET /api/missions/{id}/explanation
    exp_resp = client.get("/api/missions/m-101/explanation", headers=TEST_CREATOR_HEADER)
    assert exp_resp.status_code == 200
    assert exp_resp.json()["mission_id"] == "m-101"
    assert exp_resp.json()["confidence_score"] == 0.96

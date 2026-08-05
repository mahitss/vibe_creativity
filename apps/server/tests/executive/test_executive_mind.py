"""Automated Pytest suite for OMNIA Executive Mind Orchestration Layer."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.executive_mind.domain import ExecutiveDecision
from app.modules.executive_mind.service import (
    ExecutiveConflictResolver,
    ExecutiveMindEngine,
    ExecutiveMissionGenerator,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_conflict_resolver_and_mission_generator() -> None:
    resolver = ExecutiveConflictResolver()
    proposals = {
        "Content Agent": "Publish immediately",
        "Sponsor Agent": "Delay 24 hours",
    }
    scores = {"Content Agent": 0.95, "Sponsor Agent": 0.70}
    res = resolver.resolve("Publish Timing", proposals, scores)
    assert res.resolved_strategy == "Publish immediately"
    assert "Content Agent" in res.evidence_summary

    gen = ExecutiveMissionGenerator()
    dec = ExecutiveDecision(
        decision_id="dec-101",
        workspace_id="ws-101",
        recommended_action="Publish tutorial video",
        reason="Boost engagement",
        evidence="Memory row mem-101",
        supporting_memory_ids=["mem-101"],
        confidence=0.92,
        priority="HIGH",
        risk_level="LOW",
        why_now="Velocity window active",
        why_this="High retention rate",
        why_not_alternatives="Delaying drops initial reach",
        expected_outcome="+10k views",
        review_date=dec.decision_id if False else None,  # Dummy date placeholder
    )
    # Give valid datetime
    from datetime import UTC, datetime

    dec.review_date = datetime.now(tz=UTC)
    mission = gen.generate_mission(dec)
    assert mission.workspace_id == "ws-101"
    assert "Publish tutorial video" in mission.title


def test_executive_mind_engine_reasoning() -> None:
    engine = ExecutiveMindEngine()
    cycle = engine.run_reasoning_cycle(workspace_id="ws-101", event_name="TEST_TRIGGER")
    assert cycle["status"] == "COMPLETED"
    assert cycle["confidence"] >= 0.90

    decs = engine.get_decisions(workspace_id="ws-101")
    assert len(decs) >= 1
    assert decs[0].why_now is not None

    missions = engine.get_missions(workspace_id="ws-101")
    assert len(missions) >= 1

    reviews = engine.get_reviews(workspace_id="ws-101")
    assert len(reviews) >= 1


def test_executive_mind_api_endpoints() -> None:
    # 1. POST /api/executive/run_mind
    run_resp = client.post(
        "/api/executive/run_mind",
        headers=TEST_CREATOR_HEADER,
        json={"event_name": "COMMUNITY_CRISIS_DETECTED"},
    )
    assert run_resp.status_code == 200
    assert run_resp.json()["status"] == "COMPLETED"

    # 2. GET /api/executive/mind_decisions
    decs_resp = client.get("/api/executive/mind_decisions", headers=TEST_CREATOR_HEADER)
    assert decs_resp.status_code == 200
    assert len(decs_resp.json()) >= 1
    assert "why_now" in decs_resp.json()[0]

    # 3. GET /api/executive/missions
    miss_resp = client.get("/api/executive/missions", headers=TEST_CREATOR_HEADER)
    assert miss_resp.status_code == 200
    assert len(miss_resp.json()) >= 1

    # 4. GET /api/executive/reviews
    rev_resp = client.get("/api/executive/reviews", headers=TEST_CREATOR_HEADER)
    assert rev_resp.status_code == 200
    assert len(rev_resp.json()) >= 1

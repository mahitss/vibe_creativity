"""Automated Pytest suite for OMNIA Self-Improvement & Evaluation Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.evaluation.domain import OutcomeRating
from app.modules.evaluation.service import SelfImprovementEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-evaluation"}


def test_evaluation_overview_and_agent_leaderboard() -> None:
    engine = SelfImprovementEngine()
    overview = engine.get_overview("creator-test-evaluation")

    assert overview.recommendation_accuracy > 0.90
    assert overview.mission_success_rate > 0.90
    assert len(overview.agent_leaderboard) >= 4
    assert overview.agent_leaderboard[0].acceptance_rate > 0.90


def test_confidence_recalibration() -> None:
    engine = SelfImprovementEngine()
    rev = engine.recalibrate_confidence("dec-101", OutcomeRating.EXCEEDED_EXPECTATIONS)

    assert rev.recalibrated_confidence >= rev.initial_confidence
    assert rev.success_score == 0.98

    rev_failed = engine.recalibrate_confidence("dec-102", OutcomeRating.FAILED)
    assert rev_failed.recalibrated_confidence < rev_failed.initial_confidence
    assert rev_failed.success_score == 0.30


def test_run_closed_loop_evaluation_cycle() -> None:
    engine = SelfImprovementEngine()
    updated_overview = engine.run_evaluation_cycle("creator-test-evaluation")

    assert len(updated_overview.recent_reviews) >= 3
    latest = updated_overview.recent_reviews[0]
    assert latest.agent_id == "agent-evaluator"
    assert latest.outcome_rating == OutcomeRating.SUCCESS


def test_evaluation_api_endpoints() -> None:
    # 1. GET /api/evaluation
    overview_resp = client.get("/api/evaluation", headers=TEST_CREATOR_HEADER)
    assert overview_resp.status_code == 200
    overview_data = overview_resp.json()
    assert overview_data["recommendation_accuracy"] > 0.90
    assert len(overview_data["agent_leaderboard"]) >= 4

    # 2. GET /api/evaluation/metrics
    metrics_resp = client.get("/api/evaluation/metrics", headers=TEST_CREATOR_HEADER)
    assert metrics_resp.status_code == 200
    assert metrics_resp.json()["mission_success_rate"] > 0.90

    # 3. GET /api/evaluation/history
    history_resp = client.get("/api/evaluation/history", headers=TEST_CREATOR_HEADER)
    assert history_resp.status_code == 200
    assert len(history_resp.json()) >= 2

    # 4. GET /api/evaluation/agents
    agents_resp = client.get("/api/evaluation/agents", headers=TEST_CREATOR_HEADER)
    assert agents_resp.status_code == 200
    assert len(agents_resp.json()) >= 4

    # 5. POST /api/evaluation/run
    run_resp = client.post("/api/evaluation/run", headers=TEST_CREATOR_HEADER)
    assert run_resp.status_code == 200
    assert run_resp.json()["status"] == "COMPLETED"

    # 6. POST /api/evaluation/recalibrate
    recal_resp = client.post(
        "/api/evaluation/recalibrate",
        headers=TEST_CREATOR_HEADER,
        json={"decision_id": "dec-101", "outcome_rating": "EXCEEDED_EXPECTATIONS"},
    )
    assert recal_resp.status_code == 200
    assert recal_resp.json()["outcome_rating"] == "EXCEEDED_EXPECTATIONS"

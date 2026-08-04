"""Automated Pytest suite for OMNIA Executive Decision & Strategy Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.executive.domain import StrategyStatus
from app.modules.executive.service import ExecutiveDecisionEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-executive"}


def test_executive_strategy_and_decisions() -> None:
    engine = ExecutiveDecisionEngine()
    strategy = engine.get_strategy("creator-test-executive")

    assert strategy.status == StrategyStatus.OPTIMAL
    assert "React" in strategy.top_focus
    assert len(strategy.decisions_log) >= 2
    assert len(strategy.active_conflicts) >= 1


def test_executive_conflict_resolution() -> None:
    engine = ExecutiveDecisionEngine()
    strategy = engine.get_strategy("creator-test-executive")

    conflict = strategy.active_conflicts[0]
    assert "Content Strategy" in conflict.subsystems_involved
    assert "Hold release for 24 hours" in conflict.executive_resolution
    assert len(conflict.supporting_memories) >= 1


def test_run_executive_alignment_loop() -> None:
    engine = ExecutiveDecisionEngine()
    updated_strategy = engine.run_executive_loop("creator-test-executive")

    assert len(updated_strategy.decisions_log) >= 3
    latest = updated_strategy.decisions_log[0]
    assert latest.status == "EXECUTED"
    assert latest.confidence > 0.95


def test_executive_api_endpoints() -> None:
    # 1. GET /api/executive/strategy
    strat_resp = client.get("/api/executive/strategy", headers=TEST_CREATOR_HEADER)
    assert strat_resp.status_code == 200
    strat_data = strat_resp.json()
    assert strat_data["status"] == "OPTIMAL"
    assert len(strat_data["decisions_log"]) >= 2

    # 2. GET /api/executive/decisions
    dec_resp = client.get("/api/executive/decisions", headers=TEST_CREATOR_HEADER)
    assert dec_resp.status_code == 200
    assert len(dec_resp.json()) >= 2

    # 3. GET /api/executive/opportunities
    opp_resp = client.get("/api/executive/opportunities", headers=TEST_CREATOR_HEADER)
    assert opp_resp.status_code == 200
    assert len(opp_resp.json()) >= 2

    # 4. GET /api/executive/risks
    risk_resp = client.get("/api/executive/risks", headers=TEST_CREATOR_HEADER)
    assert risk_resp.status_code == 200
    assert len(risk_resp.json()) >= 1

    # 5. POST /api/executive/run
    run_resp = client.post("/api/executive/run", headers=TEST_CREATOR_HEADER)
    assert run_resp.status_code == 200
    run_data = run_resp.json()
    assert run_data["status"] == "OPTIMAL"
    assert run_data["latest_decision"] is not None

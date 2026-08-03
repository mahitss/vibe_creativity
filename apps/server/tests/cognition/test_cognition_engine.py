"""Automated Test Suite for OMNIA Cognitive Loop Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.cognition.domain import CognitiveStage, RiskLevel
from app.modules.cognition.service import CognitiveLoopService, OptionEvaluationEngine


@pytest.fixture
def option_evaluator() -> OptionEvaluationEngine:
    return OptionEvaluationEngine()


@pytest.fixture
def cognition_service() -> CognitiveLoopService:
    return CognitiveLoopService()


def test_option_evaluator(option_evaluator: OptionEvaluationEngine) -> None:
    strats, selected = option_evaluator.evaluate("Test Trigger")
    assert len(strats) == 3
    assert selected.selected is True
    assert selected.risk_level == RiskLevel.LOW

    rejected = [s for s in strats if not s.selected]
    assert len(rejected) == 2
    assert rejected[0].rejection_reason is not None


def test_cognitive_cycle_execution(cognition_service: CognitiveLoopService) -> None:
    status = cognition_service.get_status("creator-101")
    assert status["is_running"] is True
    assert status["current_stage"] == CognitiveStage.UPDATE_MEMORY.value

    # Execute manual cycle
    cycle = cognition_service.run_cognitive_cycle("creator-101")
    assert cycle["cycle_number"] >= 2
    assert len(cycle["actions_executed"]) >= 1
    assert len(cycle["learnings_extracted"]) >= 1


def test_cognition_api_endpoints() -> None:
    client = TestClient(app)

    # GET /api/cognition/status
    response = client.get("/api/cognition/status", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["is_running"] is True

    # POST /api/cognition/run
    response = client.post("/api/cognition/run", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    res = response.json()
    assert "cycle_number" in res

    # GET /api/cognition/metrics
    response = client.get("/api/cognition/metrics", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    metrics = response.json()
    assert metrics["learning_accuracy_percent"] > 90
    assert "last_24h_reflection" in metrics

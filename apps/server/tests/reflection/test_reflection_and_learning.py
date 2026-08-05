"""Automated Pytest suite for OMNIA Reflection & Learning Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.reflection_engine.domain import LearningType, ReflectionTrigger
from app.modules.reflection_engine.service import ConfidenceEngine, OutcomeAnalyzer, ReflectionEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_outcome_analyzer_and_confidence_engine() -> None:
    analyzer = OutcomeAnalyzer()
    outcome, root_cause, adj = analyzer.analyze("Publish Video", "Publish Video")
    assert outcome == "SUCCESS"
    assert adj == 0.05

    conf = ConfidenceEngine()
    assert conf.adjust_confidence(0.95, 0.10) == 1.0
    assert conf.adjust_confidence(0.05, -0.10) == 0.0


def test_reflection_engine_run() -> None:
    engine = ReflectionEngine()

    rec = engine.run_reflection(
        source_workflow_id="wf-test-101",
        trigger_event=ReflectionTrigger.WORKFLOW_COMPLETED,
        observation="Sponsor post published cleanly",
        expected_result="Publish Sponsor Post",
        actual_result="Publish Sponsor Post",
        workspace_id="ws-101",
    )
    assert rec.outcome == "SUCCESS"
    assert len(engine.list_learnings(workspace_id="ws-101")) >= 2


def test_reflection_api_endpoints() -> None:
    # 1. POST /api/runtime/reflections/run
    run_resp = client.post(
        "/api/runtime/reflections/run",
        headers=TEST_CREATOR_HEADER,
        json={
            "source_workflow_id": "wf-community-101",
            "trigger_event": "WORKFLOW_COMPLETED",
            "observation": "Discord engagement spiked by 40%",
            "expected_result": "Increase Discord engagement",
            "actual_result": "Increase Discord engagement",
        },
    )
    assert run_resp.status_code == 200
    refl_data = run_resp.json()
    refl_id = refl_data["reflection_id"]

    # 2. GET /api/runtime/reflections
    ref_list = client.get("/api/runtime/reflections", headers=TEST_CREATOR_HEADER)
    assert ref_list.status_code == 200
    assert len(ref_list.json()) >= 2

    # 3. GET /api/runtime/reflections/{refl_id}
    details_resp = client.get(f"/api/runtime/reflections/{refl_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["reflection_id"] == refl_id

    # 4. GET /api/runtime/learnings
    learn_resp = client.get("/api/runtime/learnings", headers=TEST_CREATOR_HEADER)
    assert learn_resp.status_code == 200
    assert len(learn_resp.json()) >= 2

    # 5. GET /api/runtime/confidence
    conf_resp = client.get("/api/runtime/confidence")
    assert conf_resp.status_code == 200
    assert conf_resp.json()["average_confidence_score"] > 0.0

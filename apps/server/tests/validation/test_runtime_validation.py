"""Automated Pytest suite for OMNIA Runtime Integration & Validation Framework."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.validation_engine.domain import CertificationGrade, CreatorScenario
from app.modules.validation_engine.service import BenchmarkRunner, ChaosEngine, ValidationEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_chaos_and_benchmarks() -> None:
    chaos = ChaosEngine()
    inj = chaos.inject_chaos("LLM_TIMEOUT")
    assert inj["recovered"] is True

    bench = BenchmarkRunner()
    metrics = bench.run_benchmarks()
    assert metrics["workflow_throughput_per_sec"] > 0.0


def test_validation_engine_suite_and_certification() -> None:
    engine = ValidationEngine()

    report = engine.run_validation_suite(workspace_id="ws-101")
    assert report.grade == CertificationGrade.A_PLUS
    assert report.overall_score >= 95.0
    assert len(report.category_scores) == 7

    sim = engine.run_simulation(scenario=CreatorScenario.VIRAL_CREATOR, workspace_id="ws-101")
    assert sim["status"] == "PASSED"
    assert sim["steps_executed"] == 8


def test_validation_api_endpoints() -> None:
    # 1. POST /api/runtime/validate
    val_resp = client.post("/api/runtime/validate", headers=TEST_CREATOR_HEADER)
    assert val_resp.status_code == 200
    res_data = val_resp.json()
    assert res_data["grade"] == "A+"

    # 2. POST /api/runtime/simulate
    sim_resp = client.post(
        "/api/runtime/simulate",
        headers=TEST_CREATOR_HEADER,
        json={"scenario": "VIRAL_CREATOR"},
    )
    assert sim_resp.status_code == 200
    assert sim_resp.json()["status"] == "PASSED"

    # 3. GET /api/runtime/report
    rep_resp = client.get("/api/runtime/report")
    assert rep_resp.status_code == 200
    assert rep_resp.json()["passed_tests"] >= 10

    # 4. GET /api/runtime/certification
    cert_resp = client.get("/api/runtime/certification", headers=TEST_CREATOR_HEADER)
    assert cert_resp.status_code == 200
    assert cert_resp.json()["overall_score"] >= 90.0

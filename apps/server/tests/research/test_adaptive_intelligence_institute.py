"""Automated Pytest suite for OMNIA Adaptive Intelligence Institute Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.research_institute.domain import ProjectName
from app.modules.research_institute.service import (
    AtlasEngine,
    CompassEngine,
    ForgeEngine,
    ResearchInstituteEngine,
)

client = TestClient(app)


def test_engines_and_benchmarks() -> None:
    atlas = AtlasEngine()
    res = atlas.compress_graph(1000)
    assert res["compressed_nodes"] < 1000
    assert res["fidelity_retained"] >= 0.99

    compass = CompassEngine()
    comp_res = compass.plan_trajectory(5)
    assert comp_res["expected_utility"] >= 0.90

    forge = ForgeEngine()
    bms = forge.evaluate_agents()
    assert len(bms) >= 2
    assert bms[0].accuracy_pct >= 95.0


def test_research_institute_engine_flow() -> None:
    engine = ResearchInstituteEngine()

    exps = engine.get_experiments()
    assert len(exps) >= 1

    exp = engine.run_experiment(
        project=ProjectName.PROJECT_COMPASS,
        title="Multi-Year Strategic Trajectory Planning",
        hypothesis="Monte Carlo scenario rollouts increase trajectory utility under uncertainty.",
    )
    assert exp.project == ProjectName.PROJECT_COMPASS

    benchmarks = engine.get_benchmarks()
    assert len(benchmarks) >= 2

    papers = engine.get_papers()
    assert len(papers) >= 1


def test_research_institute_api_endpoints() -> None:
    # 1. GET /api/research/projects
    proj_resp = client.get("/api/research/projects")
    assert proj_resp.status_code == 200
    assert len(proj_resp.json()) >= 1

    # 2. POST /api/research/experiments/run
    exp_resp = client.post(
        "/api/research/experiments/run",
        json={
            "project": "PROJECT_AURORA",
            "title": "Differential Privacy Threshold Bounds in Federated Learning",
            "hypothesis": "Epsilon 0.05 guarantees zero telemetry leakage across 10k nodes.",
        },
    )
    assert exp_resp.status_code == 200
    assert exp_resp.json()["project"] == "PROJECT_AURORA"

    # 3. GET /api/research/benchmarks
    bm_resp = client.get("/api/research/benchmarks")
    assert bm_resp.status_code == 200
    assert len(bm_resp.json()) >= 2

    # 4. GET /api/research/papers
    p_resp = client.get("/api/research/papers")
    assert p_resp.status_code == 200
    assert len(p_resp.json()) >= 1

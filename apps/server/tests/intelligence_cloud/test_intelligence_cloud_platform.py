"""Automated Pytest suite for OMNIA Intelligence Cloud Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.intelligence_cloud.service import (
    BenchmarkService,
    IntelligenceCloudEngine,
    PrivacyEngine,
    TrendEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_privacy() -> None:
    priv_engine = PrivacyEngine(min_sample_size=100)
    assert priv_engine.is_privacy_safe(120) is True
    assert priv_engine.is_privacy_safe(45) is False

    trend_engine = TrendEngine()
    trends = trend_engine.mine_trends()
    assert len(trends) >= 2
    assert trends[0].sample_size >= 100

    bm_service = BenchmarkService()
    bms = bm_service.calculate_benchmarks("ws-101")
    assert len(bms) >= 2
    assert bms[0].creator_percentile > 0.0


def test_intelligence_cloud_engine_flow() -> None:
    engine = IntelligenceCloudEngine()

    trends = engine.get_trends()
    assert len(trends) >= 2

    bms = engine.get_benchmarks("ws-101")
    assert len(bms) >= 2

    insights = engine.get_insights()
    assert len(insights) >= 1

    opt = engine.update_opt_in("ws-101", telemetry=True, benchmarking=True)
    assert opt.opt_in_telemetry is True


def test_intelligence_cloud_api_endpoints() -> None:
    # 1. GET /api/ecosystem/trends
    tr_resp = client.get("/api/ecosystem/trends")
    assert tr_resp.status_code == 200
    assert len(tr_resp.json()) >= 2

    # 2. GET /api/ecosystem/benchmarks
    bm_resp = client.get("/api/ecosystem/benchmarks", headers=TEST_CREATOR_HEADER)
    assert bm_resp.status_code == 200
    assert len(bm_resp.json()) >= 2

    # 3. GET /api/ecosystem/insights
    ins_resp = client.get("/api/ecosystem/insights")
    assert ins_resp.status_code == 200
    assert len(ins_resp.json()) >= 1

    # 4. POST /api/ecosystem/opt-in
    opt_resp = client.post(
        "/api/ecosystem/opt-in",
        headers=TEST_CREATOR_HEADER,
        json={"opt_in_telemetry": True, "opt_in_benchmarking": True},
    )
    assert opt_resp.status_code == 200
    assert opt_resp.json()["opt_in_telemetry"] is True

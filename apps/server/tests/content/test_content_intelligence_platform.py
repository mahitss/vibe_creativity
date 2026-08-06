"""Automated Pytest suite for OMNIA Content Intelligence Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.content_intelligence.domain import ContentState, RepurposeFormat
from app.modules.content_intelligence.service import (
    ContentIntelligenceEngine,
    IdeaEngine,
    PerformanceTracker,
    RepurposingEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_repurposing() -> None:
    rep_engine = RepurposingEngine()
    job = rep_engine.transform("cnt-101", RepurposeFormat.LONGFORM_TO_SHORTS, "YouTube Shorts")
    assert job.source_content_id == "cnt-101"
    assert job.confidence >= 0.90
    assert "HOOK" in job.output_draft

    idea_engine = IdeaEngine()
    ideas = idea_engine.generate_ideas()
    assert len(ideas) >= 2

    perf_tracker = PerformanceTracker()
    perf = perf_tracker.calculate_performance("cnt-101")
    assert perf.views > 0
    assert perf.retention_pct > 0.0


def test_content_intelligence_engine_flow() -> None:
    engine = ContentIntelligenceEngine()

    library = engine.get_content_library(workspace_id="ws-101")
    assert len(library) >= 2

    cal = engine.get_calendar(workspace_id="ws-101")
    assert len(cal) >= 2

    asset = engine.update_status("cnt-101", status=ContentState.PUBLISHED)
    assert asset.status == ContentState.PUBLISHED

    job = engine.repurpose_content("cnt-101", RepurposeFormat.VIDEO_TO_CAROUSEL, "LinkedIn")
    assert job.target_format == RepurposeFormat.VIDEO_TO_CAROUSEL


def test_content_intelligence_api_endpoints() -> None:
    # 1. GET /api/content_intelligence
    list_resp = client.get("/api/content_intelligence", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 2
    cnt_id = list_resp.json()[0]["content_id"]

    # 2. GET /api/content_intelligence/calendar
    cal_resp = client.get("/api/content_intelligence/calendar", headers=TEST_CREATOR_HEADER)
    assert cal_resp.status_code == 200
    assert len(cal_resp.json()) >= 2

    # 3. GET /api/content_intelligence/ideas
    idea_resp = client.get("/api/content_intelligence/ideas")
    assert idea_resp.status_code == 200
    assert len(idea_resp.json()) >= 2

    # 4. POST /api/content_intelligence/repurpose
    rep_resp = client.post(
        "/api/content_intelligence/repurpose",
        json={
            "content_id": cnt_id,
            "target_format": "LONGFORM_TO_SHORTS",
            "target_platform": "TikTok",
        },
    )
    assert rep_resp.status_code == 200
    assert rep_resp.json()["source_content_id"] == cnt_id

    # 5. PATCH /api/content_intelligence/status
    patch_resp = client.patch(
        "/api/content_intelligence/status",
        json={"content_id": cnt_id, "status": "PUBLISHED"},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "PUBLISHED"

    # 6. GET /api/content_intelligence/performance
    perf_resp = client.get(f"/api/content_intelligence/performance?content_id={cnt_id}")
    assert perf_resp.status_code == 200
    assert perf_resp.json()["views"] > 0

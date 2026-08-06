"""Automated Pytest suite for OMNIA Autonomous Follow-up Engine Platform."""

from datetime import UTC, datetime, timedelta

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.followup.domain import (
    FollowUpEvidence,
    FollowUpModel,
    FollowUpPriority,
    FollowUpStatus,
    FollowUpType,
)
from app.modules.followup.service import AutonomousFollowUpEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_followup_engine_deduplication_and_confidence() -> None:
    engine = AutonomousFollowUpEngine()
    now = datetime.now(tz=UTC)

    # Initial count
    initial_items = engine.get_followups("ws-101")
    assert len(initial_items) >= 2

    # Create new item
    f_new = FollowUpModel(
        id="flw-201",
        workspace_id="ws-101",
        mind_id="mind-exec-01",
        source_event="COMMUNITY_REPEATED_REQUESTS",  # Matching source event of flw-101
        title="Publish Docker Multi-Agent System Tutorial",
        reason="Duplicate signal from Discord",
        evidence=FollowUpEvidence(memories=["mem-new-01"]),
        priority=FollowUpPriority.HIGH,
        confidence=0.90,
        suggested_action="Deduplicate",
        created_at=now,
    )

    result = engine.create_followup(f_new)
    # Merged with existing flw-101
    assert result.id == "flw-101"
    assert result.merged_count == 2
    assert result.confidence == 0.99  # 0.96 + 0.05 maxed at 0.99
    assert "mem-new-01" in result.evidence.memories


def test_followup_today_summary_and_jobs() -> None:
    engine = AutonomousFollowUpEngine()

    summary = engine.get_today_summary("ws-101")
    assert summary["message"] == "I worked while you were away."
    assert "todays_priority_mission" in summary

    jobs = engine.run_background_jobs()
    assert "expired_jobs_cleaned" in jobs


def test_followup_api_endpoints() -> None:
    # 1. GET /api/followups
    list_resp = client.get("/api/followups", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 2

    # 2. GET /api/followups/today
    today_resp = client.get("/api/followups/today", headers=TEST_CREATOR_HEADER)
    assert today_resp.status_code == 200
    assert today_resp.json()["message"] == "I worked while you were away."

    # 3. POST /api/followups
    create_resp = client.post(
        "/api/followups",
        headers=TEST_CREATOR_HEADER,
        json={
            "source_event": "NEW_SPONSOR_QUERY",
            "title": "Respond to Vercel Sponsorship Inquiry",
            "reason": "Vercel offered $20,000 title sponsorship for React 19 series.",
            "priority": "CRITICAL",
            "confidence": 0.95,
            "suggested_action": "Approve email draft response.",
            "followup_type": "SPONSOR_FOLLOW_UP",
            "memories": ["mem-vercel-email"],
        },
    )
    assert create_resp.status_code == 200
    new_id = create_resp.json()["id"]

    # 4. PATCH /api/followups/{id}
    patch_resp = client.patch(
        f"/api/followups/{new_id}",
        headers=TEST_CREATOR_HEADER,
        json={"status": "SCHEDULED"},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "SCHEDULED"

    # 5. POST /api/followups/jobs/run
    jobs_resp = client.post("/api/followups/jobs/run", headers=TEST_CREATOR_HEADER)
    assert jobs_resp.status_code == 200

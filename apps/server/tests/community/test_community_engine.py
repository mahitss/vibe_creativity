"""Automated Pytest suite for OMNIA Community Intelligence Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.community.domain import VipStatus
from app.modules.community.service import CommunityIntelligenceEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-community"}


def test_community_seeding_and_vip_identification() -> None:
    engine = CommunityIntelligenceEngine()
    members = engine.get_members("creator-test-community")

    assert len(members) >= 3
    top_member = members[0]
    assert top_member.creator_relationship_score > 0.90
    assert top_member.username == "alex_dev"

    vips = engine.identify_vips("creator-test-community")
    assert len(vips) >= 2
    assert vips[0].vip_status == VipStatus.COMMUNITY_LEADER


def test_community_health_and_behavior_changes() -> None:
    engine = CommunityIntelligenceEngine()
    health = engine.calculate_community_health("creator-test-community")

    assert health.overall_score > 0.90
    assert health.positivity_score > 0.90

    alerts = engine.detect_behavior_changes("creator-test-community")
    assert len(alerts) >= 2
    assert "sarah" in alerts[0].username.lower()


def test_moderation_suggestion_generation() -> None:
    engine = CommunityIntelligenceEngine()
    sug = engine.generate_moderation_suggestion(
        creator_id="creator-test-community",
        target_user="tech_troll99",
        comment_text="Join t.me/free_crypto_scam to claim 1000 BTC!",
    )

    assert sug.target_user == "tech_troll99"
    assert sug.requires_approval is True
    assert len(sug.memory_citations) >= 1


def test_community_api_endpoints() -> None:
    # 1. GET /api/community
    overview_resp = client.get("/api/community", headers=TEST_CREATOR_HEADER)
    assert overview_resp.status_code == 200
    overview_data = overview_resp.json()
    assert overview_data["total_members"] == 12450
    assert len(overview_data["top_members"]) >= 3

    # 2. GET /api/community/members
    members_resp = client.get("/api/community/members", headers=TEST_CREATOR_HEADER)
    assert members_resp.status_code == 200
    assert len(members_resp.json()) >= 3

    # 3. GET /api/community/health
    health_resp = client.get("/api/community/health", headers=TEST_CREATOR_HEADER)
    assert health_resp.status_code == 200
    assert health_resp.json()["overall_score"] > 0.90

    # 4. GET /api/community/insights
    insights_resp = client.get("/api/community/insights", headers=TEST_CREATOR_HEADER)
    assert insights_resp.status_code == 200
    assert len(insights_resp.json()["most_requested_topics"]) >= 3

    # 5. POST /api/community/moderation/suggest
    sug_resp = client.post(
        "/api/community/moderation/suggest",
        headers=TEST_CREATOR_HEADER,
        json={"target_user": "spammer", "comment_text": "Click here for free money!"},
    )
    assert sug_resp.status_code == 200
    assert sug_resp.json()["target_user"] == "spammer"

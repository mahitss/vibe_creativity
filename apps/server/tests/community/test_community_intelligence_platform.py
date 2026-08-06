"""Automated Pytest suite for OMNIA Community Intelligence Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.community_intelligence.domain import VIPStatus
from app.modules.community_intelligence.service import (
    CommunityIntelligenceEngine,
    ModerationEngine,
    RelationshipEngine,
    TopicEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_relationship_and_moderation_engines() -> None:
    rel_engine = RelationshipEngine()
    score, vip = rel_engine.evaluate_relationship(interaction_count=10, creator_replies=5)
    assert score >= 90.0
    assert vip == VIPStatus.MODERATOR_CANDIDATE

    topic_engine = TopicEngine()
    topics = topic_engine.extract_topics()
    assert len(topics) >= 2

    mod_engine = ModerationEngine()
    rec = mod_engine.evaluate_comment("item-101", "usr-101", "Buy followers at cheap rates!")
    assert rec.flagged is True
    assert rec.recommended_action == "FLAG_FOR_REVIEW"


def test_community_intelligence_engine_flow() -> None:
    engine = CommunityIntelligenceEngine()

    members = engine.get_members(workspace_id="ws-101")
    assert len(members) >= 2

    m = engine.get_member(members[0].member_id)
    assert m.member_id == members[0].member_id

    health = engine.get_health_metrics("ws-101")
    assert health.engagement_score >= 90.0

    insights = engine.get_insights("ws-101")
    assert len(insights) >= 2


def test_community_intelligence_api_endpoints() -> None:
    # 1. GET /api/community_intelligence
    sum_resp = client.get("/api/community_intelligence", headers=TEST_CREATOR_HEADER)
    assert sum_resp.status_code == 200
    assert sum_resp.json()["total_members"] >= 2

    # 2. GET /api/community_intelligence/members
    mem_resp = client.get("/api/community_intelligence/members", headers=TEST_CREATOR_HEADER)
    assert mem_resp.status_code == 200
    m_id = mem_resp.json()[0]["member_id"]

    # 3. GET /api/community_intelligence/member/{id}
    det_resp = client.get(f"/api/community_intelligence/member/{m_id}")
    assert det_resp.status_code == 200
    assert det_resp.json()["member_id"] == m_id

    # 4. GET /api/community_intelligence/topics
    top_resp = client.get("/api/community_intelligence/topics")
    assert top_resp.status_code == 200
    assert len(top_resp.json()) >= 2

    # 5. GET /api/community_intelligence/health
    hlth_resp = client.get("/api/community_intelligence/health", headers=TEST_CREATOR_HEADER)
    assert hlth_resp.status_code == 200
    assert hlth_resp.json()["engagement_score"] >= 90.0

    # 6. GET /api/community_intelligence/insights
    ins_resp = client.get("/api/community_intelligence/insights", headers=TEST_CREATOR_HEADER)
    assert ins_resp.status_code == 200
    assert len(ins_resp.json()) >= 2

    # 7. POST /api/community_intelligence/moderation/recommend
    mod_resp = client.post(
        "/api/community_intelligence/moderation/recommend",
        json={"item_id": "cmt-101", "member_id": m_id, "content": "Great video on Docker!"},
    )
    assert mod_resp.status_code == 200
    assert mod_resp.json()["recommended_action"] == "APPROVE_AND_REPLY"

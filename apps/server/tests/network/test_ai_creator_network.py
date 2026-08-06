"""Automated Pytest suite for OMNIA AI Creator Network Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.network.domain import CampaignType, VerifiedCreator
from app.modules.network.service import (
    DiscoveryEngine,
    NetworkEngine,
    PlaybookEngine,
    ReputationEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_reputation() -> None:
    disc_engine = DiscoveryEngine()
    c1 = VerifiedCreator("ws-101", "Alex", "alex", ["AI"], 10000)
    c2 = VerifiedCreator("ws-102", "Jordan", "jordan", ["AI"], 8000)
    recs = disc_engine.recommend_matches("ws-101", [c1, c2])
    assert len(recs) == 1
    assert recs[0].matched_creator_id == "ws-102"

    rep_engine = ReputationEngine()
    rep = rep_engine.get_reputation("ws-101")
    assert rep["overall_score"] >= 90.0

    pbs = PlaybookEngine.get_default_playbooks()
    assert len(pbs) >= 2


def test_network_engine_flow() -> None:
    engine = NetworkEngine()

    creators = engine.get_verified_creators()
    assert len(creators) >= 2

    recs = engine.get_recommendations("ws-101")
    assert len(recs) >= 1

    camp = engine.propose_campaign("Joint Tutorial Video", CampaignType.JOINT_VIDEO, ["ws-101", "ws-102"], "2026-09-15")
    assert camp.campaign_type == CampaignType.JOINT_VIDEO

    rep = engine.get_reputation("ws-101")
    assert rep["overall_score"] >= 90.0

    pbs = engine.get_playbooks()
    assert len(pbs) >= 2


def test_network_api_endpoints() -> None:
    # 1. GET /api/network/creators
    cr_resp = client.get("/api/network/creators")
    assert cr_resp.status_code == 200
    assert len(cr_resp.json()) >= 2

    # 2. GET /api/network/recommendations
    rec_resp = client.get("/api/network/recommendations", headers=TEST_CREATOR_HEADER)
    assert rec_resp.status_code == 200
    assert len(rec_resp.json()) >= 1

    # 3. POST /api/network/campaigns
    camp_resp = client.post(
        "/api/network/campaigns",
        json={
            "title": "Cross-Platform Short Release",
            "campaign_type": "CROSS_PROMOTION",
            "creator_ids": ["ws-101", "ws-102"],
            "target_date": "2026-10-01",
        },
    )
    assert camp_resp.status_code == 200
    assert camp_resp.json()["campaign_type"] == "CROSS_PROMOTION"

    # 4. GET /api/network/reputation
    rep_resp = client.get("/api/network/reputation", headers=TEST_CREATOR_HEADER)
    assert rep_resp.status_code == 200
    assert rep_resp.json()["overall_score"] >= 90.0

    # 5. GET /api/network/playbooks
    pb_resp = client.get("/api/network/playbooks")
    assert pb_resp.status_code == 200
    assert len(pb_resp.json()) >= 2

"""Automated Pytest suite for OMNIA Sponsor Intelligence Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.sponsor_intelligence.domain import CampaignStatus, PipelineStage
from app.modules.sponsor_intelligence.service import (
    FollowupService,
    OpportunityEngine,
    RenewalPredictor,
    SponsorIntelligenceEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_predictors() -> None:
    opp_engine = OpportunityEngine()
    opps = opp_engine.scan_opportunities()
    assert len(opps) >= 2

    ren_predictor = RenewalPredictor()
    prob = ren_predictor.predict_renewal_probability(relationship_score=90.0, campaign_count=3)
    assert prob >= 0.90

    flw_service = FollowupService()
    draft = flw_service.generate_draft("sp-101", "Acme", PipelineStage.NEGOTIATION)
    assert draft.subject.startswith("OMNIA x Acme")
    assert len(draft.body) > 0


def test_sponsor_intelligence_engine_flow() -> None:
    engine = SponsorIntelligenceEngine()

    sponsors = engine.get_sponsors(workspace_id="ws-101")
    assert len(sponsors) >= 2

    pipeline = engine.get_pipeline(workspace_id="ws-101")
    assert len(pipeline["NEGOTIATION"]) >= 1

    cmp = engine.update_campaign("cmp-201", status=CampaignStatus.APPROVED)
    assert cmp.status == CampaignStatus.APPROVED


def test_sponsor_intelligence_api_endpoints() -> None:
    # 1. GET /api/sponsor_intelligence
    list_resp = client.get("/api/sponsor_intelligence", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 2
    sp_id = list_resp.json()[0]["sponsor_id"]

    # 2. GET /api/sponsor_intelligence/pipeline
    pipe_resp = client.get("/api/sponsor_intelligence/pipeline", headers=TEST_CREATOR_HEADER)
    assert pipe_resp.status_code == 200
    assert "NEGOTIATION" in pipe_resp.json()

    # 3. GET /api/sponsor_intelligence/opportunities
    opp_resp = client.get("/api/sponsor_intelligence/opportunities")
    assert opp_resp.status_code == 200
    assert len(opp_resp.json()) >= 2

    # 4. POST /api/sponsor_intelligence/followup
    flw_resp = client.post("/api/sponsor_intelligence/followup", json={"sponsor_id": sp_id})
    assert flw_resp.status_code == 200
    assert flw_resp.json()["sponsor_id"] == sp_id

    # 5. GET /api/sponsor_intelligence/{id}
    det_resp = client.get(f"/api/sponsor_intelligence/{sp_id}")
    assert det_resp.status_code == 200
    assert det_resp.json()["sponsor_id"] == sp_id

    # 6. PATCH /api/sponsor_intelligence/campaigns/{id}
    patch_resp = client.patch(
        "/api/sponsor_intelligence/campaigns/cmp-201",
        json={"status": "COMPLETED", "approval_state": "VERIFIED"},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "COMPLETED"

"""Automated Pytest suite for OMNIA Sponsor Intelligence Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.sponsors.domain import SponsorStatus
from app.modules.sponsors.service import SponsorIntelligenceEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-sponsors"}


def test_sponsor_seeding_and_pipeline() -> None:
    engine = SponsorIntelligenceEngine()
    sponsors = engine.get_sponsors("creator-test-sponsors")

    assert len(sponsors) >= 3
    top_sponsor = sponsors[0]
    assert top_sponsor.relationship_score > 0.85
    assert top_sponsor.lifetime_value > 5000.0


def test_risk_detection_and_opportunities() -> None:
    engine = SponsorIntelligenceEngine()
    risks = engine.detect_risks("creator-test-sponsors")

    assert len(risks) >= 2
    assert risks[0].company_name == "CloudCorp Inc."
    assert "media kit" in risks[0].message

    opps = engine.discover_opportunities("creator-test-sponsors")
    assert len(opps) >= 2
    assert "Supabase" in opps[0].brand_name


def test_create_sponsor_and_status_update() -> None:
    engine = SponsorIntelligenceEngine()

    new_sponsor = engine.create_sponsor(
        creator_id="creator-test-sponsors",
        company_name="Stripe",
        brand="Stripe Connect & Billing",
        industry="Financial Technology",
        primary_contact="Jessica Taylor (Growth Partnerships)",
        email="jtaylor@stripe.com",
        offered_price=12000.0,
    )

    assert new_sponsor.status == SponsorStatus.CONTACTED
    assert new_sponsor.company_name == "Stripe"

    updated = engine.update_status("creator-test-sponsors", new_sponsor.id, SponsorStatus.NEGOTIATION)
    assert updated.status == SponsorStatus.NEGOTIATION


def test_sponsor_api_endpoints() -> None:
    # 1. GET /api/sponsors
    sponsors_resp = client.get("/api/sponsors", headers=TEST_CREATOR_HEADER)
    assert sponsors_resp.status_code == 200
    sponsors_data = sponsors_resp.json()
    assert len(sponsors_data) >= 3

    # 2. GET /api/sponsors/pipeline
    pipeline_resp = client.get("/api/sponsors/pipeline", headers=TEST_CREATOR_HEADER)
    assert pipeline_resp.status_code == 200
    pipeline_data = pipeline_resp.json()
    assert pipeline_data["total_active_sponsors"] >= 3
    assert len(pipeline_data["risk_alerts"]) >= 2

    # 3. GET /api/sponsors/opportunities
    opps_resp = client.get("/api/sponsors/opportunities", headers=TEST_CREATOR_HEADER)
    assert opps_resp.status_code == 200
    assert len(opps_resp.json()) >= 2

    # 4. POST /api/sponsors/followup
    followup_resp = client.post(
        "/api/sponsors/followup",
        headers=TEST_CREATOR_HEADER,
        json={"sponsor_id": "spn-cloudcorp-101"},
    )
    assert followup_resp.status_code == 200
    draft = followup_resp.json()
    assert "CloudCorp" in draft["company_name"]
    assert "media kit" in draft["draft_body"]

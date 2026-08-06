"""Automated Pytest suite for OMNIA Autonomous Business Intelligence Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.business_intelligence.domain import OpportunityCategory
from app.modules.business_intelligence.service import (
    BusinessIntelligenceEngine,
    DecisionLabEngine,
    OpportunityEngine,
    SimulationEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_simulation() -> None:
    opp_engine = OpportunityEngine()
    opps = opp_engine.discover_opportunities("ws-101")
    assert len(opps) >= 2
    assert opps[0].category == OpportunityCategory.PRODUCT_LAUNCH

    sim_engine = SimulationEngine()
    sim = sim_engine.run_simulation("What if I launch a course?")
    assert sim.risk_level == "LOW"
    assert "+24.5%" in sim.projected_revenue_change

    lab_engine = DecisionLabEngine()
    cards = lab_engine.get_decision_cards()
    assert len(cards) >= 1
    assert cards[0].confidence_score >= 0.90


def test_bi_engine_flow() -> None:
    engine = BusinessIntelligenceEngine()

    opps = engine.get_opportunities("ws-101")
    assert len(opps) >= 2

    sim = engine.run_simulation("What if I publish twice a week?")
    assert sim.query == "What if I publish twice a week?"

    fc = engine.get_forecast()
    assert fc.projected_val > 0.0

    cards = engine.get_decisions()
    assert len(cards) >= 1


def test_bi_api_endpoints() -> None:
    # 1. GET /api/bi/opportunities
    opp_resp = client.get("/api/bi/opportunities", headers=TEST_CREATOR_HEADER)
    assert opp_resp.status_code == 200
    assert len(opp_resp.json()) >= 2

    # 2. POST /api/bi/simulate
    sim_resp = client.post(
        "/api/bi/simulate",
        json={"query": "What if I accept Sponsor A instead of Sponsor B?"},
    )
    assert sim_resp.status_code == 200
    assert sim_resp.json()["query"] == "What if I accept Sponsor A instead of Sponsor B?"

    # 3. GET /api/bi/forecast
    fc_resp = client.get("/api/bi/forecast")
    assert fc_resp.status_code == 200
    assert fc_resp.json()["projected_val"] > 0.0

    # 4. GET /api/bi/decisions
    dec_resp = client.get("/api/bi/decisions")
    assert dec_resp.status_code == 200
    assert len(dec_resp.json()) >= 1

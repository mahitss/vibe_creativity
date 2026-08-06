"""Automated Pytest suite for OMNIA 2060 Universal Digital Infrastructure Grid Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.infrastructure_2060.service import (
    EducationalSupportEngine,
    OmniaInfrastructure2060Service,
    PersonalIntelligenceEngine,
    ScientificDiscoveryEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_infrastructure() -> None:
    pers_engine = PersonalIntelligenceEngine()
    ctx = pers_engine.resolve_context("ws-101")
    assert ctx["persistent_context_active"] is True
    assert ctx["privacy_guarantee"] == "DIFFERENTIAL_PRIVACY_LOCAL_STRICT"

    disc_engine = ScientificDiscoveryEngine()
    disc = disc_engine.evaluate_hypothesis("Quantum Physics", "Quantum entanglement in room temperature superconductors")
    assert disc.confidence >= 0.99
    assert len(disc.reasoning_trace) >= 3

    edu_engine = EducationalSupportEngine()
    sess = edu_engine.create_session("student-1", "AI Operating System Architecture")
    assert sess.mastery_pct >= 90.0


def test_infrastructure_service_flow() -> None:
    service = OmniaInfrastructure2060Service()

    telem = service.get_telemetry()
    assert telem.global_nodes_active == 4500000
    assert telem.uptime_pct == 99.999

    disc = service.assist_discovery("Biology", "Synthetic protein folding")
    assert disc.confidence >= 0.99

    sess = service.start_learning_session("student-2", "Quantum Computing")
    assert sess.topic == "Quantum Computing"

    doms = service.list_domains()
    assert len(doms) == 5


def test_infrastructure_api_endpoints() -> None:
    # 1. GET /api/infrastructure/telemetry
    tel_resp = client.get("/api/infrastructure/telemetry")
    assert tel_resp.status_code == 200
    assert tel_resp.json()["global_nodes_active"] == 4500000

    # 2. POST /api/infrastructure/scientific-reasoning
    disc_resp = client.post(
        "/api/infrastructure/scientific-reasoning",
        json={
            "domain": "Astrophysics",
            "hypothesis": "Exoplanet atmospheric biosignatures",
        },
    )
    assert disc_resp.status_code == 200
    assert disc_resp.json()["confidence"] >= 0.99

    # 3. POST /api/infrastructure/learning-session
    sess_resp = client.post(
        "/api/infrastructure/learning-session",
        headers=TEST_CREATOR_HEADER,
        json={"topic": "Neural Network Optimization"},
    )
    assert sess_resp.status_code == 200
    assert sess_resp.json()["mastery_pct"] >= 90.0

    # 4. GET /api/infrastructure/domains
    dom_resp = client.get("/api/infrastructure/domains")
    assert dom_resp.status_code == 200
    assert len(dom_resp.json()) == 5

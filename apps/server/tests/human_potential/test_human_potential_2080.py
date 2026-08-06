"""Automated Pytest suite for OMNIA 2080 Human Potential Amplification Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.human_potential_2080.service import (
    AmplificationEngine,
    DecisionGateService,
    KnowledgePreservationEngine,
    OmniaHumanPotential2080Service,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_human_amplification() -> None:
    amp_engine = AmplificationEngine()
    metrics = amp_engine.get_metrics()
    assert metrics.amplification_multiplier == 14.2
    assert metrics.human_agency_score == 1.0

    pres_engine = KnowledgePreservationEngine()
    arch = pres_engine.archive("Quantum Protocol Spec", "OMNIA Core Pioneers")
    assert arch.preservation_tier == "CENTURY_IMMUTABLE"

    gate = DecisionGateService()
    audit = gate.submit_for_approval(
        action_proposed="Deploy Autonomous Campaign",
        human_approver_id="ws-101",
        reasoning_explanation="High confidence recommendation",
    )
    assert audit.approved is False  # Must require human signature


def test_human_potential_service_flow() -> None:
    service = OmniaHumanPotential2080Service()

    m = service.get_amplification_metrics()
    assert m.amplified_capability == 1420.0

    arch = service.preserve_knowledge("Intergenerational Memory Format", "Foundation")
    assert arch.title == "Intergenerational Memory Format"

    aud = service.request_decision("Publish Video", "ws-101", "Cites memory mem-1")
    assert aud.human_approver_id == "ws-101"

    archives = service.list_archives()
    assert len(archives) >= 2


def test_human_potential_api_endpoints() -> None:
    # 1. GET /api/human-potential/amplification
    amp_resp = client.get("/api/human-potential/amplification")
    assert amp_resp.status_code == 200
    assert amp_resp.json()["amplification_multiplier"] == 14.2

    # 2. POST /api/human-potential/preserve-knowledge
    pres_resp = client.post(
        "/api/human-potential/preserve-knowledge",
        json={"title": "2080 Vision Paper", "creator_lineage": "OMNIA Fellows"},
    )
    assert pres_resp.status_code == 200
    assert pres_resp.json()["preservation_tier"] == "CENTURY_IMMUTABLE"

    # 3. POST /api/human-potential/request-decision
    dec_resp = client.post(
        "/api/human-potential/request-decision",
        headers=TEST_CREATOR_HEADER,
        json={
            "action_proposed": "Execute Enterprise Sponsorship Deal",
            "reasoning_explanation": "Cites historical contract memory mem-99",
        },
    )
    assert dec_resp.status_code == 200
    assert dec_resp.json()["approved"] is False

    # 4. GET /api/human-potential/archives
    arch_resp = client.get("/api/human-potential/archives")
    assert arch_resp.status_code == 200
    assert len(arch_resp.json()) >= 2

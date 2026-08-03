"""Automated Test Suite for OMNIA Executive Reasoning Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.reasoning.domain import EvidenceType
from app.modules.reasoning.service import ConfidenceCalculator, ReasoningEngineService


@pytest.fixture
def calculator() -> ConfidenceCalculator:
    return ConfidenceCalculator()


@pytest.fixture
def reasoning_service() -> ReasoningEngineService:
    return ReasoningEngineService()


def test_confidence_calculator(calculator: ConfidenceCalculator) -> None:
    factors = calculator.compute(
        memory_freshness=0.95,
        evidence_count=0.90,
        historical_success=0.92,
        relationship_strength=0.88,
        goal_alignment=0.96,
    )
    assert factors.total_score == 0.92
    assert factors.goal_alignment == 0.96


def test_reasoning_chain_evidence_grounding(reasoning_service: ReasoningEngineService) -> None:
    chains = reasoning_service.get_reasoning_chains("creator-101")
    assert len(chains) >= 2

    c1 = chains[0]
    assert c1["confidence_score"] >= 0.9
    assert len(c1["evidence"]) >= 3
    evidence_types = {e["evidence_type"] for e in c1["evidence"]}
    assert EvidenceType.PERFORMANCE.value in evidence_types
    assert EvidenceType.COMMUNITY.value in evidence_types


def test_alternative_option_rejection(reasoning_service: ReasoningEngineService) -> None:
    chains = reasoning_service.get_reasoning_chains("creator-101")
    c1 = chains[0]
    assert len(c1["alternative_options"]) >= 1

    alt = c1["alternative_options"][0]
    assert alt["title"] != ""
    assert "rejected_reason" in alt
    assert alt["risk_score"] > 0.5


def test_reasoning_api_endpoints() -> None:
    client = TestClient(app)

    # GET /api/reasoning
    response = client.get("/api/reasoning", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    chains = response.json()
    assert isinstance(chains, list)
    assert len(chains) >= 2

    # GET /api/reasoning/{id}
    target_id = chains[0]["id"]
    response = client.get(f"/api/reasoning/{target_id}", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["id"] == target_id

    # GET /api/reasoning/evidence
    response = client.get("/api/reasoning/evidence", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    evidence = response.json()
    assert EvidenceType.PERFORMANCE.value in evidence

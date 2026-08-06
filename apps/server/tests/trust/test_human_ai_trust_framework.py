"""Automated Pytest suite for OMNIA Human-AI Trust & Explainability Framework."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.trust_framework.domain import FeedbackAction, UncertaintyLevel
from app.modules.trust_framework.service import (
    ExplainabilityEngine,
    HumanFeedbackStore,
    TrustFrameworkEngine,
    UncertaintyEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_explainability() -> None:
    exp_engine = ExplainabilityEngine()
    card = exp_engine.generate_explanation("Scale Short Videos", ["mem-1", "mem-2"])
    assert card.confidence_score >= 0.90
    assert "mem-1" in card.supporting_memories

    unc_engine = UncertaintyEngine()
    report = unc_engine.evaluate_uncertainty("Scale Short Videos")
    assert report.uncertainty_level == UncertaintyLevel.LOW
    assert len(report.weak_evidence_items) >= 1

    fb_store = HumanFeedbackStore()
    fb = fb_store.record(card.card_id, "ws-101", FeedbackAction.APPROVE, "Great decision")
    assert fb.action == FeedbackAction.APPROVE


def test_trust_engine_flow() -> None:
    engine = TrustFrameworkEngine()

    cards = engine.get_explanations()
    assert len(cards) >= 1

    fb = engine.record_feedback(cards[0].card_id, "ws-101", FeedbackAction.CHALLENGE_ASSUMPTION, "Sponsor delay risk")
    assert fb.action == FeedbackAction.CHALLENGE_ASSUMPTION

    report = engine.get_uncertainty(cards[0].decision_title)
    assert report.target_decision == cards[0].decision_title

    metrics = engine.get_metrics()
    assert metrics.accuracy_rate == 98.4


def test_trust_api_endpoints() -> None:
    # 1. GET /api/trust/explanations
    exp_resp = client.get("/api/trust/explanations")
    assert exp_resp.status_code == 200
    assert len(exp_resp.json()) >= 1

    # 2. POST /api/trust/feedback
    fb_resp = client.post(
        "/api/trust/feedback",
        headers=TEST_CREATOR_HEADER,
        json={
            "card_id": exp_resp.json()[0]["card_id"],
            "action": "APPROVE",
            "notes": "Approved by creator",
        },
    )
    assert fb_resp.status_code == 200
    assert fb_resp.json()["action"] == "APPROVE"

    # 3. GET /api/trust/uncertainty
    unc_resp = client.get("/api/trust/uncertainty")
    assert unc_resp.status_code == 200
    assert unc_resp.json()["uncertainty_level"] == "LOW"

    # 4. GET /api/trust/metrics
    met_resp = client.get("/api/trust/metrics")
    assert met_resp.status_code == 200
    assert met_resp.json()["accuracy_rate"] == 98.4

"""Automated Test Suite for OMNIA Executive Review Engine (COO Strategy Engine)."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.reviews.domain import (
    BusinessImpact,
    RecommendationStatus,
    ReviewType,
)
from app.modules.reviews.service import ExecutiveReviewService, ReviewGeneratorEngine


@pytest.fixture
def review_engine() -> ReviewGeneratorEngine:
    return ReviewGeneratorEngine()


@pytest.fixture
def review_service() -> ExecutiveReviewService:
    return ExecutiveReviewService()


def test_review_generator_daily_brief(review_engine: ReviewGeneratorEngine) -> None:
    review = review_engine.generate_review("creator-101", ReviewType.DAILY_BRIEF)
    assert review.review_type == ReviewType.DAILY_BRIEF
    assert review.title == "Daily Executive COO Briefing"
    assert len(review.recommendations) >= 2

    rec1 = review.recommendations[0]
    assert rec1.confidence_score >= 0.9
    assert len(rec1.supporting_memories) >= 1
    assert rec1.historical_comparison != ""
    assert rec1.business_impact == BusinessImpact.HIGH


def test_review_generator_weekly_executive(review_engine: ReviewGeneratorEngine) -> None:
    review = review_engine.generate_review("creator-101", ReviewType.WEEKLY_EXECUTIVE)
    assert review.review_type == ReviewType.WEEKLY_EXECUTIVE
    assert len(review.patterns_detected) >= 3
    assert len(review.reflections.wins) >= 1
    assert len(review.reflections.lessons_learned) >= 1
    assert "Q3 Creator Revenue ($25k)" in review.goal_progress


def test_recommendation_status_transition(review_service: ExecutiveReviewService) -> None:
    reviews = review_service.get_reviews("creator-101")
    target_review_id = reviews[0]["id"]
    target_rec_id = reviews[0]["recommendations"][0]["id"]

    # Initial status should be PENDING
    assert reviews[0]["recommendations"][0]["status"] == RecommendationStatus.PENDING.value

    # Update to APPROVED
    success = review_service.update_recommendation_status(
        target_review_id, target_rec_id, RecommendationStatus.APPROVED
    )
    assert success is True

    updated_review = review_service.get_review_by_id(target_review_id)
    assert updated_review is not None
    updated_rec = next(r for r in updated_review["recommendations"] if r["id"] == target_rec_id)
    assert updated_rec["status"] == RecommendationStatus.APPROVED.value


def test_reviews_api_endpoints() -> None:
    client = TestClient(app)

    # Test GET /api/reviews
    response = client.get("/api/reviews", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    reviews = response.json()
    assert isinstance(reviews, list)
    assert len(reviews) >= 2

    # Test GET /api/reviews/{id}
    target_id = reviews[0]["id"]
    response = client.get(f"/api/reviews/{target_id}", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["id"] == target_id

    # Test POST /api/reviews/generate
    response = client.post(
        "/api/reviews/generate",
        json={"review_type": "MONTHLY_BUSINESS"},
        headers={"X-Creator-Id": "creator-101"},
    )
    assert response.status_code == 200
    new_review = response.json()
    assert new_review["review_type"] == "MONTHLY_BUSINESS"

    # Test POST /api/reviews/approve
    rec_id = new_review["recommendations"][0]["id"]
    response = client.post(
        "/api/reviews/approve",
        json={
            "review_id": new_review["id"],
            "recommendation_id": rec_id,
            "status": "APPROVED",
        },
        headers={"X-Creator-Id": "creator-101"},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "APPROVED"

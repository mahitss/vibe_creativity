"""Automated Pytest suite for OMNIA Adaptive Personalization Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.personalization.domain import AdaptationStatus, HabitCategory
from app.modules.personalization.service import PersonalizationEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-personalization"}


def test_personalization_seeding_and_habits() -> None:
    engine = PersonalizationEngine()
    model = engine.get_model("creator-test-personalization")

    assert model.creator_id == "creator-test-personalization"
    assert len(model.habits) >= 5
    assert len(model.experiments) >= 2
    assert len(model.insights) >= 3

    top_habit = model.habits[0]
    assert top_habit.category == HabitCategory.WORK_HOURS
    assert top_habit.confidence > 0.90


def test_update_habit_and_preferences() -> None:
    engine = PersonalizationEngine()

    # Update habit status
    updated = engine.update_habit_status("creator-test-personalization", "hbt-104", AdaptationStatus.ACCEPTED)
    assert updated.status == AdaptationStatus.ACCEPTED

    # Update preferences
    prefs = engine.update_preferences("creator-test-personalization", {"notification_window": "Night (22:00 UTC)"})
    assert prefs.notification_window == "Night (22:00 UTC)"


def test_reset_model_flow() -> None:
    engine = PersonalizationEngine()
    reset_model = engine.reset_model("creator-test-personalization")

    assert len(reset_model.habits) >= 5
    assert reset_model.preferences.notification_window == "Evening (18:00 UTC)"


def test_personalization_api_endpoints() -> None:
    # 1. GET /api/personalization
    resp = client.get("/api/personalization", headers=TEST_CREATOR_HEADER)
    assert resp.status_code == 200
    data = resp.json()
    assert data["creator_id"] == "creator-test-personalization"
    assert len(data["habits"]) >= 5

    # 2. GET /api/personalization/habits
    habits_resp = client.get("/api/personalization/habits", headers=TEST_CREATOR_HEADER)
    assert habits_resp.status_code == 200
    assert len(habits_resp.json()) >= 5

    # 3. GET /api/personalization/insights
    insights_resp = client.get("/api/personalization/insights", headers=TEST_CREATOR_HEADER)
    assert insights_resp.status_code == 200
    assert len(insights_resp.json()) >= 3

    # 4. PATCH /api/personalization/preferences
    pref_resp = client.patch(
        "/api/personalization/preferences",
        headers=TEST_CREATOR_HEADER,
        json={"preferred_tone": "Direct & Action-Oriented"},
    )
    assert pref_resp.status_code == 200
    assert pref_resp.json()["preferred_tone"] == "Direct & Action-Oriented"

    # 5. POST /api/personalization/reset
    reset_resp = client.post("/api/personalization/reset", headers=TEST_CREATOR_HEADER)
    assert reset_resp.status_code == 200
    assert reset_resp.json()["creator_id"] == "creator-test-personalization"

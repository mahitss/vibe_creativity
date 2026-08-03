"""Automated Test Suite for OMNIA Demo Mode & Presenter Mode."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.demo.service import DemoStoryService


@pytest.fixture
def demo_service() -> DemoStoryService:
    return DemoStoryService()


def test_demo_scenes_metadata(demo_service: DemoStoryService) -> None:
    scenes = demo_service.get_scenes()
    assert len(scenes) == 7

    # Total duration should be under 2 minutes (115 seconds)
    total_seconds = sum(s["duration_seconds"] for s in scenes)
    assert total_seconds <= 120

    # Scene 1 & Scene 7 checks
    assert scenes[0]["scene_number"] == 1
    assert scenes[0]["title"] == "Scene 1: Welcome Back"
    assert scenes[6]["scene_number"] == 7
    assert "OMNIA remembers" in scenes[6]["subtitle"] or "OMNIA remembers" in scenes[6]["talking_points"][0]


def test_demo_session_navigation_and_reset(demo_service: DemoStoryService) -> None:
    session = demo_service.get_session()
    assert session["current_scene_index"] == 0

    # Advance to scene 3
    updated = demo_service.set_scene(3)
    assert updated["current_scene_index"] == 3
    assert updated["current_scene"]["scene_number"] == 4

    # Toggle play & presenter mode
    played = demo_service.toggle_play()
    assert played["is_playing"] is True

    presented = demo_service.toggle_presenter_mode()
    assert presented["presenter_mode_active"] is True

    # Reset
    reset = demo_service.reset_session()
    assert reset["current_scene_index"] == 0
    assert reset["is_playing"] is False


def test_demo_story_creator_profile(demo_service: DemoStoryService) -> None:
    story = demo_service.get_story()
    assert "creator_profile" in story
    assert story["creator_profile"]["name"] == "Mahit"
    assert story["creator_profile"]["tenure_months"] == 18
    assert len(story["creator_profile"]["history_highlights"]) >= 4


def test_demo_api_endpoints() -> None:
    client = TestClient(app)

    # GET /api/demo/session
    response = client.get("/api/demo/session", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["total_scenes"] == 7

    # GET /api/demo/scenes
    response = client.get("/api/demo/scenes", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    scenes = response.json()
    assert isinstance(scenes, list)
    assert len(scenes) == 7

    # GET /api/demo/story
    response = client.get("/api/demo/story", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert "creator_profile" in response.json()

    # POST /api/demo/reset
    response = client.post("/api/demo/reset", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["current_scene_index"] == 0

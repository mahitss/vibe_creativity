"""Automated Pytest suite for OMNIA Content Strategy Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.content.domain import ContentPriority, ContentState, ContentType
from app.modules.content.service import ContentStrategyEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-content"}


def test_content_strategy_seeding_and_ranking() -> None:
    engine = ContentStrategyEngine()
    ideas = engine.get_ideas("creator-test-content")

    assert len(ideas) >= 4
    top_idea = ideas[0]
    assert top_idea.priority == ContentPriority.CRITICAL
    assert top_idea.score > 0.90
    assert "React" in top_idea.title


def test_roadmap_generation_and_series_tracking() -> None:
    engine = ContentStrategyEngine()
    roadmap = engine.get_roadmap("creator-test-content")

    assert len(roadmap.today) >= 1
    assert len(roadmap.this_week) >= 1

    series = engine.get_series_progress("creator-test-content")
    assert len(series) >= 2
    assert series[0].published_episodes == 4
    assert "React" in series[0].title


def test_create_content_and_status_transition() -> None:
    engine = ContentStrategyEngine()

    # Create new recommendation
    item = engine.create_content(
        creator_id="creator-test-content",
        title="PostgreSQL Indexing & Optimization Masterclass",
        description="Deep dive into B-Tree indexes, EXPLAIN ANALYZE, and query optimization.",
        content_type=ContentType.YOUTUBE_VIDEO,
        priority=ContentPriority.HIGH,
        memory_links=["mem-pg-request"],
    )
    assert item.status == ContentState.IDEA
    assert item.title == "PostgreSQL Indexing & Optimization Masterclass"

    # Transition state through pipeline
    updated = engine.update_status("creator-test-content", item.id, ContentState.SCRIPT)
    assert updated.status == ContentState.SCRIPT


def test_content_api_endpoints() -> None:
    # 1. GET /api/content/ideas
    ideas_resp = client.get("/api/content/ideas", headers=TEST_CREATOR_HEADER)
    assert ideas_resp.status_code == 200
    ideas_data = ideas_resp.json()
    assert len(ideas_data) >= 4

    # 2. GET /api/content/roadmap
    roadmap_resp = client.get("/api/content/roadmap", headers=TEST_CREATOR_HEADER)
    assert roadmap_resp.status_code == 200
    roadmap_data = roadmap_resp.json()
    assert "today" in roadmap_data
    assert "this_week" in roadmap_data

    # 3. GET /api/content/insights
    insights_resp = client.get("/api/content/insights", headers=TEST_CREATOR_HEADER)
    assert insights_resp.status_code == 200
    insights_data = insights_resp.json()
    assert len(insights_data["content_gaps"]) >= 1
    assert len(insights_data["series_trackers"]) >= 2

    # 4. POST /api/content/create
    create_resp = client.post(
        "/api/content/create",
        headers=TEST_CREATOR_HEADER,
        json={
            "title": "Redis Pub/Sub Architecture",
            "description": "Building real-time WebSockets with Redis Pub/Sub.",
            "content_type": "YOUTUBE_VIDEO",
            "priority": "HIGH",
            "memory_links": ["mem-redis-request"],
        },
    )
    assert create_resp.status_code == 200
    assert create_resp.json()["title"] == "Redis Pub/Sub Architecture"

    # 5. PATCH /api/content/status
    new_id = create_resp.json()["id"]
    status_resp = client.patch(
        "/api/content/status",
        headers=TEST_CREATOR_HEADER,
        json={"content_id": new_id, "status": "OUTLINE"},
    )
    assert status_resp.status_code == 200
    assert status_resp.json()["status"] == "OUTLINE"

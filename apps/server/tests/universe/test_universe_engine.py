"""Automated Pytest suite for OMNIA Creator Knowledge Universe."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.universe.domain import EntityType, RelationshipType
from app.modules.universe.service import KnowledgeUniverseEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-universe"}


def test_universe_seeding_and_structure() -> None:
    engine = KnowledgeUniverseEngine()
    universe = engine.get_universe("creator-test-universe")

    assert universe["total_entities"] == 15
    assert universe["total_relationships"] == 13
    assert len(universe["nodes"]) == 15
    assert len(universe["edges"]) == 13

    # Check presence of key entity types
    entity_types = {n["entity_type"] for n in universe["nodes"]}
    assert EntityType.VIDEO.value in entity_types
    assert EntityType.SPONSOR.value in entity_types
    assert EntityType.GOAL.value in entity_types
    assert EntityType.COURSE.value in entity_types


def test_entity_detail_and_neighbors() -> None:
    engine = KnowledgeUniverseEngine()
    detail = engine.get_entity_detail("ent-docker-video")

    assert detail is not None
    assert detail["title"] == "Video: Docker Multi-Agent Systems Deep Dive"
    assert detail["entity_type"] == EntityType.VIDEO.value
    assert len(detail["neighbors"]) >= 3


def test_path_tracing_and_ai_insights() -> None:
    engine = KnowledgeUniverseEngine()
    path = engine.trace_path("ent-agent-course", "ent-discord-community")

    assert path.source_id == "ent-agent-course"
    assert path.target_id == "ent-discord-community"
    assert path.hop_count >= 1
    assert len(path.nodes) >= 2

    insights = engine.generate_insights("creator-test-universe")
    assert "Docker" in insights.most_influential_entity
    assert len(insights.knowledge_gaps) >= 1


def test_universe_api_endpoints() -> None:
    # 1. GET /api/universe
    univ_resp = client.get("/api/universe", headers=TEST_CREATOR_HEADER)
    assert univ_resp.status_code == 200
    univ_data = univ_resp.json()
    assert univ_data["total_entities"] == 15
    assert univ_data["total_relationships"] == 13

    # 2. GET /api/universe/entity/{id}
    entity_resp = client.get("/api/universe/entity/ent-cloudcorp-sponsor", headers=TEST_CREATOR_HEADER)
    assert entity_resp.status_code == 200
    entity_data = entity_resp.json()
    assert entity_data["title"] == "Sponsor: CloudCorp Inc."

    # 3. GET /api/universe/path
    path_resp = client.get("/api/universe/path?source_id=ent-agent-course&target_id=ent-discord-community", headers=TEST_CREATOR_HEADER)
    assert path_resp.status_code == 200
    path_data = path_resp.json()
    assert path_data["hop_count"] >= 1

    # 4. GET /api/universe/insights
    insights_resp = client.get("/api/universe/insights", headers=TEST_CREATOR_HEADER)
    assert insights_resp.status_code == 200
    insights_data = insights_resp.json()
    assert "most_influential_entity" in insights_data
    assert len(insights_data["knowledge_gaps"]) >= 1

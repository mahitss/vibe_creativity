"""Automated Test Suite for OMNIA Living Memory Timeline & Interactive Memory Graph."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.timeline.domain import (
    EvolutionStage,
    NodeType,
    RelationshipType,
    TimelineType,
)
from app.modules.timeline.graph import MemoryGraphEngine
from app.modules.timeline.service import TimelineService


@pytest.fixture
def graph_engine() -> MemoryGraphEngine:
    return MemoryGraphEngine()


@pytest.fixture
def timeline_service() -> TimelineService:
    return TimelineService()


def test_graph_nodes_and_relationships(graph_engine: MemoryGraphEngine) -> None:
    nodes = graph_engine.get_nodes()
    edges = graph_engine.get_edges()

    assert len(nodes) >= 8
    assert len(edges) >= 7

    node_types = {n["node_type"] for n in nodes}
    assert NodeType.IDEA.value in node_types
    assert NodeType.VIDEO.value in node_types
    assert NodeType.SPONSOR.value in node_types
    assert NodeType.GOAL.value in node_types
    assert NodeType.COURSE.value in node_types

    relationships = {e["relationship"] for e in edges}
    assert RelationshipType.INSPIRED.value in relationships
    assert RelationshipType.CREATED.value in relationships
    assert RelationshipType.SPONSORED_BY.value in relationships
    assert RelationshipType.REPURPOSED.value in relationships


def test_timeline_events_and_filtering(graph_engine: MemoryGraphEngine) -> None:
    events = graph_engine.get_events("creator-101")
    assert len(events) >= 4

    # Evolution stage checks
    stages = {e["evolution_stage"] for e in events}
    assert EvolutionStage.IDEA.value in stages
    assert EvolutionStage.DRAFT.value in stages
    assert EvolutionStage.PUBLISHED.value in stages
    assert EvolutionStage.REPURPOSED.value in stages

    # Filter by type CONTENT
    content_events = graph_engine.get_events("creator-101", timeline_type="CONTENT")
    assert all(e["event_type"] == "CONTENT" for e in content_events)

    # Search query
    docker_events = graph_engine.get_events("creator-101", search_query="Docker")
    assert len(docker_events) >= 3


def test_playback_chronological_snapshots(graph_engine: MemoryGraphEngine) -> None:
    snapshots = graph_engine.get_playback_snapshots("creator-101")
    assert len(snapshots) >= 4

    # Verify chronological ordering
    for i in range(len(snapshots) - 1):
        assert snapshots[i]["timestamp"] <= snapshots[i + 1]["timestamp"]
        assert snapshots[i]["step"] == i + 1

    # Verify memory node expansion over time
    first_step_nodes = len(snapshots[0]["active_nodes"])
    last_step_nodes = len(snapshots[-1]["active_nodes"])
    assert last_step_nodes >= first_step_nodes


def test_bookmark_toggling(graph_engine: MemoryGraphEngine) -> None:
    events = graph_engine.get_events("creator-101")
    target_id = events[0]["id"]
    initial_status = events[0]["is_bookmarked"]

    toggled_status = graph_engine.toggle_bookmark(target_id)
    assert toggled_status != initial_status

    bookmarked_events = graph_engine.get_events("creator-101", bookmarked_only=True)
    assert any(e["id"] == target_id for e in bookmarked_events) == toggled_status


def test_timeline_api_endpoints() -> None:
    client = TestClient(app)

    # Test /api/timeline
    response = client.get("/api/timeline", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    events = response.json()
    assert isinstance(events, list)
    assert len(events) >= 4

    # Test /api/graph
    response = client.get("/api/graph", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    graph = response.json()
    assert "nodes" in graph
    assert "edges" in graph
    assert len(graph["nodes"]) >= 8

    # Test /api/timeline/playback
    response = client.get("/api/timeline/playback", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    snapshots = response.json()
    assert isinstance(snapshots, list)
    assert len(snapshots) >= 4

    # Test /api/timeline/bookmark
    event_id = events[0]["id"]
    response = client.post(f"/api/timeline/bookmark?event_id={event_id}", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert "is_bookmarked" in response.json()

"""Automated Test Suite for OMNIA Memory Ingestion Pipeline."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.ingestion.domain import EventSource, IngestionEventType, PriorityLevel
from app.modules.ingestion.service import ImportanceScorer, MemoryIngestionService


@pytest.fixture
def scorer() -> ImportanceScorer:
    return ImportanceScorer()


@pytest.fixture
def ingestion_service() -> MemoryIngestionService:
    return MemoryIngestionService()


def test_importance_scorer(scorer: ImportanceScorer) -> None:
    sponsor_metrics = scorer.score(IngestionEventType.SPONSOR_CONTACT, {})
    assert sponsor_metrics.importance >= 0.9
    assert sponsor_metrics.priority == PriorityLevel.CRITICAL

    community_metrics = scorer.score(IngestionEventType.AUDIENCE_REQUEST, {})
    assert community_metrics.importance >= 0.8
    assert community_metrics.priority == PriorityLevel.HIGH


def test_deduplication_engine(ingestion_service: MemoryIngestionService) -> None:
    ev1 = ingestion_service.submit_event(
        "creator-101",
        event_type=IngestionEventType.COMMUNITY_INSIGHT,
        source=EventSource.DISCORD,
        title="Unique Community Signal Test",
        description="Audience requesting Kubernetes orchestration guide",
    )
    mem_id_1 = ev1["resulting_memory_id"]
    assert mem_id_1 is not None

    # Submit exact same event title & type to trigger deduplication
    ev2 = ingestion_service.submit_event(
        "creator-101",
        event_type=IngestionEventType.COMMUNITY_INSIGHT,
        source=EventSource.DISCORD,
        title="Unique Community Signal Test",
        description="Audience requesting Kubernetes orchestration guide (duplicate)",
    )
    mem_id_2 = ev2["resulting_memory_id"]
    assert mem_id_2 == mem_id_1
    assert ev2["metrics"]["confidence"] > ev1["metrics"]["confidence"]


def test_ingestion_status_metrics(ingestion_service: MemoryIngestionService) -> None:
    status = ingestion_service.get_status_metrics("creator-101")
    assert "queue_depth" in status
    assert "processing_latency_ms" in status
    assert "ingestion_throughput_per_sec" in status
    assert status["ingested_count"] >= 3


def test_ingestion_api_endpoints() -> None:
    client = TestClient(app)

    # POST /api/events
    response = client.post(
        "/api/events",
        json={
            "event_type": "CONTENT_PUBLISHED",
            "source": "YOUTUBE",
            "title": "API Test Published Video",
            "description": "Video release with 10k views in 24h",
            "payload": {"views": 10000},
        },
        headers={"X-Creator-Id": "creator-101"},
    )
    assert response.status_code == 200
    res = response.json()
    assert res["status"] == "INGESTED"
    assert res["resulting_memory_id"] is not None

    # GET /api/events
    response = client.get("/api/events", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    events = response.json()
    assert len(events) >= 4

    # GET /api/memory/status
    response = client.get("/api/memory/status", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    metrics = response.json()
    assert metrics["ingested_count"] >= 4

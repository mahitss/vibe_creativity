"""Automated Pytest suite for OMNIA Persistent Memory Service."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.memory_service.domain import MemoryType
from app.modules.memory_service.service import (
    EmbeddingService,
    MemoryConsolidator,
    MemoryScorer,
    PersistentMemoryService,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_embedding_and_scorer() -> None:
    embedder = EmbeddingService()
    vec1 = embedder.generate_embedding("Subscriber Goal Target")
    vec2 = embedder.generate_embedding("Subscriber Goal Target")
    assert len(vec1) == 384
    sim = embedder.cosine_similarity(vec1, vec2)
    assert sim >= 0.99


def test_persistent_memory_service_flow() -> None:
    service = PersistentMemoryService()

    # Store Memory
    row = service.store_memory(
        workspace_id="ws-101",
        memory_type=MemoryType.GOAL,
        title="Increase Engagement by 25%",
        summary="Q3 audience engagement goal",
        content="Focus on interactive Q&A posts and Community tab polls.",
        importance=0.90,
    )
    assert row.memory_id.startswith("mem-")
    assert row.version == 1

    # Get Memory
    fetched = service.get_memory(row.memory_id)
    assert fetched.title == "Increase Engagement by 25%"
    assert fetched.access_count == 2

    # Update Memory
    updated = service.update_memory(row.memory_id, title="Increase Engagement by 30%")
    assert updated.version == 2
    assert updated.title == "Increase Engagement by 30%"

    # Search Memories
    results = service.search_memories(workspace_id="ws-101", query="Engagement goal")
    assert len(results) >= 1
    assert results[0].relevance_score > 0.0

    # Consolidate
    report = service.consolidate_memories(workspace_id="ws-101")
    assert report.consolidated_count >= 1


def test_memory_service_api_endpoints() -> None:
    # 1. POST /api/memory_service
    store_resp = client.post(
        "/api/memory_service",
        headers=TEST_CREATOR_HEADER,
        json={
            "memory_type": "PROJECT",
            "title": "New Merch Launch Project",
            "summary": "Custom creator hoodies drop",
            "content": "Designing limited edition apparel for fall release.",
            "importance": 0.85,
            "tags": ["merch", "revenue"],
        },
    )
    assert store_resp.status_code == 200
    res_data = store_resp.json()
    mem_id = res_data["memory_id"]
    assert res_data["type"] == "PROJECT"

    # 2. GET /api/memory_service/{id}
    get_resp = client.get(f"/api/memory_service/{mem_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["title"] == "New Merch Launch Project"

    # 3. POST /api/memory_service/search
    search_resp = client.post(
        "/api/memory_service/search",
        headers=TEST_CREATOR_HEADER,
        json={"query": "Merch Launch", "limit": 5},
    )
    assert search_resp.status_code == 200
    assert len(search_resp.json()) >= 1

    # 4. PATCH /api/memory_service
    patch_resp = client.patch(
        "/api/memory_service",
        json={"memory_id": mem_id, "importance": 0.95},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["version"] == 2

    # 5. POST /api/memory_service/consolidate
    cons_resp = client.post("/api/memory_service/consolidate", headers=TEST_CREATOR_HEADER)
    assert cons_resp.status_code == 200
    assert cons_resp.json()["consolidated_count"] >= 1

    # 6. GET /api/memory_service/history
    hist_resp = client.get("/api/memory_service/history")
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 1

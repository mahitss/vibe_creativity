"""Automated Pytest suite for OMNIA Context Builder."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.context_builder.domain import ContextBuildRequest, ContextIntent, TokenBudgetSize
from app.modules.context_builder.service import ContextBuilderEngine, ContextRanker

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_context_ranker_scoring() -> None:
    ranker = ContextRanker()

    items = [
        {"id": "i1", "relevance": 0.5, "recency": 0.5, "goal_alignment": 0.5, "confidence": 0.5},
        {"id": "i2", "relevance": 0.9, "recency": 0.9, "goal_alignment": 0.9, "confidence": 0.9},
    ]

    ranked = ranker.rank_items(items)
    assert ranked[0]["id"] == "i2"
    assert ranked[0]["score"] > ranked[1]["score"]


def test_context_builder_engine_budget_limits() -> None:
    engine = ContextBuilderEngine()

    req_small = ContextBuildRequest(
        intent=ContextIntent.PLANNING,
        workspace_id="ws-101",
        budget_size=TokenBudgetSize.SMALL,
    )
    pkg_small = engine.build_context_package(req_small)
    assert len(pkg_small.relevant_memories) == 1

    req_med = ContextBuildRequest(
        intent=ContextIntent.CONTENT_STRATEGY,
        workspace_id="ws-101",
        budget_size=TokenBudgetSize.MEDIUM,
    )
    pkg_med = engine.build_context_package(req_med)
    assert len(pkg_med.relevant_memories) == 2


def test_context_builder_api_endpoints() -> None:
    # 1. POST /api/runtime/context/build
    build_resp = client.post(
        "/api/runtime/context/build",
        headers=TEST_CREATOR_HEADER,
        json={
            "intent": "CONTENT_STRATEGY",
            "budget_size": "MEDIUM",
            "query_hint": "React Part 5 script",
        },
    )
    assert build_resp.status_code == 200
    pkg_data = build_resp.json()
    assert pkg_data["context_id"].startswith("ctx-")
    ctx_id = pkg_data["context_id"]

    # 2. GET /api/runtime/context/{ctx_id}
    get_resp = client.get(f"/api/runtime/context/{ctx_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["context_id"] == ctx_id

    # 3. GET /api/runtime/context/cache
    cache_resp = client.get("/api/runtime/context/cache")
    assert cache_resp.status_code == 200
    stats = cache_resp.json()
    assert stats["hits"] >= 1

    # 4. DELETE /api/runtime/context/cache
    del_resp = client.delete("/api/runtime/context/cache")
    assert del_resp.status_code == 200
    assert del_resp.json()["status"] == "SUCCESS"

"""Automated Pytest test suite for OMNIA Semantic Memory Search Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.search.domain import IntentCategory, MemoryType, SearchQuery, SearchType
from app.modules.search.service import IntentDetector, SemanticSearchEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-99"}


def test_intent_detection() -> None:
    intent1 = IntentDetector.detect("What did my audience ask last month?")
    assert intent1.category == IntentCategory.AUDIENCE_REQUEST
    assert intent1.suggested_hop_depth == 2

    intent2 = IntentDetector.detect("What promises have I not fulfilled?")
    assert intent2.category == IntentCategory.UNFULFILLED_PROMISE
    assert intent2.suggested_hop_depth == 3

    intent3 = IntentDetector.detect("Show every sponsor interaction with CloudCorp")
    assert intent3.category == IntentCategory.SPONSOR_INTERACTION
    assert intent3.suggested_hop_depth == 2


def test_semantic_search_ranking_and_expansion() -> None:
    engine = SemanticSearchEngine()
    query = SearchQuery(
        query_text="Docker multi-agent video retention",
        creator_id="creator-test-99",
        search_type=SearchType.HYBRID,
        hop_depth=3,
        limit=5,
    )
    results = engine.search(query)

    assert len(results) > 0
    top_result = results[0]
    assert top_result.rank_score > 0.5
    assert len(top_result.graph_neighbors) == 3
    assert top_result.graph_neighbors[0].hop_distance == 1
    assert top_result.graph_neighbors[2].hop_distance == 3


def test_context_package_builder() -> None:
    engine = SemanticSearchEngine()
    pkg = engine.get_context_package("creator-test-99", query_text="CloudCorp sponsor deals and partnerships")

    assert pkg.query == "CloudCorp sponsor deals and partnerships"
    assert pkg.intent.category == IntentCategory.SPONSOR_INTERACTION
    assert len(pkg.relevant_memories) > 0
    assert len(pkg.open_missions) > 0
    assert pkg.total_token_estimate > 0


def test_search_api_endpoints() -> None:
    # 1. Search endpoint
    response = client.post(
        "/api/memory/search",
        headers=TEST_CREATOR_HEADER,
        json={
            "query": "Show every sponsor interaction",
            "search_type": "HYBRID",
            "hop_depth": 2,
            "limit": 5,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["query"] == "Show every sponsor interaction"
    assert data["result_count"] > 0
    assert len(data["results"]) <= 5

    # 2. History endpoint
    hist_response = client.get("/api/memory/search/history", headers=TEST_CREATOR_HEADER)
    assert hist_response.status_code == 200
    hist_data = hist_response.json()
    assert len(hist_data) >= 1
    assert hist_data[0]["query_text"] == "Show every sponsor interaction"

    # 3. Suggestions endpoint
    sug_response = client.get("/api/memory/search/suggestions", headers=TEST_CREATOR_HEADER)
    assert sug_response.status_code == 200
    sug_data = sug_response.json()
    assert "What promises have I not fulfilled?" in sug_data

    # 4. Context Package endpoint
    ctx_response = client.get(
        "/api/memory/context?query=Docker+tutorial+requests",
        headers=TEST_CREATOR_HEADER,
    )
    assert ctx_response.status_code == 200
    ctx_data = ctx_response.json()
    assert ctx_data["intent"]["category"] == "AUDIENCE_REQUEST"
    assert len(ctx_data["relevant_memories"]) > 0

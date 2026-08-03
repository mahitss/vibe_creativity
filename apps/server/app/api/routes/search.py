"""FastAPI routes for OMNIA Semantic Memory Search Engine."""

from typing import Any

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.search.domain import MemoryType, SearchQuery, SearchType
from app.modules.search.service import SemanticSearchEngine

router = APIRouter(prefix="/memory", tags=["search"])

_search_engine = SemanticSearchEngine()


def get_search_engine() -> SemanticSearchEngine:
    return _search_engine


class SearchRequestPayload(BaseModel):
    query: str = Field(..., description="Natural language or keyword query string")
    search_type: SearchType = Field(default=SearchType.HYBRID, description="Search mode strategy")
    memory_types: list[MemoryType] = Field(default_factory=list, description="Target memory types filter")
    min_importance: float = Field(default=0.0, ge=0.0, le=1.0, description="Minimum importance threshold")
    hop_depth: int = Field(default=1, ge=1, le=3, description="Knowledge graph expansion hop depth")
    limit: int = Field(default=10, ge=1, le=50, description="Max results limit")


def _format_result_item(item: Any) -> dict[str, Any]:
    return {
        "id": item.id,
        "title": item.title,
        "summary": item.summary,
        "memory_type": item.memory_type.value,
        "confidence": item.confidence,
        "importance": item.importance,
        "source": item.source,
        "rank_score": item.rank_score,
        "timestamp": item.timestamp.isoformat(),
        "decay_score": item.decay_score,
        "business_impact": item.business_impact,
        "related_memories": item.related_memories,
        "related_projects": item.related_projects,
        "related_goals": item.related_goals,
        "timeline_position": item.timeline_position,
        "graph_neighbors": [
            {
                "node_id": g.node_id,
                "label": g.label,
                "node_type": g.node_type,
                "relationship": g.relationship,
                "hop_distance": g.hop_distance,
            }
            for g in item.graph_neighbors
        ],
    }


@router.post("/search")
async def search_memories(
    payload: SearchRequestPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: SemanticSearchEngine = Depends(get_search_engine),
) -> dict[str, Any]:
    query_obj = SearchQuery(
        query_text=payload.query,
        creator_id=context.creator_id,
        search_type=payload.search_type,
        memory_types=payload.memory_types,
        min_importance=payload.min_importance,
        hop_depth=payload.hop_depth,
        limit=payload.limit,
    )
    results = engine.search(query_obj)
    return {
        "query": payload.query,
        "creator_id": context.creator_id,
        "result_count": len(results),
        "results": [_format_result_item(r) for r in results],
    }


@router.get("/search/history")
async def get_search_history(
    context: CreatorContext = Depends(require_creator_context),
    engine: SemanticSearchEngine = Depends(get_search_engine),
) -> list[dict[str, Any]]:
    history = engine.get_search_history(context.creator_id)
    return [
        {
            "id": str(h.id),
            "query_text": h.query_text,
            "search_type": h.search_type.value,
            "result_count": h.result_count,
            "timestamp": h.timestamp.isoformat(),
        }
        for h in history
    ]


@router.get("/search/suggestions")
async def get_search_suggestions(
    engine: SemanticSearchEngine = Depends(get_search_engine),
) -> list[str]:
    return engine.get_suggestions()


@router.get("/context")
async def get_memory_context(
    query: str = Query(default="Docker tutorial requests"),
    context: CreatorContext = Depends(require_creator_context),
    engine: SemanticSearchEngine = Depends(get_search_engine),
) -> dict[str, Any]:
    pkg = engine.get_context_package(context.creator_id, query_text=query)
    return {
        "query": pkg.query,
        "creator_id": pkg.creator_id,
        "timestamp": pkg.timestamp.isoformat(),
        "intent": {
            "category": pkg.intent.category.value,
            "confidence": pkg.intent.confidence,
            "extracted_keywords": pkg.intent.extracted_keywords,
            "suggested_hop_depth": pkg.intent.suggested_hop_depth,
        },
        "relevant_memories": [_format_result_item(m) for m in pkg.relevant_memories],
        "related_goals": pkg.related_goals,
        "timeline_events": pkg.timeline_events,
        "graph_neighbors": [
            {
                "node_id": g.node_id,
                "label": g.label,
                "node_type": g.node_type,
                "relationship": g.relationship,
                "hop_distance": g.hop_distance,
            }
            for g in pkg.graph_neighbors
        ],
        "open_missions": pkg.open_missions,
        "previous_recommendations": pkg.previous_recommendations,
        "total_token_estimate": pkg.total_token_estimate,
    }

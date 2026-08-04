"""FastAPI routes for OMNIA Creator Knowledge Universe."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.security import CreatorContext, require_creator_context
from app.modules.universe.service import KnowledgeUniverseEngine

router = APIRouter(prefix="/universe", tags=["universe"])

_universe_engine = KnowledgeUniverseEngine()


def get_universe_engine() -> KnowledgeUniverseEngine:
    return _universe_engine


@router.get("")
async def get_universe(
    context: CreatorContext = Depends(require_creator_context),
    engine: KnowledgeUniverseEngine = Depends(get_universe_engine),
) -> dict[str, Any]:
    return engine.get_universe(context.creator_id)


@router.get("/insights")
async def get_universe_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: KnowledgeUniverseEngine = Depends(get_universe_engine),
) -> dict[str, Any]:
    insights = engine.generate_insights(context.creator_id)
    return {
        "most_influential_entity": insights.most_influential_entity,
        "fastest_growing_topic": insights.fastest_growing_topic,
        "weakest_relationship": insights.weakest_relationship,
        "hidden_opportunity": insights.hidden_opportunity,
        "knowledge_gaps": insights.knowledge_gaps,
        "unused_assets": insights.unused_assets,
        "timestamp": insights.timestamp.isoformat(),
    }


@router.get("/path")
async def trace_universe_path(
    source_id: str = Query(default="ent-agent-course"),
    target_id: str = Query(default="ent-discord-community"),
    context: CreatorContext = Depends(require_creator_context),
    engine: KnowledgeUniverseEngine = Depends(get_universe_engine),
) -> dict[str, Any]:
    path_res = engine.trace_path(source_id, target_id)
    return {
        "source_id": path_res.source_id,
        "target_id": path_res.target_id,
        "hop_count": path_res.hop_count,
        "total_strength": path_res.total_strength,
        "nodes": [
            {
                "id": n.id,
                "title": n.title,
                "entity_type": n.entity_type.value,
                "importance": n.importance,
            }
            for n in path_res.nodes
        ],
        "edges": [
            {
                "id": e.id,
                "source": e.source_id,
                "target": e.target_id,
                "relationship_type": e.relationship_type.value,
                "strength": e.strength,
            }
            for e in path_res.edges
        ],
    }


@router.get("/entity/{entity_id}")
async def get_entity_detail(
    entity_id: str,
    context: CreatorContext = Depends(require_creator_context),
    engine: KnowledgeUniverseEngine = Depends(get_universe_engine),
) -> dict[str, Any]:
    detail = engine.get_entity_detail(entity_id)
    if not detail:
        raise HTTPException(status_code=404, detail=f"Entity {entity_id} not found in Knowledge Universe")
    return detail

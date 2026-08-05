"""FastAPI route handlers for OMNIA Context Builder."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.context_builder.domain import ContextBuildRequest, ContextIntent, TokenBudgetSize
from app.modules.context_builder.service import ContextBuilderEngine

router = APIRouter(tags=["context"])

_context_engine = ContextBuilderEngine()


def get_context_engine() -> ContextBuilderEngine:
    return _context_engine


class BuildContextPayload(BaseModel):
    intent: ContextIntent = Field(default=ContextIntent.PLANNING, description="Intent for context building")
    budget_size: TokenBudgetSize = Field(default=TokenBudgetSize.MEDIUM, description="Token budget size")
    query_hint: str = Field(default="", description="Optional search query hint")


def _format_package(pkg: Any) -> dict[str, Any]:
    return {
        "context_id": pkg.context_id,
        "workspace_id": pkg.workspace_id,
        "mind_id": pkg.mind_id,
        "current_user": pkg.current_user,
        "current_goals": pkg.current_goals,
        "active_missions": pkg.active_missions,
        "relevant_memories": pkg.relevant_memories,
        "recent_events": pkg.recent_events,
        "knowledge_graph_neighbors": pkg.knowledge_graph_neighbors,
        "community_signals": pkg.community_signals,
        "sponsor_signals": pkg.sponsor_signals,
        "analytics_summary": pkg.analytics_summary,
        "open_workflows": pkg.open_workflows,
        "platform_connections": pkg.platform_connections,
        "current_time": pkg.current_time.isoformat(),
        "timezone": pkg.timezone,
    }


@router.post("/runtime/context/build")
async def build_context_package(
    payload: BuildContextPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ContextBuilderEngine = Depends(get_context_engine),
) -> dict[str, Any]:
    req = ContextBuildRequest(
        intent=payload.intent,
        workspace_id=context.creator_id,
        creator_id=context.creator_id,
        budget_size=payload.budget_size,
        query_hint=payload.query_hint,
    )
    pkg = engine.build_context_package(req)
    return _format_package(pkg)


@router.get("/runtime/context/cache")
async def get_context_cache_stats(
    engine: ContextBuilderEngine = Depends(get_context_engine),
) -> dict[str, Any]:
    return engine.get_cache_stats()


@router.delete("/runtime/context/cache")
async def clear_context_cache(
    engine: ContextBuilderEngine = Depends(get_context_engine),
) -> dict[str, Any]:
    engine.clear_cache()
    return {"status": "SUCCESS", "message": "Context cache cleared."}


@router.get("/runtime/context/{context_id}")
async def get_cached_context_package(
    context_id: str,
    engine: ContextBuilderEngine = Depends(get_context_engine),
) -> dict[str, Any]:
    pkg = engine.get_cached_package(context_id)
    if not pkg:
        raise HTTPException(status_code=404, detail=f"Context package {context_id} not found in cache")
    return _format_package(pkg)

"""FastAPI route handlers for OMNIA Persistent Memory Service."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.memory_service.domain import (
    ConsolidationReport,
    MemoryRow,
    MemorySearchResult,
    MemoryType,
)
from app.modules.memory_service.service import PersistentMemoryService

router = APIRouter(prefix="/memory_service", tags=["memory_service"])

_memory_service = PersistentMemoryService()


def get_memory_service() -> PersistentMemoryService:
    return _memory_service


class StoreMemoryPayload(BaseModel):
    memory_type: MemoryType = Field(..., description="Category memory type")
    title: str = Field(..., description="Title of memory item")
    summary: str = Field(..., description="Short summary of memory item")
    content: str = Field(..., description="Full content of memory item")
    importance: float = Field(default=0.80, ge=0.0, le=1.0, description="Importance score")
    confidence: float = Field(default=0.90, ge=0.0, le=1.0, description="Confidence score")
    relationships: list[str] = Field(default_factory=list, description="Linked entity IDs")
    tags: list[str] = Field(default_factory=list, description="Categorization tags")


class SearchMemoryPayload(BaseModel):
    query: str = Field(default="", description="Semantic query text")
    memory_type: MemoryType | None = Field(default=None, description="Optional memory type filter")
    limit: int = Field(default=10, ge=1, le=100, description="Maximum results to return")


class UpdateMemoryPayload(BaseModel):
    memory_id: str = Field(..., description="Memory ID to update")
    title: str | None = Field(default=None, description="New title")
    summary: str | None = Field(default=None, description="New summary")
    content: str | None = Field(default=None, description="New content")
    importance: float | None = Field(default=None, ge=0.0, le=1.0, description="New importance score")


def _format_memory(m: MemoryRow) -> dict[str, Any]:
    return {
        "memory_id": m.memory_id,
        "workspace_id": m.workspace_id,
        "mind_id": m.mind_id,
        "type": m.type.value,
        "title": m.title,
        "summary": m.summary,
        "content": m.content,
        "source": m.source,
        "importance": m.importance,
        "confidence": m.confidence,
        "version": m.version,
        "access_count": m.access_count,
        "relationships": m.relationships,
        "tags": m.tags,
        "stage": m.stage.value,
        "created_at": m.created_at.isoformat(),
        "updated_at": m.updated_at.isoformat(),
        "last_accessed": m.last_accessed.isoformat(),
    }


def _format_search_result(r: MemorySearchResult) -> dict[str, Any]:
    return {
        "memory": _format_memory(r.memory),
        "relevance_score": r.relevance_score,
        "ranking_signals": r.ranking_signals,
    }


def _format_consolidation(c: ConsolidationReport) -> dict[str, Any]:
    return {
        "consolidated_count": c.consolidated_count,
        "archived_count": c.archived_count,
        "merged_count": c.merged_count,
        "confidence_boosts": c.confidence_boosts,
        "timestamp": c.timestamp.isoformat(),
    }


@router.post("")
async def store_memory(
    payload: StoreMemoryPayload,
    context: CreatorContext = Depends(require_creator_context),
    service: PersistentMemoryService = Depends(get_memory_service),
) -> dict[str, Any]:
    row = service.store_memory(
        workspace_id=context.creator_id,
        memory_type=payload.memory_type,
        title=payload.title,
        summary=payload.summary,
        content=payload.content,
        importance=payload.importance,
        confidence=payload.confidence,
        relationships=payload.relationships,
        tags=payload.tags,
    )
    return _format_memory(row)


@router.post("/search")
async def search_memories(
    payload: SearchMemoryPayload,
    context: CreatorContext = Depends(require_creator_context),
    service: PersistentMemoryService = Depends(get_memory_service),
) -> list[dict[str, Any]]:
    results = service.search_memories(
        workspace_id=context.creator_id,
        query=payload.query,
        memory_type=payload.memory_type,
        limit=payload.limit,
    )
    return [_format_search_result(r) for r in results]


@router.post("/consolidate")
async def consolidate_memories(
    context: CreatorContext = Depends(require_creator_context),
    service: PersistentMemoryService = Depends(get_memory_service),
) -> dict[str, Any]:
    report = service.consolidate_memories(workspace_id=context.creator_id)
    return _format_consolidation(report)


@router.get("/history")
async def get_memory_history(
    limit: int = 50,
    service: PersistentMemoryService = Depends(get_memory_service),
) -> list[dict[str, Any]]:
    return service.get_history(limit=limit)


@router.get("/{memory_id}")
async def get_memory(
    memory_id: str,
    service: PersistentMemoryService = Depends(get_memory_service),
) -> dict[str, Any]:
    try:
        row = service.get_memory(memory_id)
        return _format_memory(row)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("")
async def update_memory(
    payload: UpdateMemoryPayload,
    service: PersistentMemoryService = Depends(get_memory_service),
) -> dict[str, Any]:
    try:
        row = service.update_memory(
            memory_id=payload.memory_id,
            title=payload.title,
            summary=payload.summary,
            content=payload.content,
            importance=payload.importance,
        )
        return _format_memory(row)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

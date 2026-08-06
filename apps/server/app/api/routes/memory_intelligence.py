"""FastAPI route handlers for OMNIA Memory Intelligence System."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.memory_intelligence.domain import (
    KnowledgeObject,
    KnowledgeSnapshot,
)
from app.modules.memory_intelligence.service import MemoryIntelligenceEngine

router = APIRouter(prefix="/knowledge", tags=["knowledge"])

_memory_intel_engine = MemoryIntelligenceEngine()


def get_memory_intel_engine() -> MemoryIntelligenceEngine:
    return _memory_intel_engine


class EvolveMemoryPayload(BaseModel):
    memory_ids: list[str] = Field(..., description="List of raw memory IDs to evolve into knowledge")


def _format_knowledge(k: KnowledgeObject) -> dict[str, Any]:
    return {
        "knowledge_id": k.knowledge_id,
        "workspace_id": k.workspace_id,
        "stage": k.stage.value,
        "title": k.title,
        "source_memories": k.source_memories,
        "confidence": k.confidence,
        "evidence": k.evidence,
        "supporting_events": k.supporting_events,
        "related_goals": k.related_goals,
        "business_impact": k.business_impact,
        "quality_score": k.quality_score,
        "created_at": k.created_at.isoformat(),
        "updated_at": k.updated_at.isoformat(),
    }


def _format_snapshot(s: KnowledgeSnapshot) -> dict[str, Any]:
    return {
        "snapshot_id": s.snapshot_id,
        "workspace_id": s.workspace_id,
        "period_type": s.period_type,
        "total_knowledge_nodes": s.total_knowledge_nodes,
        "top_insights": s.top_insights,
        "generated_at": s.generated_at.isoformat(),
    }


@router.get("")
async def list_knowledge(
    context: CreatorContext = Depends(require_creator_context),
    engine: MemoryIntelligenceEngine = Depends(get_memory_intel_engine),
) -> list[dict[str, Any]]:
    nodes = engine.get_knowledge(workspace_id=context.creator_id)
    return [_format_knowledge(k) for k in nodes]


@router.get("/insights")
async def get_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: MemoryIntelligenceEngine = Depends(get_memory_intel_engine),
) -> list[dict[str, Any]]:
    return engine.get_insights(workspace_id=context.creator_id)


@router.get("/snapshots")
async def list_snapshots(
    context: CreatorContext = Depends(require_creator_context),
    engine: MemoryIntelligenceEngine = Depends(get_memory_intel_engine),
) -> list[dict[str, Any]]:
    snapshots = engine.get_snapshots(workspace_id=context.creator_id)
    return [_format_snapshot(s) for s in snapshots]


@router.post("/evolve")
async def evolve_memories(
    payload: EvolveMemoryPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: MemoryIntelligenceEngine = Depends(get_memory_intel_engine),
) -> dict[str, Any]:
    k = engine.evolve_memories(workspace_id=context.creator_id, memory_ids=payload.memory_ids)
    return _format_knowledge(k)

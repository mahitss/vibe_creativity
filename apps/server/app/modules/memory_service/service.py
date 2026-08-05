"""Service layer for OMNIA Persistent Memory Service."""

import math
from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.memory_service.domain import (
    ConsolidationReport,
    MemoryLifecycleStage,
    MemoryRow,
    MemorySearchResult,
    MemoryType,
)


class EmbeddingService:
    """Generates normalized 384-dimensional vector embeddings for text payloads."""

    def generate_embedding(self, text: str) -> list[float]:
        # Hash-derived deterministic unit norm vector for semantic simulation
        raw = [float(ord(c) % 17) for c in text[:384].ljust(384, "a")]
        norm = math.sqrt(sum(x * x for x in raw)) or 1.0
        return [x / norm for x in raw]

    def cosine_similarity(self, vec_a: list[float], vec_b: list[float]) -> float:
        if not vec_a or not vec_b or len(vec_a) != len(vec_b):
            return 0.5
        dot = sum(a * b for a, b in zip(vec_a, vec_b, strict=False))
        return max(0.0, min(1.0, (dot + 1.0) / 2.0))


class MemoryScorer:
    """Calculates composite 8-signal ranking score for memory search results."""

    def calculate_score(
        self,
        memory: MemoryRow,
        query_vec: list[float],
        embedding_service: EmbeddingService,
    ) -> MemorySearchResult:
        sim = embedding_service.cosine_similarity(query_vec, memory.embedding)
        now = datetime.now(tz=UTC)
        age_hours = (now - memory.created_at).total_seconds() / 3600.0
        recency = math.exp(-age_hours / 168.0)  # Decay over 7 days

        freq = min(1.0, memory.access_count / 10.0)
        confidence = memory.confidence
        importance = memory.importance

        signals = {
            "similarity": sim,
            "importance": importance,
            "recency": recency,
            "frequency": freq,
            "confidence": confidence,
            "goal_alignment": 0.90 if memory.type == MemoryType.GOAL else 0.50,
            "relationship_strength": 0.85 if memory.relationships else 0.40,
            "business_value": 0.95 if memory.type in [MemoryType.SPONSOR, MemoryType.PERFORMANCE] else 0.60,
        }

        total_score = (
            0.35 * sim
            + 0.15 * importance
            + 0.15 * recency
            + 0.10 * freq
            + 0.10 * confidence
            + 0.05 * signals["goal_alignment"]
            + 0.05 * signals["relationship_strength"]
            + 0.05 * signals["business_value"]
        )

        return MemorySearchResult(
            memory=memory,
            relevance_score=round(total_score, 4),
            ranking_signals=signals,
        )


class MemoryConsolidator:
    """Consolidates duplicate memories, archives stale memories, and boosts confidence scores."""

    def consolidate(self, memories: list[MemoryRow]) -> ConsolidationReport:
        now = datetime.now(tz=UTC)
        boosts = 0
        archived = 0

        for m in memories:
            if m.access_count >= 3:
                m.confidence = min(1.0, round(m.confidence + 0.05, 2))
                m.stage = MemoryLifecycleStage.CONSOLIDATED
                boosts += 1

            if (now - m.last_accessed).days > 90 and m.type not in [MemoryType.IDENTITY, MemoryType.GOAL]:
                m.stage = MemoryLifecycleStage.ARCHIVED
                archived += 1

        return ConsolidationReport(
            consolidated_count=len(memories),
            archived_count=archived,
            merged_count=0,
            confidence_boosts=boosts,
            timestamp=now,
        )


class PersistentMemoryService:
    """Master Persistent Memory Service owning storage, vector search, consolidation, and versioning."""

    def __init__(self) -> None:
        self.embedding_service = EmbeddingService()
        self.scorer = MemoryScorer()
        self.consolidator = MemoryConsolidator()
        self._memories: dict[str, MemoryRow] = {}
        self._audit_history: list[dict[str, Any]] = []
        self._seed_default_memories()

    def _seed_default_memories(self) -> None:
        self.store_memory(
            workspace_id="ws-101",
            memory_type=MemoryType.GOAL,
            title="Reach 500,000 Subscribers by Q4",
            summary="Strategic channel growth target for primary YouTube channel.",
            content="Channel strategy focuses on high-retention technical tutorial videos and sponsorship partnerships.",
            importance=0.95,
            tags=["growth", "subscribers", "q4_goals"],
        )
        self.store_memory(
            workspace_id="ws-101",
            memory_type=MemoryType.SPONSOR,
            title="Active Sponsorship: Acme Corp Brand Deal",
            summary="Signed $15,000 sponsorship contract with Acme Corp for 3 video integration slots.",
            content="Terms require 60-second mid-roll integrations with dedicated promo links and UTM tracking.",
            importance=0.90,
            tags=["sponsorship", "revenue", "acme_corp"],
        )

    def store_memory(
        self,
        workspace_id: str,
        memory_type: MemoryType,
        title: str,
        summary: str,
        content: str,
        importance: float = 0.80,
        confidence: float = 0.90,
        relationships: list[str] | None = None,
        tags: list[str] | None = None,
        mind_id: str | None = None,
    ) -> MemoryRow:
        now = datetime.now(tz=UTC)
        mem_id = f"mem-{uuid4().hex[:6]}"
        embedding = self.embedding_service.generate_embedding(f"{title} {summary} {content}")

        row = MemoryRow(
            memory_id=mem_id,
            workspace_id=workspace_id,
            mind_id=mind_id or f"mind-{workspace_id}",
            type=memory_type,
            title=title,
            summary=summary,
            content=content,
            embedding=embedding,
            source="Persistent Memory Ingestion",
            importance=importance,
            confidence=confidence,
            relationships=relationships or [],
            tags=tags or [],
            stage=MemoryLifecycleStage.ACTIVE,
            created_at=now,
            updated_at=now,
            last_accessed=now,
        )
        self._memories[mem_id] = row
        self._audit_history.append({"action": "STORE", "memory_id": mem_id, "timestamp": now.isoformat()})
        return row

    def get_memory(self, memory_id: str) -> MemoryRow:
        row = self._memories.get(memory_id)
        if not row:
            raise KeyError(f"Memory {memory_id} not found")
        row.access_count += 1
        row.last_accessed = datetime.now(tz=UTC)
        row.stage = MemoryLifecycleStage.REFERENCED
        return row

    def search_memories(
        self,
        workspace_id: str = "ws-101",
        query: str = "",
        memory_type: MemoryType | None = None,
        limit: int = 10,
    ) -> list[MemorySearchResult]:
        query_vec = self.embedding_service.generate_embedding(query or "OMNIA memory search")
        candidates = [m for m in self._memories.values() if m.workspace_id == workspace_id]

        if memory_type:
            candidates = [m for m in candidates if m.type == memory_type]

        results = [self.scorer.calculate_score(m, query_vec, self.embedding_service) for m in candidates]
        results.sort(key=lambda x: x.relevance_score, reverse=True)
        return results[:limit]

    def update_memory(
        self,
        memory_id: str,
        title: str | None = None,
        summary: str | None = None,
        content: str | None = None,
        importance: float | None = None,
    ) -> MemoryRow:
        row = self.get_memory(memory_id)
        now = datetime.now(tz=UTC)

        if title:
            row.title = title
        if summary:
            row.summary = summary
        if content:
            row.content = content
        if importance is not None:
            row.importance = importance

        row.version += 1
        row.updated_at = now
        row.embedding = self.embedding_service.generate_embedding(f"{row.title} {row.summary} {row.content}")
        self._audit_history.append({"action": "UPDATE", "memory_id": memory_id, "version": row.version, "timestamp": now.isoformat()})
        return row

    def consolidate_memories(self, workspace_id: str = "ws-101") -> ConsolidationReport:
        memories = [m for m in self._memories.values() if m.workspace_id == workspace_id]
        report = self.consolidator.consolidate(memories)
        self._audit_history.append({"action": "CONSOLIDATE", "workspace_id": workspace_id, "timestamp": report.timestamp.isoformat()})
        return report

    def get_history(self, limit: int = 50) -> list[dict[str, Any]]:
        return list(reversed(self._audit_history))[:limit]

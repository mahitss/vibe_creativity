"""Service layer for OMNIA Context Builder."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.context_builder.domain import (
    ContextBuildRequest,
    ContextPackage,
    TokenBudgetSize,
)


class ContextRanker:
    """Ranks memories and signals by relevance, recency, goal alignment, and confidence."""

    def rank_items(self, items: list[dict[str, Any]]) -> list[dict[str, Any]]:
        for item in items:
            rel = item.get("relevance", 0.8)
            rec = item.get("recency", 0.9)
            align = item.get("goal_alignment", 0.85)
            conf = item.get("confidence", 0.9)

            score = round(0.35 * rel + 0.25 * rec + 0.25 * align + 0.15 * conf, 3)
            item["score"] = score

        items.sort(key=lambda x: x["score"], reverse=True)
        return items


class ContextCacheManager:
    """Manages short-term context cache and hit rate statistics."""

    def __init__(self) -> None:
        self._cache: dict[str, ContextPackage] = {}
        self._hits = 0
        self._misses = 0

    def get(self, context_id: str) -> ContextPackage | None:
        pkg = self._cache.get(context_id)
        if pkg:
            self._hits += 1
            return pkg
        self._misses += 1
        return None

    def set(self, pkg: ContextPackage) -> None:
        self._cache[pkg.context_id] = pkg

    def clear(self) -> None:
        self._cache.clear()
        self._hits = 0
        self._misses = 0

    def stats(self) -> dict[str, Any]:
        total = self._hits + self._misses
        hit_rate = round(self._hits / total, 3) if total > 0 else 0.0
        return {
            "cached_packages_count": len(self._cache),
            "hits": self._hits,
            "misses": self._misses,
            "hit_rate": hit_rate,
        }


class ContextBuilderEngine:
    """Master Context Builder Service assembling grounded Context Packages for AI reasoning."""

    def __init__(self) -> None:
        self.ranker = ContextRanker()
        self.cache = ContextCacheManager()

    def build_context_package(self, request: ContextBuildRequest) -> ContextPackage:
        now = datetime.now(tz=UTC)
        context_id = f"ctx-{uuid4().hex[:6]}"

        raw_memories = [
            {
                "id": "mem-react5-demand",
                "content": "Audience strongly requested React Part 5 state management tutorial.",
                "relevance": 0.95,
                "recency": 0.9,
                "goal_alignment": 0.9,
                "confidence": 0.95,
            },
            {
                "id": "mem-sponsor-cloudcorp",
                "content": "CloudCorp $15,000 Title Read offer waiting for creator approval.",
                "relevance": 0.88,
                "recency": 0.95,
                "goal_alignment": 0.92,
                "confidence": 0.9,
            },
            {
                "id": "mem-docker-requests",
                "content": "60 comments requesting Docker Masterclass series.",
                "relevance": 0.75,
                "recency": 0.8,
                "goal_alignment": 0.8,
                "confidence": 0.85,
            },
        ]

        ranked_memories = self.ranker.rank_items(raw_memories)

        # Truncate based on token budget
        limit = 3
        if request.budget_size == TokenBudgetSize.SMALL:
            limit = 1
        elif request.budget_size == TokenBudgetSize.MEDIUM:
            limit = 2

        memories = ranked_memories[:limit]

        pkg = ContextPackage(
            context_id=context_id,
            workspace_id=request.workspace_id,
            mind_id=f"mind-{request.workspace_id}",
            current_user=f"Creator {request.creator_id}",
            current_goals=[
                "Reach 100K YouTube Subscribers",
                "Secure $15,000 CloudCorp Title Sponsorship",
            ],
            active_missions=["Record & Publish React Series Part 5"],
            relevant_memories=memories,
            recent_events=["CommentReceived", "MissionCreated", "SponsorOpportunityDetected"],
            knowledge_graph_neighbors=["React Series", "State Management", "CloudCorp", "Docker"],
            community_signals=[
                "142 comments requesting React Part 5",
                "60 requests for Docker Masterclass",
            ],
            sponsor_signals=["CloudCorp $15,000 Title Read (Pending Approval)"],
            analytics_summary={
                "avg_watch_time": "11m42s",
                "retention_rate": "64.2%",
                "monthly_growth": "+14.2%",
            },
            open_workflows=["Launch YouTube Series", "Run Sponsor Campaign"],
            platform_connections=["YouTube", "Discord", "X / Twitter"],
            current_time=now,
            timezone="UTC",
        )

        self.cache.set(pkg)
        return pkg

    def get_cached_package(self, context_id: str) -> ContextPackage | None:
        return self.cache.get(context_id)

    def get_cache_stats(self) -> dict[str, Any]:
        return self.cache.stats()

    def clear_cache(self) -> None:
        self.cache.clear()

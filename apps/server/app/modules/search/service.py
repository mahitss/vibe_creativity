"""Service layer for OMNIA Semantic Memory Search Engine."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.search.domain import (
    GraphHopNeighbor,
    IntentCategory,
    MemoryType,
    SearchContextPackage,
    SearchHistoryItem,
    SearchIntent,
    SearchQuery,
    SearchResultItem,
)


class IntentDetector:
    """Detects search intent and extracts semantic targets from query text."""

    @staticmethod
    def detect(query: str) -> SearchIntent:
        q_lower = query.lower()

        if any(w in q_lower for w in ["promise", "unfulfilled", "pending", "commit"]):
            return SearchIntent(
                category=IntentCategory.UNFULFILLED_PROMISE,
                confidence=0.92,
                extracted_keywords=["promise", "mission", "goal", "open_action"],
                suggested_hop_depth=3,
                target_memory_types=[MemoryType.MISSION, MemoryType.PROJECT, MemoryType.REFLECTION],
            )
        if any(w in q_lower for w in ["sponsor", "partnership", "cloudcorp", "deal", "contract"]):
            return SearchIntent(
                category=IntentCategory.SPONSOR_INTERACTION,
                confidence=0.96,
                extracted_keywords=["sponsor", "cloudcorp", "contract", "revenue"],
                suggested_hop_depth=2,
                target_memory_types=[MemoryType.RELATIONSHIP, MemoryType.PERFORMANCE],
            )
        if any(w in q_lower for w in ["ask", "audience", "community", "comment", "request"]):
            return SearchIntent(
                category=IntentCategory.AUDIENCE_REQUEST,
                confidence=0.94,
                extracted_keywords=["audience", "community", "discord", "youtube_comments"],
                suggested_hop_depth=2,
                target_memory_types=[MemoryType.COMMUNITY, MemoryType.EPISODE],
            )
        if any(w in q_lower for w in ["perform", "best", "view", "retention", "analytics", "ctr"]):
            return SearchIntent(
                category=IntentCategory.PERFORMANCE_BENCHMARK,
                confidence=0.95,
                extracted_keywords=["views", "retention", "benchmark", "watch_time"],
                suggested_hop_depth=1,
                target_memory_types=[MemoryType.PERFORMANCE, MemoryType.EPISODE],
            )
        if any(w in q_lower for w in ["goal", "block", "stuck", "milestone"]):
            return SearchIntent(
                category=IntentCategory.BLOCKED_GOALS,
                confidence=0.91,
                extracted_keywords=["goal", "blocked", "milestone", "revenue_target"],
                suggested_hop_depth=2,
                target_memory_types=[MemoryType.PROJECT, MemoryType.MISSION],
            )
        if any(w in q_lower for w in ["react", "docker", "python", "code", "course", "tutorial"]):
            return SearchIntent(
                category=IntentCategory.CONTENT_TOPIC,
                confidence=0.88,
                extracted_keywords=["docker", "react", "tutorial", "code_repo"],
                suggested_hop_depth=1,
                target_memory_types=[MemoryType.PROJECT, MemoryType.EPISODE],
            )

        return SearchIntent(
            category=IntentCategory.GENERAL_RECALL,
            confidence=0.85,
            extracted_keywords=[w for w in q_lower.split() if len(w) > 3],
            suggested_hop_depth=1,
            target_memory_types=[MemoryType.IDENTITY, MemoryType.REFLECTION],
        )


class SemanticSearchEngine:
    """Core Semantic Memory Search Engine with 9-factor ranking & graph expansion."""

    def __init__(self) -> None:
        self._history: list[SearchHistoryItem] = []
        self._seed_memories = self._build_knowledge_base()

    def _build_knowledge_base(self) -> list[dict[str, Any]]:
        now = datetime.now(tz=UTC)
        return [
            {
                "id": "mem-101",
                "title": "Community Signal: Docker Tutorial Request Cluster",
                "summary": "14 repeated Discord comments & 42 video likes requested a step-by-step Docker multi-agent walkthrough.",
                "memory_type": MemoryType.COMMUNITY,
                "confidence": 0.95,
                "importance": 0.92,
                "source": "YouTube Intelligence / Discord",
                "timestamp": now - timedelta(days=2),
                "decay_score": 0.98,
                "business_impact": "HIGH",
                "related_memories": ["mem-102", "mem-104"],
                "related_projects": ["proj-docker-course"],
                "related_goals": ["goal-q3-revenue"],
                "timeline_position": 1,
            },
            {
                "id": "mem-102",
                "title": "CloudCorp Title Sponsorship Agreement",
                "summary": "Signed CloudCorp sponsorship ($15,000) with placement commitment in Docker multi-agent series.",
                "memory_type": MemoryType.RELATIONSHIP,
                "confidence": 0.98,
                "importance": 0.96,
                "source": "Sponsor Agent / Email Sync",
                "timestamp": now - timedelta(days=5),
                "decay_score": 0.95,
                "business_impact": "HIGH",
                "related_memories": ["mem-101", "mem-103"],
                "related_projects": ["proj-docker-course"],
                "related_goals": ["goal-q3-revenue"],
                "timeline_position": 2,
            },
            {
                "id": "mem-103",
                "title": "Unfulfilled Promise: Weekly Student Q&A Newsletter",
                "summary": "Promised 500 course students a weekly Q&A digest summarizing community architecture questions.",
                "memory_type": MemoryType.MISSION,
                "confidence": 0.89,
                "importance": 0.85,
                "source": "Executive Minds Agent / Course Portal",
                "timestamp": now - timedelta(days=12),
                "decay_score": 0.88,
                "business_impact": "MEDIUM",
                "related_memories": ["mem-101"],
                "related_projects": ["proj-docker-course"],
                "related_goals": ["goal-audience-retention"],
                "timeline_position": 3,
            },
            {
                "id": "mem-104",
                "title": "Performance Benchmark: Docker Video +18% Retention",
                "summary": "Docker Multi-Agent System Deep Dive video reached 18,400 views with +18% retention over channel average.",
                "memory_type": MemoryType.PERFORMANCE,
                "confidence": 0.97,
                "importance": 0.94,
                "source": "YouTube Intelligence",
                "timestamp": now - timedelta(days=1),
                "decay_score": 0.99,
                "business_impact": "HIGH",
                "related_memories": ["mem-101", "mem-102"],
                "related_projects": ["proj-docker-course"],
                "related_goals": ["goal-q3-revenue"],
                "timeline_position": 4,
            },
            {
                "id": "mem-105",
                "title": "Blocked Goal: Sponsorship Tier Upgrade Negotiations",
                "summary": "Q4 tier upgrade negotiations with CloudCorp blocked pending Q3 view benchmark audit.",
                "memory_type": MemoryType.PROJECT,
                "confidence": 0.91,
                "importance": 0.88,
                "source": "Sponsor Agent",
                "timestamp": now - timedelta(days=3),
                "decay_score": 0.96,
                "business_impact": "HIGH",
                "related_memories": ["mem-102"],
                "related_projects": ["proj-sponsor-q4"],
                "related_goals": ["goal-q3-revenue"],
                "timeline_position": 5,
            },
        ]

    def _compute_similarity(self, query: str, text: str) -> float:
        q_words = set(query.lower().split())
        t_words = set(text.lower().split())
        if not q_words or not t_words:
            return 0.5
        intersection = len(q_words.intersection(t_words))
        union = len(q_words.union(t_words))
        jaccard = intersection / union if union > 0 else 0.0
        # Boost if key terms match
        boost = 0.4 if any(w in text.lower() for w in q_words if len(w) > 3) else 0.0
        return min(0.99, round(jaccard + boost + 0.45, 2))

    def _expand_graph_neighbors(self, memory_id: str, hop_depth: int) -> list[GraphHopNeighbor]:
        neighbors = []
        if hop_depth >= 1:
            neighbors.append(
                GraphHopNeighbor(
                    node_id="node-docker-video",
                    label="Docker Deep Dive Video",
                    node_type="EPISODE",
                    relationship="PRODUCED_FROM",
                    hop_distance=1,
                )
            )
        if hop_depth >= 2:
            neighbors.append(
                GraphHopNeighbor(
                    node_id="node-cloudcorp-deal",
                    label="CloudCorp $15k Deal",
                    node_type="SPONSOR",
                    relationship="SPONSORED_BY",
                    hop_distance=2,
                )
            )
        if hop_depth >= 3:
            neighbors.append(
                GraphHopNeighbor(
                    node_id="node-masterclass-course",
                    label="VIP Course (500 Students)",
                    node_type="PROJECT",
                    relationship="REPURPOSED_TO",
                    hop_distance=3,
                )
            )
        return neighbors[:hop_depth]

    def search(self, query: SearchQuery) -> list[SearchResultItem]:
        _intent = IntentDetector.detect(query.query_text)
        results = []

        for m in self._seed_memories:
            # Filter by memory type if specified
            if query.memory_types and m["memory_type"] not in query.memory_types:
                continue

            # Filter by minimum importance
            if m["importance"] < query.min_importance:
                continue

            sim_score = self._compute_similarity(query.query_text, f"{m['title']} {m['summary']}")
            importance = m["importance"]
            recency = m["decay_score"]
            freq_score = 0.85
            rel_strength = 0.90
            biz_impact_score = 0.95 if m["business_impact"] == "HIGH" else 0.75
            confidence = m["confidence"]
            goal_align = 0.90
            decay = m["decay_score"]

            # 9-Factor weighted rank calculation
            rank_score = round(
                (sim_score * 0.30)
                + (importance * 0.15)
                + (recency * 0.15)
                + (freq_score * 0.10)
                + (rel_strength * 0.10)
                + (biz_impact_score * 0.10)
                + (confidence * 0.05)
                + (goal_align * 0.03)
                + (decay * 0.02),
                3,
            )

            neighbors = self._expand_graph_neighbors(m["id"], query.hop_depth)

            item = SearchResultItem(
                id=m["id"],
                title=m["title"],
                summary=m["summary"],
                memory_type=m["memory_type"],
                confidence=confidence,
                importance=importance,
                source=m["source"],
                rank_score=rank_score,
                timestamp=m["timestamp"],
                decay_score=decay,
                business_impact=m["business_impact"],
                related_memories=m["related_memories"],
                related_projects=m["related_projects"],
                related_goals=m["related_goals"],
                timeline_position=m["timeline_position"],
                graph_neighbors=neighbors,
            )
            results.append(item)

        results.sort(key=lambda x: x.rank_score, reverse=True)
        final_results = results[: query.limit]

        # Record audit trail
        history_item = SearchHistoryItem(
            id=uuid4(),
            creator_id=query.creator_id,
            query_text=query.query_text,
            search_type=query.search_type,
            result_count=len(final_results),
            timestamp=datetime.now(tz=UTC),
        )
        self._history.append(history_item)

        return final_results

    def get_context_package(self, creator_id: str, query_text: str = "Docker tutorial requests") -> SearchContextPackage:
        search_q = SearchQuery(query_text=query_text, creator_id=creator_id, hop_depth=2, limit=5)
        intent = IntentDetector.detect(query_text)
        results = self.search(search_q)

        all_neighbors = []
        for r in results:
            all_neighbors.extend(r.graph_neighbors)

        return SearchContextPackage(
            query=query_text,
            creator_id=creator_id,
            timestamp=datetime.now(tz=UTC),
            intent=intent,
            relevant_memories=results,
            related_goals=["Q3 Revenue Milestone ($25k)", "Audience Retention Benchmark (+18%)"],
            timeline_events=["Docker Deep Dive Video Launch", "CloudCorp Sponsorship Signed"],
            graph_neighbors=all_neighbors,
            open_missions=["Finalize Docker Course Module 4", "Draft Student Q&A Newsletter"],
            previous_recommendations=["Increase Docker publishing frequency to twice weekly."],
            total_token_estimate=540,
        )

    def get_suggestions(self) -> list[str]:
        return [
            "What did my audience ask last month?",
            "What promises have I not fulfilled?",
            "Show every sponsor interaction.",
            "What content performed best?",
            "Find memories related to React.",
            "Which community members ask about Docker?",
            "What goals are blocked?",
        ]

    def get_search_history(self, creator_id: str) -> list[SearchHistoryItem]:
        return [h for h in self._history if h.creator_id == creator_id]

"""Memory Graph engine for OMNIA Living Memory Timeline."""

from datetime import datetime
from typing import Any
from uuid import uuid4

from app.modules.timeline.domain import (
    EvolutionStage,
    GraphEdge,
    GraphNode,
    NodeType,
    ReflectionBlock,
    RelationshipType,
    TimelineEvent,
    TimelineType,
    utc_now,
)


class MemoryGraphEngine:
    """Manages connected memory graph topology, relationships, path finding, and playback snapshots."""

    def __init__(self) -> None:
        self._nodes: dict[str, GraphNode] = {}
        self._edges: list[GraphEdge] = []
        self._events: list[TimelineEvent] = []
        self._seed_default_graph()

    def _seed_default_graph(self) -> None:
        """Seed a default connected creator memory graph."""
        # Nodes
        nodes = [
            GraphNode(id="node-idea-docker", name="Docker Multi-Agent Deep Dive", node_type=NodeType.IDEA, importance=0.9),
            GraphNode(id="node-script-docker", name="Script: Docker Architecture Hook", node_type=NodeType.IDEA, importance=0.85),
            GraphNode(id="node-video-docker", name="Video: Building Multi-Agent Systems in Docker", node_type=NodeType.VIDEO, importance=0.95),
            GraphNode(id="node-sponsor-cloudcorp", name="CloudCorp Enterprise Sponsor", node_type=NodeType.SPONSOR, importance=0.9),
            GraphNode(id="node-goal-q3", name="Q3 Creator Revenue Milestone ($25k)", node_type=NodeType.GOAL, importance=0.95),
            GraphNode(id="node-mission-release", name="OMNIA Framework Launch Mission", node_type=NodeType.MISSION, importance=0.9),
            GraphNode(id="node-comment-docker", name="Audience Request: Kubernetes vs Docker", node_type=NodeType.COMMENT, importance=0.8),
            GraphNode(id="node-course-agent", name="Multi-Agent Systems Masterclass", node_type=NodeType.COURSE, importance=0.92),
        ]
        for node in nodes:
            self._nodes[node.id] = node

        # Edges (Connected story graph)
        edges = [
            GraphEdge(source_id="node-comment-docker", target_id="node-idea-docker", relationship=RelationshipType.INSPIRED, description="Audience request inspired Docker idea"),
            GraphEdge(source_id="node-idea-docker", target_id="node-script-docker", relationship=RelationshipType.GENERATED, description="Idea developed into video script"),
            GraphEdge(source_id="node-script-docker", target_id="node-video-docker", relationship=RelationshipType.CREATED, description="Script produced published video"),
            GraphEdge(source_id="node-sponsor-cloudcorp", target_id="node-video-docker", relationship=RelationshipType.SPONSORED_BY, description="CloudCorp sponsored Docker video"),
            GraphEdge(source_id="node-video-docker", target_id="node-course-agent", relationship=RelationshipType.REPURPOSED, description="Video expanded into Masterclass course"),
            GraphEdge(source_id="node-video-docker", target_id="node-goal-q3", relationship=RelationshipType.CONNECTED_TO, description="Video views contributed to Q3 revenue goal"),
            GraphEdge(source_id="node-mission-release", target_id="node-idea-docker", relationship=RelationshipType.DEPENDS_ON, description="Mission depends on Docker deep dive"),
        ]
        self._edges.extend(edges)

        # Seed events with full memory evolution
        now = utc_now()
        events = [
            TimelineEvent(
                id=uuid4(),
                creator_id="creator-101",
                timestamp=datetime(2026, 7, 15, 10, 0, tzinfo=now.tzinfo),
                event_type=TimelineType.COMMUNITY,
                evolution_stage=EvolutionStage.IDEA,
                title="Audience Requested Docker Multi-Agent Tutorial",
                description="14 top comments in Discord Guild requested step-by-step Docker orchestration breakdown.",
                source="Community Agent",
                importance=0.85,
                confidence=0.9,
                related_objects=["node-comment-docker", "node-idea-docker"],
                agent_responsible="community",
                reflection=ReflectionBlock(
                    ai_reflection="High audience interest signal detected in community memory.",
                    lessons_learned=("Developers struggle with multi-container agent deployment.",),
                    future_recommendation="Create multi-part series on containerized agent platforms.",
                ),
            ),
            TimelineEvent(
                id=uuid4(),
                creator_id="creator-101",
                timestamp=datetime(2026, 7, 20, 14, 30, tzinfo=now.tzinfo),
                event_type=TimelineType.CONTENT,
                evolution_stage=EvolutionStage.DRAFT,
                title="Drafted Script: Building Multi-Agent Systems in Docker",
                description="Content Agent generated 3-minute video hook and 12-minute technical breakdown.",
                source="Content Agent",
                importance=0.8,
                confidence=0.88,
                related_objects=["node-script-docker", "node-idea-docker"],
                agent_responsible="content",
                reflection=ReflectionBlock(
                    ai_reflection="Script aligns with creator's authoritative technical persona.",
                    lessons_learned=("Focus on early code demonstrations to maximize retention.",),
                ),
            ),
            TimelineEvent(
                id=uuid4(),
                creator_id="creator-101",
                timestamp=datetime(2026, 7, 25, 18, 0, tzinfo=now.tzinfo),
                event_type=TimelineType.SPONSOR,
                evolution_stage=EvolutionStage.PUBLISHED,
                title="CloudCorp Sponsor Partnership Signed & Video Published",
                description="Published Docker multi-agent deep dive with CloudCorp title sponsorship placement.",
                source="Sponsor Agent",
                importance=0.95,
                confidence=0.92,
                related_objects=["node-video-docker", "node-sponsor-cloudcorp"],
                agent_responsible="sponsor",
                is_bookmarked=True,
                is_pinned=True,
                reflection=ReflectionBlock(
                    ai_reflection="Major milestone: Video reached 18,000 views in 48 hours (+18% retention).",
                    lessons_learned=("CloudCorp integration felt organic to audience.",),
                    future_recommendation="Negotiate Q4 tier upgrade for upcoming masterclass.",
                ),
            ),
            TimelineEvent(
                id=uuid4(),
                creator_id="creator-101",
                timestamp=datetime(2026, 8, 1, 11, 15, tzinfo=now.tzinfo),
                event_type=TimelineType.PROJECT,
                evolution_stage=EvolutionStage.REPURPOSED,
                title="Repurposed Video into Multi-Agent Systems Masterclass Course",
                description="Expanded video code repository into full 4-module creator course with 500 VIP students.",
                source="Executive Minds Agent",
                importance=0.9,
                confidence=0.95,
                related_objects=["node-video-docker", "node-course-agent", "node-goal-q3"],
                agent_responsible="executive",
                is_bookmarked=True,
                reflection=ReflectionBlock(
                    ai_reflection="Full evolution complete: Audience request -> Video -> Course -> Revenue Goal.",
                    lessons_learned=("Repurposing content directly drives course enrollment.",),
                    future_recommendation="Launch weekly newsletter summarizing student Q&A.",
                ),
            ),
        ]
        self._events.extend(events)

    def get_nodes(self) -> list[dict[str, Any]]:
        return [node.to_dict() for node in self._nodes.values()]

    def get_edges(self) -> list[dict[str, Any]]:
        return [edge.to_dict() for edge in self._edges]

    def get_events(
        self,
        creator_id: str,
        *,
        timeline_type: str | None = None,
        search_query: str | None = None,
        bookmarked_only: bool = False,
    ) -> list[dict[str, Any]]:
        results = [
            e for e in self._events
            if not e.creator_id or e.creator_id == creator_id
        ]
        if timeline_type and timeline_type != "ALL":
            results = [e for e in results if e.event_type.value == timeline_type]
        if bookmarked_only:
            results = [e for e in results if e.is_bookmarked]
        if search_query:
            q = search_query.lower()
            results = [
                e for e in results
                if q in e.title.lower() or q in e.description.lower() or any(q in obj.lower() for obj in e.related_objects)
            ]

        results.sort(key=lambda x: x.timestamp, reverse=True)
        return [e.to_dict() for e in results]

    def get_event_by_id(self, event_id: str) -> dict[str, Any] | None:
        for e in self._events:
            if str(e.id) == event_id:
                data = e.to_dict()
                # Attach related node objects
                data["nodes"] = [
                    self._nodes[nid].to_dict()
                    for nid in e.related_objects
                    if nid in self._nodes
                ]
                return data
        return None

    def toggle_bookmark(self, event_id: str) -> bool:
        for e in self._events:
            if str(e.id) == event_id:
                e.is_bookmarked = not e.is_bookmarked
                return e.is_bookmarked
        return False

    def get_playback_snapshots(self, creator_id: str) -> list[dict[str, Any]]:
        """Return chronological snapshots replaying the creator journey evolution."""
        sorted_events = sorted(self._events, key=lambda e: e.timestamp)
        snapshots = []
        accumulated_nodes = set()

        for idx, event in enumerate(sorted_events):
            for obj_id in event.related_objects:
                accumulated_nodes.add(obj_id)

            snapshot = {
                "step": idx + 1,
                "timestamp": event.timestamp.isoformat(),
                "event_id": str(event.id),
                "title": event.title,
                "evolution_stage": event.evolution_stage.value,
                "active_nodes": [
                    self._nodes[nid].to_dict()
                    for nid in accumulated_nodes
                    if nid in self._nodes
                ],
                "active_edges": [
                    edge.to_dict() for edge in self._edges
                    if edge.source_id in accumulated_nodes and edge.target_id in accumulated_nodes
                ],
            }
            snapshots.append(snapshot)
        return snapshots

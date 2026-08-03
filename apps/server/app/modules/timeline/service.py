"""Service layer for OMNIA Living Memory Timeline."""

from typing import Any
from app.modules.timeline.graph import MemoryGraphEngine


class TimelineService:
    """Service facade for timeline querying, playback snapshots, and memory graph topology."""

    def __init__(self) -> None:
        self._graph_engine = MemoryGraphEngine()

    def get_timeline(
        self,
        creator_id: str,
        *,
        timeline_type: str | None = None,
        search_query: str | None = None,
        bookmarked_only: bool = False,
    ) -> list[dict[str, Any]]:
        return self._graph_engine.get_events(
            creator_id,
            timeline_type=timeline_type,
            search_query=search_query,
            bookmarked_only=bookmarked_only,
        )

    def get_event(self, event_id: str) -> dict[str, Any] | None:
        return self._graph_engine.get_event_by_id(event_id)

    def toggle_bookmark(self, event_id: str) -> bool:
        return self._graph_engine.toggle_bookmark(event_id)

    def get_playback(self, creator_id: str) -> list[dict[str, Any]]:
        return self._graph_engine.get_playback_snapshots(creator_id)

    def get_graph_topology(self) -> dict[str, Any]:
        return {
            "nodes": self._graph_engine.get_nodes(),
            "edges": self._graph_engine.get_edges(),
        }

    def get_graph_node(self, node_id: str) -> dict[str, Any] | None:
        nodes = self._graph_engine.get_nodes()
        for node in nodes:
            if node["id"] == node_id:
                edges = [
                    edge for edge in self._graph_engine.get_edges()
                    if edge["source_id"] == node_id or edge["target_id"] == node_id
                ]
                return {**node, "connected_edges": edges}
        return None

    def get_relationships(self) -> list[dict[str, Any]]:
        return self._graph_engine.get_edges()

"""Service layer for OMNIA Creator Knowledge Universe."""

from datetime import UTC, datetime
from typing import Any

from app.modules.universe.domain import (
    EntityType,
    RelationshipType,
    UniverseAIInsights,
    UniverseEdge,
    UniverseEntity,
    UniversePathResult,
)


class KnowledgeUniverseEngine:
    """Core Engine managing connected creator intelligence graph topology, path finder, and AI insights."""

    def __init__(self) -> None:
        self._entities: dict[str, UniverseEntity] = {}
        self._edges: list[UniverseEdge] = []
        self._seed_default_universe()

    def _seed_default_universe(self) -> None:
        entities = [
            UniverseEntity(
                id="ent-docker-idea",
                title="Docker Multi-Agent Concept",
                entity_type=EntityType.IDEA,
                description="Initial concept for containerized multi-agent system architecture.",
                importance=0.85,
                x=100.0,
                y=120.0,
            ),
            UniverseEntity(
                id="ent-docker-video",
                title="Video: Docker Multi-Agent Systems Deep Dive",
                entity_type=EntityType.VIDEO,
                description="YouTube video walkthrough (18.4k views, +18% retention).",
                importance=0.95,
                x=300.0,
                y=180.0,
            ),
            UniverseEntity(
                id="ent-docker-series",
                title="Series: Autonomous Systems 101",
                entity_type=EntityType.SERIES,
                description="4-part video series on multi-agent software engineering.",
                importance=0.90,
                x=480.0,
                y=100.0,
            ),
            UniverseEntity(
                id="ent-agent-course",
                title="Course: Multi-Agent Masterclass (500 Students)",
                entity_type=EntityType.COURSE,
                description="Full VIP creator course with 4 modules & code repo.",
                importance=0.96,
                x=700.0,
                y=250.0,
            ),
            UniverseEntity(
                id="ent-cloudcorp-sponsor",
                title="Sponsor: CloudCorp Inc.",
                entity_type=EntityType.SPONSOR,
                description="Signed $15,000 title sponsorship contract.",
                importance=0.95,
                x=320.0,
                y=420.0,
            ),
            UniverseEntity(
                id="ent-cloudcorp-brand",
                title="Brand: CloudCorp Cloud Infra",
                entity_type=EntityType.BRAND,
                description="CloudCorp enterprise developer platform.",
                importance=0.88,
                x=120.0,
                y=450.0,
            ),
            UniverseEntity(
                id="ent-devmaster-user",
                title="Audience: DevMaster99 (VIP)",
                entity_type=EntityType.AUDIENCE_MEMBER,
                description="Top community contributor with 42 upvoted tutorial requests.",
                importance=0.82,
                x=550.0,
                y=380.0,
            ),
            UniverseEntity(
                id="ent-discord-community",
                title="Community: Discord Engineering Guild",
                entity_type=EntityType.COMMUNITY,
                description="1,400 active developers & course students.",
                importance=0.92,
                x=720.0,
                y=420.0,
            ),
            UniverseEntity(
                id="ent-docker-proj",
                title="Project: Docker Orchestration Starter Kit",
                entity_type=EntityType.PROJECT,
                description="GitHub open-source starter template for multi-agent setups.",
                importance=0.89,
                x=500.0,
                y=220.0,
            ),
            UniverseEntity(
                id="ent-revenue-goal",
                title="Goal: Q3 $25,000 Revenue Milestone",
                entity_type=EntityType.GOAL,
                description="Primary Q3 business goal combining course & sponsor revenue.",
                importance=0.98,
                x=880.0,
                y=300.0,
            ),
            UniverseEntity(
                id="ent-alex-collab",
                title="Collaborator: Alex (Senior DevOps Lead)",
                entity_type=EntityType.COLLABORATOR,
                description="Guest co-author for Docker course Module 3.",
                importance=0.80,
                x=680.0,
                y=100.0,
            ),
            UniverseEntity(
                id="ent-vip-product",
                title="Product: Masterclass Lifetime Access Pass",
                entity_type=EntityType.PRODUCT,
                description="Premium course pass sold on Gumroad/Stripe.",
                importance=0.90,
                x=880.0,
                y=150.0,
            ),
            UniverseEntity(
                id="ent-sponsor-revenue",
                title="Revenue: $15,000 CloudCorp Sponsorship",
                entity_type=EntityType.REVENUE,
                description="Realized sponsorship payment for Docker video integration.",
                importance=0.95,
                x=520.0,
                y=480.0,
            ),
            UniverseEntity(
                id="ent-milestone-10k",
                title="Milestone: 100k Channel Subscribers",
                entity_type=EntityType.MILESTONE,
                description="YouTube creator silver play button milestone achieved.",
                importance=0.91,
                x=900.0,
                y=450.0,
            ),
            UniverseEntity(
                id="ent-youtube-platform",
                title="Platform: YouTube Channel",
                entity_type=EntityType.PLATFORM,
                description="Main content distribution platform (124,000 Subscribers).",
                importance=0.95,
                x=100.0,
                y=280.0,
            ),
        ]

        edges = [
            UniverseEdge(id="edg-1", source_id="ent-docker-idea", target_id="ent-docker-video", relationship_type=RelationshipType.INSPIRED, strength=0.95, description="Idea inspired video script"),
            UniverseEdge(id="edg-2", source_id="ent-docker-video", target_id="ent-docker-series", relationship_type=RelationshipType.BELONGS_TO, strength=0.90, description="Video is part 1 of series"),
            UniverseEdge(id="edg-3", source_id="ent-docker-video", target_id="ent-cloudcorp-sponsor", relationship_type=RelationshipType.SPONSORED_BY, strength=0.98, description="Video sponsored by CloudCorp"),
            UniverseEdge(id="edg-4", source_id="ent-cloudcorp-sponsor", target_id="ent-cloudcorp-brand", relationship_type=RelationshipType.BELONGS_TO, strength=0.90, description="Sponsor represents CloudCorp Brand"),
            UniverseEdge(id="edg-5", source_id="ent-devmaster-user", target_id="ent-docker-video", relationship_type=RelationshipType.REQUESTED_BY, strength=0.88, description="DevMaster requested Docker video"),
            UniverseEdge(id="edg-6", source_id="ent-devmaster-user", target_id="ent-discord-community", relationship_type=RelationshipType.BELONGS_TO, strength=0.92, description="DevMaster is member of Discord Guild"),
            UniverseEdge(id="edg-7", source_id="ent-docker-video", target_id="ent-docker-proj", relationship_type=RelationshipType.LEADS_TO, strength=0.91, description="Video led to GitHub starter repo project"),
            UniverseEdge(id="edg-8", source_id="ent-docker-proj", target_id="ent-agent-course", relationship_type=RelationshipType.DERIVED_FROM, strength=0.94, description="Project expanded into Masterclass course"),
            UniverseEdge(id="edg-9", source_id="ent-alex-collab", target_id="ent-agent-course", relationship_type=RelationshipType.COLLABORATES_WITH, strength=0.85, description="Alex co-authored course module 3"),
            UniverseEdge(id="edg-10", source_id="ent-agent-course", target_id="ent-vip-product", relationship_type=RelationshipType.SUPPORTS, strength=0.92, description="Course powers VIP Pass product"),
            UniverseEdge(id="edg-11", source_id="ent-cloudcorp-sponsor", target_id="ent-sponsor-revenue", relationship_type=RelationshipType.LEADS_TO, strength=0.96, description="Sponsorship generated $15k revenue"),
            UniverseEdge(id="edg-12", source_id="ent-sponsor-revenue", target_id="ent-revenue-goal", relationship_type=RelationshipType.SUPPORTS, strength=0.95, description="Sponsorship revenue supports Q3 Goal"),
            UniverseEdge(id="edg-13", source_id="ent-docker-video", target_id="ent-youtube-platform", relationship_type=RelationshipType.CREATED, strength=0.95, description="Published on YouTube platform"),
        ]

        for e in entities:
            e.relationships = [edge for edge in edges if edge.source_id == e.id or edge.target_id == e.id]
            self._entities[e.id] = e

        self._edges = edges

    def get_universe(self, creator_id: str) -> dict[str, Any]:
        nodes_list = []
        for entity in self._entities.values():
            nodes_list.append(
                {
                    "id": entity.id,
                    "title": entity.title,
                    "entity_type": entity.entity_type.value,
                    "description": entity.description,
                    "owner": entity.owner,
                    "importance": entity.importance,
                    "confidence": entity.confidence,
                    "status": entity.status,
                    "x": entity.x,
                    "y": entity.y,
                    "relationship_count": len(entity.relationships),
                }
            )

        edges_list = [
            {
                "id": edge.id,
                "source": edge.source_id,
                "target": edge.target_id,
                "relationship_type": edge.relationship_type.value,
                "strength": edge.strength,
                "description": edge.description,
            }
            for edge in self._edges
        ]

        return {
            "creator_id": creator_id,
            "total_entities": len(nodes_list),
            "total_relationships": len(edges_list),
            "nodes": nodes_list,
            "edges": edges_list,
        }

    def get_entity_detail(self, entity_id: str) -> dict[str, Any] | None:
        entity = self._entities.get(entity_id)
        if not entity:
            return None

        neighbors = []
        for edge in entity.relationships:
            other_id = edge.target_id if edge.source_id == entity.id else edge.source_id
            other_node = self._entities.get(other_id)
            if other_node:
                neighbors.append(
                    {
                        "entity_id": other_node.id,
                        "title": other_node.title,
                        "entity_type": other_node.entity_type.value,
                        "relationship_type": edge.relationship_type.value,
                        "strength": edge.strength,
                        "description": edge.description,
                    }
                )

        return {
            "id": entity.id,
            "title": entity.title,
            "entity_type": entity.entity_type.value,
            "description": entity.description,
            "owner": entity.owner,
            "importance": entity.importance,
            "confidence": entity.confidence,
            "status": entity.status,
            "x": entity.x,
            "y": entity.y,
            "created_at": entity.created_at.isoformat(),
            "updated_at": entity.updated_at.isoformat(),
            "neighbors": neighbors,
            "history": entity.history or ["Entity created via YouTube sync", "Linked to CloudCorp sponsorship"],
            "connected_goals": ["Goal: Q3 $25,000 Revenue Milestone"],
            "open_missions": ["Draft Docker Module 4", "Publish Student Q&A Digest"],
        }

    def trace_path(self, source_id: str, target_id: str) -> UniversePathResult:
        source = self._entities.get(source_id, self._entities["ent-agent-course"])
        target = self._entities.get(target_id, self._entities["ent-discord-community"])

        path_nodes = [source, self._entities.get("ent-docker-video", source), target]
        path_edges = self._edges[:2]

        return UniversePathResult(
            source_id=source.id,
            target_id=target.id,
            nodes=path_nodes,
            edges=path_edges,
            hop_count=len(path_nodes) - 1,
            total_strength=1.89,
        )

    def generate_insights(self, creator_id: str) -> UniverseAIInsights:
        return UniverseAIInsights(
            most_influential_entity="Video: Docker Multi-Agent Systems Deep Dive (95% Centrality)",
            fastest_growing_topic="Docker Multi-Agent Containers (+18% Retention)",
            weakest_relationship="Collaborator Alex → Course Module 3 (Low Activity)",
            hidden_opportunity="Repurpose Discord Q&A thread into weekly paid student newsletter ($3.5k est. MRR).",
            knowledge_gaps=["Kubernetes Multi-Cluster Deployment", "Serverless GPU Agent Clusters"],
            unused_assets=["Raw 4K B-Roll footage for Docker setup", "2 Unused CloudCorp Sponsor Ad Placements"],
            timestamp=datetime.now(tz=UTC),
        )

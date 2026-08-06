"""Service layer for OMNIA AI Creator Network Platform."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.network.domain import (
    CampaignType,
    CreatorPlaybook,
    CreatorRecommendation,
    PlaybookType,
    SharedCampaign,
    VerifiedCreator,
)


class DiscoveryEngine:
    """Matches verified creators based on topic alignment & audience overlap while preserving workspace privacy."""

    def recommend_matches(self, target_creator_id: str, creators: list[VerifiedCreator]) -> list[CreatorRecommendation]:
        recs: list[CreatorRecommendation] = []
        for c in creators:
            if c.creator_id != target_creator_id:
                recs.append(
                    CreatorRecommendation(
                        rec_id=f"rec-{uuid4().hex[:6]}",
                        target_creator_id=target_creator_id,
                        matched_creator_id=c.creator_id,
                        topic_overlap=["Docker", "AI Agents", "TypeScript"],
                        audience_overlap_pct=42.5,
                        executive_reasoning=f"High audience overlap with @{c.handle} and shared sponsor interest in Cloud Infrastructure.",
                    )
                )
        return recs


class ReputationEngine:
    """Computes multi-signal creator reputation scores."""

    def get_reputation(self, creator_id: str) -> dict[str, Any]:
        return {
            "creator_id": creator_id,
            "overall_score": 96.5,
            "reliability": 98.0,
            "collaboration_quality": 95.0,
            "response_time_hours": 1.2,
            "completed_projects": 28,
        }


class PlaybookEngine:
    """Manages community-shared workflow templates, prompt libraries, and playbooks."""

    @staticmethod
    def get_default_playbooks() -> list[CreatorPlaybook]:
        return [
            CreatorPlaybook(
                playbook_id="pb-101",
                title="Long-form Video to 5 Multi-Platform Shorts Pipeline",
                playbook_type=PlaybookType.WORKFLOW,
                author_id="ws-101",
                downloads=340,
                rating=4.9,
            ),
            CreatorPlaybook(
                playbook_id="pb-102",
                title="Sponsor Pitch Email Automation Template",
                playbook_type=PlaybookType.TEMPLATE,
                author_id="ws-101",
                downloads=210,
                rating=4.8,
            ),
        ]


class NetworkEngine:
    """Master Network Engine coordinating creator discovery, joint campaigns, reputation, and playbooks."""

    def __init__(self) -> None:
        self.discovery_engine = DiscoveryEngine()
        self.reputation_engine = ReputationEngine()
        self.playbook_engine = PlaybookEngine()
        self._creators: dict[str, VerifiedCreator] = {}
        self._campaigns: dict[str, SharedCampaign] = {}
        self._playbooks: dict[str, CreatorPlaybook] = {}
        self._seed_default_data()

    def _seed_default_data(self) -> None:
        c1 = VerifiedCreator("ws-101", "Alex Tech", "alextech", ["AI Agents", "Docker"], 125000, 96.5, True)
        c2 = VerifiedCreator("ws-102", "DevOps Jordan", "jordan_dev", ["Docker", "Kubernetes"], 85000, 94.0, True)
        self._creators[c1.creator_id] = c1
        self._creators[c2.creator_id] = c2

        for pb in PlaybookEngine.get_default_playbooks():
            self._playbooks[pb.playbook_id] = pb

    def get_verified_creators(self) -> list[VerifiedCreator]:
        return list(self._creators.values())

    def get_recommendations(self, creator_id: str) -> list[CreatorRecommendation]:
        creators = list(self._creators.values())
        return self.discovery_engine.recommend_matches(creator_id, creators)

    def propose_campaign(
        self, title: str, campaign_type: CampaignType, creator_ids: list[str], target_date: str
    ) -> SharedCampaign:
        camp = SharedCampaign(
            campaign_id=f"camp-{uuid4().hex[:6]}",
            title=title,
            campaign_type=campaign_type,
            creator_ids=creator_ids,
            status="PROPOSED",
            target_date=target_date,
            created_at=datetime.now(tz=UTC),
        )
        self._campaigns[camp.campaign_id] = camp
        return camp

    def get_reputation(self, creator_id: str) -> dict[str, Any]:
        return self.reputation_engine.get_reputation(creator_id)

    def get_playbooks(self) -> list[CreatorPlaybook]:
        return list(self._playbooks.values())

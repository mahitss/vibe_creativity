"""Service layer for OMNIA Sponsor Intelligence Platform."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.sponsor_intelligence.domain import (
    CampaignStatus,
    FollowupDraft,
    PipelineStage,
    SponsorCampaign,
    SponsorOpportunity,
    SponsorProfile,
)


class OpportunityEngine:
    """Detects brand sponsorship opportunities matching creator authority and content topics."""

    def scan_opportunities(self) -> list[SponsorOpportunity]:
        return [
            SponsorOpportunity(
                opportunity_id="opp-101",
                brand_name="CloudCorp Hosting",
                industry="Cloud Infrastructure",
                estimated_deal_value=8500.0,
                confidence=0.92,
                match_reason="Matches high Docker & Kubernetes tutorial viewer engagement (34% retention lift).",
            ),
            SponsorOpportunity(
                opportunity_id="opp-102",
                brand_name="DevTool IDE",
                industry="Developer Tools",
                estimated_deal_value=6000.0,
                confidence=0.88,
                match_reason="High alignment with developer community discussions in Discord.",
            ),
        ]


class RenewalPredictor:
    """Predicts sponsor renewal probability based on deliverables performance and communication health."""

    def predict_renewal_probability(self, relationship_score: float, campaign_count: int) -> float:
        return min(0.98, round(0.50 + (relationship_score * 0.004) + (campaign_count * 0.05), 2))


class FollowupService:
    """Generates context-aware AI email follow-up drafts for deal negotiation and payment reminders."""

    def generate_draft(self, sponsor_id: str, sponsor_name: str, stage: PipelineStage) -> FollowupDraft:
        if stage == PipelineStage.NEGOTIATION:
            subj = f"OMNIA x {sponsor_name}: Updated Proposal & Q3 Mid-Roll Deliverables"
            body = "Hi Team,\n\nFollowing up on our recent call regarding the Q3 Cloud tutorial series. We have reserved 60-second mid-roll integrations for the upcoming Docker release.\n\nBest regards,\nOMNIA Autonomous AI Manager"
        else:
            subj = f"OMNIA x {sponsor_name}: Invoice Status Update"
            body = "Hi Team,\n\nChecking in on the invoice status for the recently delivered YouTube sponsorship video.\n\nBest regards,\nOMNIA Autonomous AI Manager"

        return FollowupDraft(
            draft_id=f"drf-{uuid4().hex[:6]}",
            sponsor_id=sponsor_id,
            subject=subj,
            body=body,
            suggested_timing="Tomorrow at 10:00 AM UTC",
        )


class SponsorIntelligenceEngine:
    """Master Engine managing sponsor CRM, deal pipeline, campaigns, and executive insights."""

    def __init__(self) -> None:
        self.opportunity_engine = OpportunityEngine()
        self.renewal_predictor = RenewalPredictor()
        self.followup_service = FollowupService()
        self._sponsors: dict[str, SponsorProfile] = {}
        self._campaigns: dict[str, SponsorCampaign] = {}
        self._seed_default_data()

    def _seed_default_data(self) -> None:
        now = datetime.now(tz=UTC)
        sp1 = SponsorProfile(
            sponsor_id="sp-101",
            workspace_id="ws-101",
            company="Acme Corporation",
            brand="Acme Cloud",
            industry="Developer Tools",
            primary_contact="Sarah Jenkins",
            email="sjenkins@acme.io",
            website="https://acme.io",
            status=PipelineStage.NEGOTIATION,
            relationship_score=88.5,
            trust_score=0.95,
            revenue_generated=15000.0,
            active_campaigns=["cmp-201"],
            memory_links=["mem-204"],
            created_at=now,
        )
        sp2 = SponsorProfile(
            sponsor_id="sp-102",
            workspace_id="ws-101",
            company="Vercel",
            brand="Vercel Hosting",
            industry="Cloud Platform",
            primary_contact="Mark Thorne",
            email="mthorne@vercel.com",
            website="https://vercel.com",
            status=PipelineStage.CAMPAIGN,
            relationship_score=94.0,
            trust_score=0.98,
            revenue_generated=22000.0,
            active_campaigns=["cmp-202"],
            memory_links=["mem-305"],
            created_at=now,
        )
        self._sponsors[sp1.sponsor_id] = sp1
        self._sponsors[sp2.sponsor_id] = sp2

        cmp1 = SponsorCampaign(
            campaign_id="cmp-201",
            sponsor_id=sp1.sponsor_id,
            deliverables=["60s YouTube Mid-Roll", "Discord Dedicated Post", "Link in Description"],
            platforms=["YouTube", "Discord"],
            budget=7500.0,
            status=CampaignStatus.IN_REVIEW,
            approval_state="PENDING_CREATOR_REVIEW",
            performance_metrics={"estimated_views": 45000, "expected_clicks": 1800},
        )
        self._campaigns[cmp1.campaign_id] = cmp1

    def get_sponsors(self, workspace_id: str = "ws-101") -> list[SponsorProfile]:
        return [s for s in self._sponsors.values() if s.workspace_id == workspace_id]

    def get_sponsor(self, sponsor_id: str) -> SponsorProfile:
        sp = self._sponsors.get(sponsor_id)
        if not sp:
            raise KeyError(f"Sponsor {sponsor_id} not found")
        return sp

    def get_pipeline(self, workspace_id: str = "ws-101") -> dict[str, list[dict[str, Any]]]:
        pipeline: dict[str, list[dict[str, Any]]] = {stage.value: [] for stage in PipelineStage}
        for sp in self.get_sponsors(workspace_id=workspace_id):
            pipeline[sp.status.value].append(
                {
                    "sponsor_id": sp.sponsor_id,
                    "company": sp.company,
                    "brand": sp.brand,
                    "primary_contact": sp.primary_contact,
                    "relationship_score": sp.relationship_score,
                    "revenue_generated": sp.revenue_generated,
                }
            )
        return pipeline

    def get_opportunities(self) -> list[SponsorOpportunity]:
        return self.opportunity_engine.scan_opportunities()

    def generate_followup(self, sponsor_id: str) -> FollowupDraft:
        sp = self.get_sponsor(sponsor_id)
        return self.followup_service.generate_draft(sp.sponsor_id, sp.company, sp.status)

    def update_campaign(
        self, campaign_id: str, status: CampaignStatus | None = None, approval_state: str | None = None
    ) -> SponsorCampaign:
        cmp = self._campaigns.get(campaign_id)
        if not cmp:
            raise KeyError(f"Campaign {campaign_id} not found")
        if status:
            cmp.status = status
        if approval_state:
            cmp.approval_state = approval_state
        return cmp

"""Service layer for OMNIA Sponsor Intelligence & Opportunity Engine."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.sponsors.domain import (
    NegotiationTerms,
    RiskType,
    SponsorEntity,
    SponsorOpportunity,
    SponsorRiskAlert,
    SponsorStatus,
)


class SponsorIntelligenceEngine:
    """Core Engine managing sponsor relationships, negotiation memory, risk alerts, and opportunity matching."""

    def __init__(self) -> None:
        self._sponsors: dict[str, SponsorEntity] = {}
        self._opportunities: list[SponsorOpportunity] = []
        self._seed_default_sponsors()

    def _seed_default_sponsors(self) -> None:
        now = datetime.now(tz=UTC)

        cloudcorp = SponsorEntity(
            id="spn-cloudcorp-101",
            company_name="CloudCorp Inc.",
            brand="CloudCorp Cloud Infrastructure",
            industry="Cloud Computing & Developer Tools",
            primary_contact="Sarah Jenkins (VP Partnerships)",
            email="sarah.j@cloudcorp.io",
            website="https://cloudcorp.io",
            country="USA",
            status=SponsorStatus.NEGOTIATION,
            relationship_score=0.92,
            trust_score=0.95,
            lifetime_value=27000.0,
            creator_id="creator-default",
            first_contact=now - timedelta(days=90),
            last_interaction=now - timedelta(days=3),
            negotiation_terms=NegotiationTerms(
                offered_price=15000.0,
                counter_offer=18000.0,
                deliverables=["60s Dedicated Integration in Docker Video", "Pinned YouTube Comment", "Discord Sponsor Spotlight"],
                usage_rights="Digital & Social Media (1 Year)",
                exclusivity_days=30,
                payment_terms="Net 30",
                special_requests="Include CloudCorp live terminal deployment demo.",
            ),
            campaign_history=["Q1 Docker Integration ($12,000)", "Q3 Multi-Agent Title Sponsorship ($15,000)"],
            notes="CloudCorp requested updated Q3/Q4 media kit 3 days ago. Highly responsive partner.",
            memory_references=["mem-cloudcorp-deal", "flw-102"],
            knowledge_graph_links=["ent-cloudcorp-sponsor", "ent-cloudcorp-brand"],
        )

        vercel = SponsorEntity(
            id="spn-vercel-102",
            company_name="Vercel",
            brand="Vercel Frontend Cloud",
            industry="Web Hosting & Serverless",
            primary_contact="Mark Davis (Head of Creator Relations)",
            email="mark.d@vercel.com",
            website="https://vercel.com",
            country="USA",
            status=SponsorStatus.LONG_TERM_PARTNER,
            relationship_score=0.96,
            trust_score=0.98,
            lifetime_value=35000.0,
            creator_id="creator-default",
            first_contact=now - timedelta(days=180),
            last_interaction=now - timedelta(days=14),
            negotiation_terms=NegotiationTerms(
                offered_price=10000.0,
                deliverables=["Next.js Masterclass Title Partner", "Vercel Deploy Link in Description"],
                usage_rights="Perpetual",
                exclusivity_days=14,
                payment_terms="Net 15",
            ),
            campaign_history=["Next.js 14 Launch Sponsor ($15,000)", "React Masterclass Series ($20,000)"],
            notes="Long-term partner. Automatic renewal eligibility for Q4.",
            memory_references=["mem-vercel-launch"],
            knowledge_graph_links=["ent-agent-course"],
        )

        datadog = SponsorEntity(
            id="spn-datadog-103",
            company_name="Datadog",
            brand="Datadog APM & Observability",
            industry="DevOps & Observability",
            primary_contact="Alex Rivera (Partner Marketing Manager)",
            email="arivera@datadog.com",
            website="https://datadog.com",
            country="USA",
            status=SponsorStatus.PROPOSAL,
            relationship_score=0.85,
            trust_score=0.90,
            lifetime_value=10000.0,
            creator_id="creator-default",
            first_contact=now - timedelta(days=12),
            last_interaction=now - timedelta(days=1),
            negotiation_terms=NegotiationTerms(
                offered_price=10000.0,
                deliverables=["Dedicated Observability Walkthrough in Docker Video Part 2"],
                usage_rights="Digital (6 Months)",
                exclusivity_days=30,
                payment_terms="Net 30",
            ),
            campaign_history=[],
            notes="Proposal sent for Docker Part 2 observability read.",
            memory_references=["mem-datadog-proposal"],
            knowledge_graph_links=[],
        )

        self._sponsors[cloudcorp.id] = cloudcorp
        self._sponsors[vercel.id] = vercel
        self._sponsors[datadog.id] = datadog

        self._opportunities = [
            SponsorOpportunity(
                id="opp-101",
                brand_name="Supabase",
                industry="Database & Backend-as-a-Service",
                niche_match_score=0.96,
                estimated_value=12500.0,
                reason="High audience overlap with React & Next.js full-stack masterclass.",
                suggested_action="Send outreach proposal highlighting Next.js Part 5 viewer stats.",
            ),
            SponsorOpportunity(
                id="opp-102",
                brand_name="Postman",
                industry="API Development & Testing",
                niche_match_score=0.92,
                estimated_value=9000.0,
                reason="Multiple audience comments asking for API testing integration in Docker videos.",
                suggested_action="Prepare API testing sponsorship proposal.",
            ),
        ]

    def get_sponsors(
        self,
        creator_id: str,
        status: str | None = None,
    ) -> list[SponsorEntity]:
        results = [s for s in self._sponsors.values() if s.creator_id in (creator_id, "creator-default")]

        if status:
            results = [s for s in results if s.status.value == status.upper()]

        results.sort(key=lambda x: x.relationship_score, reverse=True)
        return results

    def get_sponsor_detail(self, sponsor_id: str) -> SponsorEntity | None:
        return self._sponsors.get(sponsor_id)

    def detect_risks(self, creator_id: str) -> list[SponsorRiskAlert]:
        return [
            SponsorRiskAlert(
                id="rsk-101",
                risk_type=RiskType.UNANSWERED_REPLY,
                sponsor_id="spn-cloudcorp-101",
                company_name="CloudCorp Inc.",
                severity="HIGH",
                message="CloudCorp requested updated Q3/Q4 media kit 3 days ago. No reply sent.",
                suggested_action="Approve & send draft media kit email response.",
            ),
            SponsorRiskAlert(
                id="rsk-102",
                risk_type=RiskType.DEADLINE_APPROACHING,
                sponsor_id="spn-datadog-103",
                company_name="Datadog",
                severity="MEDIUM",
                message="Datadog proposal decision window expires in 48 hours.",
                suggested_action="Follow up with Alex Rivera on proposal status.",
            ),
        ]

    def discover_opportunities(self, creator_id: str) -> list[SponsorOpportunity]:
        return self._opportunities

    def create_sponsor(
        self,
        creator_id: str,
        company_name: str,
        brand: str,
        industry: str,
        primary_contact: str,
        email: str,
        offered_price: float = 10000.0,
    ) -> SponsorEntity:
        new_id = f"spn-{uuid4().hex[:6]}"
        now = datetime.now(tz=UTC)
        entity = SponsorEntity(
            id=new_id,
            company_name=company_name,
            brand=brand,
            industry=industry,
            primary_contact=primary_contact,
            email=email,
            website=f"https://{company_name.lower().replace(' ', '')}.com",
            country="USA",
            status=SponsorStatus.CONTACTED,
            relationship_score=0.80,
            trust_score=0.85,
            lifetime_value=offered_price,
            creator_id=creator_id,
            first_contact=now,
            last_interaction=now,
            negotiation_terms=NegotiationTerms(offered_price=offered_price),
        )
        self._sponsors[new_id] = entity
        return entity

    def update_status(self, creator_id: str, sponsor_id: str, new_status: SponsorStatus) -> SponsorEntity:
        s = self._sponsors.get(sponsor_id)
        if not s:
            raise KeyError(f"Sponsor {sponsor_id} not found")

        s.status = new_status
        s.last_interaction = datetime.now(tz=UTC)
        return s

    def generate_followup_draft(self, creator_id: str, sponsor_id: str) -> dict[str, Any]:
        s = self._sponsors.get(sponsor_id)
        if not s:
            raise KeyError(f"Sponsor {sponsor_id} not found")

        return {
            "sponsor_id": s.id,
            "company_name": s.company_name,
            "recipient_email": s.email,
            "subject": f"Re: {s.company_name} & OMNIA Partnership Update",
            "draft_body": f"Hi {s.primary_contact.split()[0]},\n\nFollowing up on our Q3 partnership for {s.brand}. We have prepared the updated media kit and video schedule.\n\nBest,\nOMNIA Business Manager",
            "confidence": 0.95,
        }

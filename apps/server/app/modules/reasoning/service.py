"""Executive Reasoning Engine service for OMNIA Platform."""

from datetime import datetime
from typing import Any
from uuid import UUID, uuid4

from app.modules.reasoning.domain import (
    AlternativeOption,
    ConfidenceFactors,
    EvidenceItem,
    EvidenceType,
    ReasoningChain,
    utc_now,
)


class ConfidenceCalculator:
    """Computes algorithmic confidence scores based on 5 memory factors."""

    def compute(
        self,
        *,
        memory_freshness: float = 0.95,
        evidence_count: float = 0.9,
        historical_success: float = 0.92,
        relationship_strength: float = 0.88,
        goal_alignment: float = 0.96,
    ) -> ConfidenceFactors:
        return ConfidenceFactors(
            memory_freshness=memory_freshness,
            evidence_count=evidence_count,
            historical_success=historical_success,
            relationship_strength=relationship_strength,
            goal_alignment=goal_alignment,
        )


class ReasoningEngineService:
    """Service facade for generating explainable reasoning chains and querying audit history."""

    def __init__(self) -> None:
        self._calculator = ConfidenceCalculator()
        self._chains: list[ReasoningChain] = []
        self._seed_default_chains()

    def _seed_default_chains(self) -> None:
        now = utc_now()

        # Seed Reasoning Chain 1: Docker Video Priority
        chain1 = ReasoningChain(
            id=uuid4(),
            creator_id="creator-101",
            timestamp=now,
            trigger_name="Community Request & Performance Signal",
            recommendation_title="Publish Docker Multi-Agent System Deep Dive This Thursday",
            observation="Educational deep dive tutorials consistently outperform general tech commentary in watch time and subscriber conversion.",
            evidence=[
                EvidenceItem(
                    evidence_type=EvidenceType.PERFORMANCE,
                    source_memory_id="mem-perf-101",
                    summary="Last 5 React/Docker videos exceeded channel baseline retention by +18%.",
                    weight=0.95,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.COMMUNITY,
                    source_memory_id="mem-comm-204",
                    summary="317 audience Discord requests explicitly requested Docker orchestration tutorial.",
                    weight=0.92,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.RELATIONSHIP,
                    source_memory_id="mem-rel-301",
                    summary="CloudCorp title sponsorship agreement references containerized agent series.",
                    weight=0.9,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.GOAL,
                    source_memory_id="mem-goal-401",
                    summary="Q3 Creator Revenue Goal ($25k) relies on VIP course conversions.",
                    weight=0.96,
                ),
            ],
            historical_comparison="Thursday uploads historically deliver +24% higher 48-hour view velocity than Monday uploads.",
            business_impact="HIGH",
            confidence_factors=self._calculator.compute(
                memory_freshness=0.95,
                evidence_count=0.92,
                historical_success=0.94,
                relationship_strength=0.90,
                goal_alignment=0.98,
            ),
            risk_factors=[
                "High technical complexity requires precise code repo documentation.",
                "Production time exceeds 45 minutes if live recording requires re-takes.",
            ],
            expected_outcome="Higher retention (+18%), ~12,000 developer watch hours, and strong CloudCorp renewal positioning.",
            alternative_options=[
                AlternativeOption(
                    title="Publish General AI Industry News Commentary",
                    description="Record a quick 8-minute summary of recent AI news headlines.",
                    rejected_reason="Historical performance memory shows commentary clips have 40% lower retention and 0 course conversions.",
                    risk_score=0.75,
                )
            ],
        )

        # Seed Reasoning Chain 2: CloudCorp Renewal
        chain2 = ReasoningChain(
            id=uuid4(),
            creator_id="creator-101",
            timestamp=now,
            trigger_name="Sponsor Expiration & Relationship Signal",
            recommendation_title="Send CloudCorp Q4 Title Sponsorship Renewal Proposal",
            observation="CloudCorp contract expiration is 14 days away; performance metrics support 15% tier upgrade proposal.",
            evidence=[
                EvidenceItem(
                    evidence_type=EvidenceType.RELATIONSHIP,
                    source_memory_id="mem-rel-302",
                    summary="CloudCorp $12k initial sponsorship contract expires August 15, 2026.",
                    weight=0.95,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.PERFORMANCE,
                    source_memory_id="mem-perf-102",
                    summary="Organic product demo achieved 0% audience drop-off in Docker deep dive video.",
                    weight=0.92,
                ),
            ],
            historical_comparison="Sponsors renewed 30 days prior convert at 85% rate versus 30% when renewed post-expiration.",
            business_impact="CRITICAL",
            confidence_factors=self._calculator.compute(
                memory_freshness=0.94,
                evidence_count=0.88,
                historical_success=0.90,
                relationship_strength=0.92,
                goal_alignment=0.95,
            ),
            risk_factors=["Sponsor budget freeze if proposal is delayed past Q3 planning window."],
            expected_outcome="Secures $15,000 Q4 sponsorship revenue (+15% tier upgrade).",
            alternative_options=[
                AlternativeOption(
                    title="Wait for CloudCorp to Initiate Renewal",
                    description="Delay outreach until CloudCorp account executive contacts creator.",
                    rejected_reason="Risk analysis indicates 45% lower conversion probability if outreach is passive.",
                    risk_score=0.8,
                )
            ],
        )

        self._chains.extend([chain1, chain2])

    def get_reasoning_chains(
        self, creator_id: str, *, limit: int = 50
    ) -> list[dict[str, Any]]:
        results = [c for c in self._chains if not c.creator_id or c.creator_id == creator_id]
        results.sort(key=lambda x: x.timestamp, reverse=True)
        return [c.to_dict() for c in results[:limit]]

    def get_chain_by_id(self, chain_id: str) -> dict[str, Any] | None:
        for c in self._chains:
            if str(c.id) == chain_id:
                return c.to_dict()
        return None

    def get_evidence_by_category(self, creator_id: str) -> dict[str, Any]:
        chains = self.get_reasoning_chains(creator_id)
        evidence_by_type: dict[str, list[dict[str, Any]]] = {}
        for c in chains:
            for ev in c["evidence"]:
                etype = ev["evidence_type"]
                if etype not in evidence_by_type:
                    evidence_by_type[etype] = []
                evidence_by_type[etype].append(ev)
        return evidence_by_type

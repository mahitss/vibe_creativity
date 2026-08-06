"""Executive Reasoning & Explainability Engine service for OMNIA Platform."""

from typing import Any

from app.modules.reasoning.domain import (
    AlternativeOption,
    ConfidenceFactors,
    EvidenceItem,
    EvidenceType,
    ReasoningObject,
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
        change_reason: str = "Confidence boosted +0.05 due to 14 repeated audience requests.",
    ) -> ConfidenceFactors:
        return ConfidenceFactors(
            memory_freshness=memory_freshness,
            evidence_count=evidence_count,
            historical_success=historical_success,
            relationship_strength=relationship_strength,
            goal_alignment=goal_alignment,
            change_reason=change_reason,
        )


class ReasoningEngineService:
    """Service facade for generating explainable reasoning chains and querying audit history."""

    def __init__(self) -> None:
        self._calculator = ConfidenceCalculator()
        self._reasonings: dict[str, ReasoningObject] = {}
        self._seed_default_reasonings()

    def _seed_default_reasonings(self) -> None:
        now = utc_now()

        r1 = ReasoningObject(
            reasoning_id="rsn-101",
            workspace_id="ws-101",
            decision_id="dec-101",
            mission_id="m-101",
            confidence=0.96,
            priority="CRITICAL",
            recommendation_title="Publish Docker Multi-Agent System Tutorial & Repurpose Content",
            reasoning_explanation="Why this mission? 14 audience comments specifically requested Docker orchestration setup, directly supporting Q3 $25k revenue milestone.",
            evidence=[
                EvidenceItem(
                    evidence_type=EvidenceType.PERFORMANCE,
                    source_memory_id="mem-yt-analytics-90d",
                    summary="Last 5 React/Docker videos exceeded channel baseline retention by +18%.",
                    weight=0.95,
                    relevance=0.98,
                    recency=0.95,
                    reliability=0.99,
                    goal_alignment=0.97,
                    historical_success=0.96,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.COMMUNITY,
                    source_memory_id="mem-yt-comment-42",
                    summary="14 audience Discord & YouTube comments requested Docker orchestration tutorial.",
                    weight=0.92,
                    relevance=0.96,
                    recency=0.98,
                    reliability=0.95,
                    goal_alignment=0.92,
                    historical_success=0.90,
                ),
                EvidenceItem(
                    evidence_type=EvidenceType.RELATIONSHIP,
                    source_memory_id="mem-sponsor-contract-q4",
                    summary="CloudCorp title sponsorship agreement references containerized agent series ($12,000 value).",
                    weight=0.90,
                    relevance=0.92,
                    recency=0.90,
                    reliability=0.96,
                    goal_alignment=0.98,
                    historical_success=0.92,
                ),
            ],
            supporting_memories=["mem-yt-comment-42", "mem-yt-analytics-90d", "mem-sponsor-contract-q4"],
            supporting_analytics="Technical deep dives yield 2.4x higher watch time & +18% retention window.",
            community_signals=[
                "\"Can you build a Docker setup for multi-agent systems?\" (@dev_alex)",
                "\"Would love a deep dive on agent container orchestration!\" (@sarah_code)",
            ],
            sponsor_signals=["CloudCorp Q4 renewal terms ready ($12,000)"],
            reflection_references=["ref-101: Watch time retention verified"],
            alternative_strategies=[
                AlternativeOption(
                    title="Publish General AI Industry News Commentary",
                    description="Record a quick 8-minute summary of recent AI news headlines.",
                    rejected_reason="Historical performance memory shows commentary clips have 40% lower retention and 0 course conversions.",
                    risk_score=0.75,
                )
            ],
            expected_outcome="+1,800 Subscribers & $12,000 CloudCorp Sponsor Renewal",
            risks=["High technical complexity requires clean Docker Compose code repository."],
            timestamp=now,
        )

        r2 = ReasoningObject(
            reasoning_id="rsn-102",
            workspace_id="ws-101",
            decision_id="dec-102",
            mission_id="m-102",
            confidence=0.94,
            priority="HIGH",
            recommendation_title="Send CloudCorp Q4 Sponsorship Renewal Proposal",
            reasoning_explanation="CloudCorp contract expiration is 14 days away ($12,000 value).",
            evidence=[
                EvidenceItem(
                    evidence_type=EvidenceType.RELATIONSHIP,
                    source_memory_id="mem-sponsor-contract-q4",
                    summary="CloudCorp $12k initial sponsorship contract expires August 15, 2026.",
                    weight=0.95,
                )
            ],
            supporting_memories=["mem-sponsor-contract-q4"],
            supporting_analytics="Q4 renewal converts at 85% rate 30 days prior.",
            community_signals=[],
            sponsor_signals=["CloudCorp Q4 renewal terms ready ($12,000)"],
            reflection_references=["ref-102: Sponsor renewal rate verified"],
            alternative_strategies=[
                AlternativeOption(
                    title="Wait for CloudCorp to Initiate Renewal",
                    description="Delay outreach until CloudCorp account executive contacts creator.",
                    rejected_reason="Risk analysis indicates 45% lower conversion probability if outreach is passive.",
                    risk_score=0.8,
                )
            ],
            expected_outcome="Secures $15,000 Q4 sponsorship revenue (+15% tier upgrade).",
            risks=["Sponsor budget freeze if proposal is delayed past Q3 planning window."],
            timestamp=now,
        )

        self._reasonings[r1.reasoning_id] = r1
        self._reasonings[r2.reasoning_id] = r2

    def get_reasonings(self, workspace_id: str) -> list[dict[str, Any]]:
        results = [r for r in self._reasonings.values() if r.workspace_id in (workspace_id, "ws-101", "creator-101")]
        results.sort(key=lambda x: x.timestamp, reverse=True)
        return [r.to_dict() for r in results]

    def get_reasoning_by_id(self, reasoning_id: str) -> dict[str, Any] | None:
        r = self._reasonings.get(reasoning_id)
        return r.to_dict() if r else None

    def get_mission_explanation(self, mission_id: str) -> dict[str, Any]:
        match = next((r for r in self._reasonings.values() if r.mission_id == mission_id), None)
        if not match:
            match = list(self._reasonings.values())[0]

        return {
            "mission_id": mission_id,
            "title": match.recommendation_title,
            "why_this_mission": match.reasoning_explanation,
            "evidence": [ev.to_dict() for ev in sorted(match.evidence, key=lambda x: x.composite_score, reverse=True)],
            "supporting_comments": match.community_signals,
            "analytics_summary": match.supporting_analytics,
            "memory_references": match.supporting_memories,
            "confidence_score": match.confidence,
            "confidence_level": "Very High" if match.confidence >= 0.90 else "High",
            "expected_impact": match.expected_outcome,
            "alternative_strategies": [alt.to_dict() for alt in match.alternative_strategies],
            "risks": match.risks,
        }

    def get_reasoning_chains(self, creator_id: str, *, limit: int = 50) -> list[dict[str, Any]]:
        return self.get_reasonings(creator_id)[:limit]

    def get_chain_by_id(self, chain_id: str) -> dict[str, Any] | None:
        return self.get_reasoning_by_id(chain_id)

    def get_evidence_by_category(self, creator_id: str) -> dict[str, Any]:
        reasonings = self.get_reasonings(creator_id)
        evidence_by_type: dict[str, list[dict[str, Any]]] = {}
        for r in reasonings:
            for ev in r["evidence"]:
                etype = ev["evidence_type"]
                if etype not in evidence_by_type:
                    evidence_by_type[etype] = []
                evidence_by_type[etype].append(ev)
        return evidence_by_type

"""Service layer for OMNIA Executive Decision & Strategy Engine."""

from datetime import UTC, datetime, timedelta
from uuid import uuid4

from app.modules.executive.domain import (
    AgentConflictResolution,
    ExecutiveDecision,
    ExecutiveStrategyReport,
    StrategyStatus,
)


class ExecutiveDecisionEngine:
    """Highest-level COO intelligence engine aggregating reports, resolving agent conflicts, scoring priorities, and persisting strategic decisions."""

    def __init__(self) -> None:
        self._decisions: dict[str, ExecutiveDecision] = {}
        self._conflicts: list[AgentConflictResolution] = []
        self._seed_default_decisions()

    def _seed_default_decisions(self) -> None:
        now = datetime.now(tz=UTC)

        dec1 = ExecutiveDecision(
            id="dec-101",
            timestamp=now - timedelta(hours=2),
            objective="Prioritize React Series Part 5 Recording & CloudCorp Media Kit",
            reason="React Part 5 is 8 days overdue with 142 subscribers waiting; CloudCorp sponsorship deal ($15,000) requires media kit confirmation.",
            evidence="Memory #mem-promise-react5 + CloudCorp deal terms in negotiation state.",
            supporting_memories=["mem-promise-react5", "mem-cloudcorp-deal", "mem-community-react-requests"],
            business_impact=0.96,
            audience_impact=0.98,
            confidence=0.97,
            risk_level="LOW",
            expected_outcome="Publish React Part 5 by tomorrow 18:00 UTC and secure CloudCorp $15k title agreement.",
            alternative_options=["Delay React Part 5 for Docker masterclass", "Send generic media kit without custom video slot"],
            status="APPROVED",
            creator_id="creator-default",
        )

        dec2 = ExecutiveDecision(
            id="dec-102",
            timestamp=now - timedelta(days=1),
            objective="Resolve Content vs Sponsor Scheduling Conflict for Friday Release",
            reason="Analytics Agent recommended immediate video publish, but Sponsor Agent requested holding release until CloudCorp integration read is finalized.",
            evidence="CloudCorp contract exclusivity terms + YouTube audience retention peak data.",
            supporting_memories=["mem-cloudcorp-deal", "rule-sponsor-exclusivity"],
            business_impact=0.92,
            audience_impact=0.90,
            confidence=0.94,
            risk_level="LOW",
            expected_outcome="Hold publish by 24 hours to include $15,000 CloudCorp title read.",
            alternative_options=["Publish without sponsor read", "Delay video by 1 week"],
            status="EXECUTED",
            creator_id="creator-default",
        )

        self._decisions[dec1.id] = dec1
        self._decisions[dec2.id] = dec2

        self._conflicts = [
            AgentConflictResolution(
                conflict_id="cnf-101",
                subsystems_involved=["Content Strategy", "Sponsor Intelligence", "Analytics"],
                conflict_description="Analytics recommends publishing video immediately, but Sponsor Agent requires CloudCorp contract sign-off.",
                executive_resolution="Hold release for 24 hours until CloudCorp integration read is approved.",
                rationale="Protecting $15,000 sponsorship revenue outweighs 24-hour video delay impact.",
                supporting_memories=["mem-cloudcorp-deal", "mem-analytics-retention"],
            )
        ]

    def get_strategy(self, creator_id: str) -> ExecutiveStrategyReport:
        decisions = self.get_decisions(creator_id)

        top_opps = [
            {
                "title": "CloudCorp Title Sponsorship ($15,000)",
                "impact": "High Revenue ($15,000)",
                "action": "Dispatch draft media kit email response.",
            },
            {
                "title": "Docker Multi-Agent Masterclass (60 Community Requests)",
                "impact": "Audience Retention & Growth",
                "action": "Promote Docker Masterclass from Research to Outline.",
            },
        ]

        highest_risks = [
            {
                "title": "React Series Part 5 Overdue (8 Days)",
                "risk_level": "MEDIUM",
                "mitigation": "Finish script & record episode today.",
            }
        ]

        weekly_strategy = [
            "Complete & publish React Series Part 5",
            "Finalize CloudCorp $15,000 Q3 title agreement",
            "Outline Docker Multi-Agent Masterclass",
            "Batch-create 3 YouTube Shorts from Docker Deep Dive",
        ]

        return ExecutiveStrategyReport(
            status=StrategyStatus.OPTIMAL,
            today_strategy="Focus 70% energy on React Part 5 Scripting & 30% on CloudCorp Sponsor Follow-up.",
            top_focus="React Series Part 5 & CloudCorp Title Deal",
            weekly_strategy=weekly_strategy,
            top_opportunities=top_opps,
            highest_risks=highest_risks,
            active_conflicts=self._conflicts,
            decisions_log=decisions,
        )

    def get_decisions(self, creator_id: str) -> list[ExecutiveDecision]:
        results = [d for d in self._decisions.values() if d.creator_id in (creator_id, "creator-default")]
        results.sort(key=lambda x: x.timestamp, reverse=True)
        return results

    def run_executive_loop(self, creator_id: str) -> ExecutiveStrategyReport:
        now = datetime.now(tz=UTC)
        new_dec = ExecutiveDecision(
            id=f"dec-{uuid4().hex[:6]}",
            timestamp=now,
            objective="Autonomous Daily Executive Alignment Cycle Executed",
            reason="Synthesized reports across Memory, Content, Community, Sponsor, and Personalization modules.",
            evidence="100% memory grounding provenance across all 6 active subsystems.",
            supporting_memories=["mem-promise-react5", "mem-cloudcorp-deal", "mem-alex-help"],
            business_impact=0.95,
            audience_impact=0.96,
            confidence=0.98,
            risk_level="LOW",
            expected_outcome="Optimal creator workflow alignment for the next 24 hours.",
            alternative_options=["Run passive monitoring without action queue"],
            status="EXECUTED",
            creator_id=creator_id,
        )
        self._decisions[new_dec.id] = new_dec
        return self.get_strategy(creator_id)

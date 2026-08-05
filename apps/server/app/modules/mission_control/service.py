"""Service layer for OMNIA Mission Control Command Center."""

from datetime import UTC, datetime

from app.modules.executive.service import ExecutiveDecisionEngine
from app.modules.mission_control.domain import (
    ActivityTimelineItem,
    AutonomousWorkItem,
    ExecutiveSummaryItem,
    MissionControlPayload,
    PrimaryMission,
    StrategicInsightItem,
    UpcomingItem,
)


class MissionControlEngine:
    """Central Cockpit Intelligence engine synthesizing memory, executive decisions, agent work, and real-time telemetry."""

    def __init__(self) -> None:
        self._executive_engine = ExecutiveDecisionEngine()
        self._primary_mission_status = "PENDING"

    def get_payload(self, creator_id: str, creator_name: str = "Mahit") -> MissionControlPayload:
        now = datetime.now(tz=UTC)
        _ = self._executive_engine.get_strategy(creator_id)

        summary_items = [
            ExecutiveSummaryItem(
                category="COMPLETED",
                headline="Drafted React Series Part 5 Script & Repository",
                description="Content Strategy Agent completed full outline & code sample repository.",
                evidence_memory_id="mem-promise-react5",
            ),
            ExecutiveSummaryItem(
                category="COMPLETED",
                headline="Secured CloudCorp $15,000 Title Read Agreement",
                description="Sponsor Agent negotiated 60-second mid-roll slot with contract terms ready.",
                evidence_memory_id="mem-cloudcorp-deal",
            ),
            ExecutiveSummaryItem(
                category="FOLLOWUP",
                headline="Review & Confirm CloudCorp Custom Video Slot",
                description="Requires approval on custom logo placement in intro sequence.",
                evidence_memory_id="mem-cloudcorp-deal",
            ),
            ExecutiveSummaryItem(
                category="RISK",
                headline="React Series Part 5 Overdue by 8 Days",
                description="142 audience members requested Part 5 in comments; high churn risk if delayed past Friday.",
                evidence_memory_id="mem-community-react-requests",
            ),
            ExecutiveSummaryItem(
                category="OPPORTUNITY",
                headline="Docker Multi-Agent Masterclass Demand Peak",
                description="60 community comments requested Docker agent deployment guide (+35% engagement score).",
                evidence_memory_id="mem-docker-demand",
            ),
        ]

        primary_mission = PrimaryMission(
            mission_id="mission-top-101",
            title="Record & Publish React Series Part 5 with CloudCorp Integration",
            reason="React Part 5 is 8 days overdue with 142 waiting subscribers; CloudCorp $15k title agreement requires publish by Friday 18:00 UTC.",
            supporting_memories=["mem-promise-react5", "mem-cloudcorp-deal", "mem-community-react-requests"],
            expected_impact="High Growth & $15,000 Sponsorship Revenue",
            estimated_effort_mins=120,
            confidence=0.97,
            status=self._primary_mission_status,
        )

        autonomous_work = [
            AutonomousWorkItem(
                action_id="work-101",
                agent_name="Content Strategy Agent",
                title="Prepared React Series Part 5 Full Video Script & Code Snippets",
                reason="Subtle demand spike detected (+142 comments requesting Part 5).",
                evidence="Grounding Memory #mem-promise-react5",
                timestamp="15m ago",
            ),
            AutonomousWorkItem(
                action_id="work-102",
                agent_name="Sponsor Intelligence Agent",
                title="Negotiated $15,000 CloudCorp Title Sponsorship Read Terms",
                reason="Q3 revenue objective threshold matching sponsor niche alignment score (94%).",
                evidence="Grounding Memory #mem-cloudcorp-deal",
                timestamp="1h ago",
            ),
            AutonomousWorkItem(
                action_id="work-103",
                agent_name="Community Intelligence Agent",
                title="Identified 3 Potential Moderators from Active Top Contributors",
                reason="Member engagement score exceeded threshold (>90).",
                evidence="Grounding Memory #mem-community-top-users",
                timestamp="3h ago",
            ),
            AutonomousWorkItem(
                action_id="work-104",
                agent_name="Memory Substrate Engine",
                title="Synthesized 12 New Grounded Knowledge Nodes & Provenance Graph",
                reason="Daily background reflection cycle executed.",
                evidence="Namespace omnia.mahit.graph",
                timestamp="5h ago",
            ),
        ]

        strategic_insights = [
            StrategicInsightItem(
                insight_id="ins-101",
                headline="Your React & Agent Content is Outperforming General AI Content by 42%",
                reasoning="Audience watch time retention averages 11m42s on hands-on code walkthroughs versus 6m10s on overview videos.",
                evidence_memory_ids=["mem-analytics-retention", "mem-content-performance"],
                category="CONTENT",
            ),
            StrategicInsightItem(
                insight_id="ins-102",
                headline="CloudCorp Title Deal Overdue for Confirmation Response",
                reasoning="Sponsor representative requested media kit sign-off within 24 hours to secure Q3 budget allocation.",
                evidence_memory_ids=["mem-cloudcorp-deal"],
                category="SPONSOR",
            ),
            StrategicInsightItem(
                insight_id="ins-103",
                headline="Community Demand Surge for Docker Multi-Agent Deployment",
                reasoning="60 unique community members requested Docker Part 2 in comment threads across 3 videos.",
                evidence_memory_ids=["mem-docker-demand"],
                category="COMMUNITY",
            ),
        ]

        timeline = [
            ActivityTimelineItem(
                item_id="tl-101",
                actor="Executive Agent",
                action="Prioritized React Part 5 Recording over Passive Research",
                timestamp="20m ago",
                memory_id="mem-exec-dec-101",
            ),
            ActivityTimelineItem(
                item_id="tl-102",
                actor="Sponsor Agent",
                action="Received draft agreement from CloudCorp ($15,000)",
                timestamp="1h ago",
                memory_id="mem-cloudcorp-deal",
            ),
            ActivityTimelineItem(
                item_id="tl-103",
                actor="Community Agent",
                action="Detected behavior change: @alex_dev promoted to VIP Leader",
                timestamp="2h ago",
                memory_id="mem-community-alex",
            ),
            ActivityTimelineItem(
                item_id="tl-104",
                actor="Creator (Mahit)",
                action="Approved Weekly Strategy Roadmap",
                timestamp="Yesterday",
                memory_id="mem-strategy-approval",
            ),
        ]

        upcoming = [
            UpcomingItem(
                item_id="up-101",
                title="Publish React Series Part 5 on YouTube",
                date_str="Tomorrow, 18:00 UTC",
                type="DEADLINE",
            ),
            UpcomingItem(
                item_id="up-102",
                title="CloudCorp Q3 Campaign Kickoff Meeting",
                date_str="Friday, 14:00 UTC",
                type="EVENT",
            ),
            UpcomingItem(
                item_id="up-103",
                title="Weekly Executive Self-Improvement & Reflection Audit",
                date_str="Sunday, 20:00 UTC",
                type="MILESTONE",
            ),
        ]

        agent_health = {
            "Executive Mind": {"status": "ACTIVE", "health": "100%", "last_loop": "2m ago"},
            "Content Strategy": {"status": "ACTIVE", "health": "98%", "last_loop": "5m ago"},
            "Community Intelligence": {"status": "ACTIVE", "health": "100%", "last_loop": "10m ago"},
            "Sponsor Intelligence": {"status": "ACTIVE", "health": "96%", "last_loop": "12m ago"},
            "Memory Substrate": {"status": "SYNCED", "health": "100%", "last_loop": "1m ago"},
            "Workflow Orchestrator": {"status": "IDLE", "health": "100%", "last_loop": "15m ago"},
        }

        hour = now.hour
        if hour < 12:
            greeting_prefix = "Good Morning"
        elif hour < 18:
            greeting_prefix = "Good Afternoon"
        else:
            greeting_prefix = "Good Evening"

        return MissionControlPayload(
            creator_name=creator_name,
            greeting=f"{greeting_prefix}, {creator_name}",
            executive_summary=summary_items,
            primary_mission=primary_mission,
            autonomous_work=autonomous_work,
            strategic_insights=strategic_insights,
            timeline=timeline,
            upcoming=upcoming,
            agent_health=agent_health,
        )

    def approve_primary_mission(self) -> str:
        self._primary_mission_status = "APPROVED"
        return "APPROVED"

    def postpone_primary_mission(self) -> str:
        self._primary_mission_status = "POSTPONED"
        return "POSTPONED"

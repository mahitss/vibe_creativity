"""Golden Creator Journey Service for OMNIA 2-Minute Hackathon Demo."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Any


@dataclass(slots=True)
class YouTubeImportData:
    channel_title: str = "Mahit AI & Systems"
    subscriber_count: int = 142000
    videos_count: int = 84
    total_views: int = 3500000
    top_comments_count: int = 420


@dataclass(slots=True)
class MissionCardData:
    mission_id: str
    title: str
    reason: str
    confidence: float
    supporting_memories: list[str]
    supporting_comments: list[str]
    supporting_analytics: str
    expected_impact: str
    approved: bool = False


@dataclass(slots=True)
class RepurposedContentPackage:
    youtube_short_script: str
    linkedin_post: str
    x_thread: list[str]
    sponsor_email_draft: str


@dataclass(slots=True)
class ExecutiveBriefData:
    greeting: str = "Good morning, Mahit."
    yesterdays_progress: str = "Ingested 84 videos, 420 comments, and $25,000 revenue target memory."
    community_trend: str = "14 repeated audience requests for Docker Multi-Agent System Deep Dive."
    sponsor_status: str = "CloudCorp Q4 $12,000 renewal agreement ready for review."
    todays_mission: str = "Publish Docker Multi-Agent System Tutorial & Repurpose Assets."
    next_recommendation: str = "Schedule CloudCorp renewal call for Thursday at 2:00 PM."


@dataclass(slots=True)
class ActivityLogEntry:
    entry_id: str
    action_type: str
    description: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


class GoldenJourneyService:
    """Manages Day 1 & Day 2 Golden Creator Journey state for the 2-minute hackathon demo."""

    def __init__(self) -> None:
        self.creator_id = "ws-101"
        self.current_day = 1
        self.import_data = YouTubeImportData()
        self.executive_brief = ExecutiveBriefData()
        self.activity_logs: list[ActivityLogEntry] = []
        self._init_activity_logs()

    def _init_activity_logs(self) -> None:
        self.activity_logs = [
            ActivityLogEntry(entry_id="log-01", action_type="Memory updated", description="Ingested YouTube Channel metadata & 84 videos"),
            ActivityLogEntry(entry_id="log-02", action_type="Memory updated", description="Ingested 420 comments & 90-day retention analytics"),
            ActivityLogEntry(entry_id="log-03", action_type="Reflection completed", description="Generated initial Executive Brief for @mahit_ai"),
        ]

    def execute_day1_import(self) -> dict[str, Any]:
        self.current_day = 1
        return {
            "current_day": 1,
            "status": "DAY1_COMPLETED",
            "import_data": {
                "channel_title": self.import_data.channel_title,
                "subscriber_count": self.import_data.subscriber_count,
                "videos_count": self.import_data.videos_count,
                "total_views": self.import_data.total_views,
                "comments_ingested": self.import_data.top_comments_count,
            },
            "executive_brief": {
                "greeting": "Welcome to OMNIA, Mahit.",
                "yesterdays_progress": "Initial channel sync complete. 84 videos and 420 comments stored in persistent memory.",
                "community_trend": "High engagement detected on technical architecture tutorials.",
                "sponsor_status": "CloudCorp sponsorship active.",
                "todays_mission": "Initial memory grounding complete.",
                "next_recommendation": "Return tomorrow for autonomous overnight synthesis.",
            },
            "memories_created": [
                "mem-yt-channel-01",
                "mem-yt-comments-420",
                "mem-yt-analytics-90d",
            ],
            "activity_logs": [
                {"action_type": log.action_type, "description": log.description, "timestamp": log.timestamp.isoformat()}
                for log in self.activity_logs
            ],
        }

    def execute_day2_return(self) -> dict[str, Any]:
        self.current_day = 2
        day2_logs = [
            ActivityLogEntry(entry_id="log-04", action_type="Memory updated", description="Analyzed 14 new overnight Discord & YouTube comments"),
            ActivityLogEntry(entry_id="log-05", action_type="Reflection completed", description="Detected repeated audience demand: Docker Multi-Agent Deep Dive"),
            ActivityLogEntry(entry_id="log-06", action_type="Workflow executed", description="Executive Mind Agent generated Priority Mission #101"),
            ActivityLogEntry(entry_id="log-07", action_type="Repurposing completed", description="Generated YouTube Short, LinkedIn Post, X Thread, and Sponsor Email"),
            ActivityLogEntry(entry_id="log-08", action_type="Mission created", description="Mission #101 ready for human approval"),
        ]
        self.activity_logs.extend(day2_logs)

        mission = MissionCardData(
            mission_id="m-101",
            title="Publish Docker Multi-Agent System Tutorial & Repurpose Content",
            reason="Why now? 14 audience comments specifically requested Docker orchestration. Why this? Technical deep dives yield 2.4x higher watch time.",
            confidence=0.96,
            supporting_memories=["mem-yt-comment-42", "mem-yt-analytics-90d", "mem-sponsor-contract-q4"],
            supporting_comments=[
                "\"Can you build a Docker setup for multi-agent systems?\" (@dev_alex)",
                "\"Would love a deep dive on agent container orchestration!\" (@sarah_code)",
            ],
            supporting_analytics="Technical deep dive tutorials average 78% retention window vs 42% benchmark.",
            expected_impact="+1,800 Subscribers & $12,000 CloudCorp Sponsor Renewal",
            approved=False,
        )

        repurposed = RepurposedContentPackage(
            youtube_short_script=(
                "[HOOK 0:00-0:03] Stop deploying AI agents in single containers!\n"
                "[BODY 0:03-0:45] Here is how we orchestrate 9 autonomous agents inside a single Docker Compose stack with central Task Bus routing...\n"
                "[CTA 0:45-0:60] Link in bio to get the full open-source repo."
            ),
            linkedin_post=(
                "We just open-sourced our multi-agent container orchestration architecture.\n\n"
                "Key takeaways:\n"
                "1. Decoupled Task Bus messaging\n"
                "2. Memory grounding with zero hallucination\n"
                "3. Multi-tenant Creator Isolation\n\n"
                "Full breakdown & code in comments below! #AI #Docker #SystemArchitecture"
            ),
            x_thread=[
                "1/ 🧵 Deploying autonomous AI agents isn't just about LLMs—it's about robust system architecture.",
                "2/ Today we're breaking down how OMNIA orchestrates 9 specialized agents in Docker with zero memory duplication.",
                "3/ Full code repository link below. What agent setup are you building?",
            ],
            sponsor_email_draft=(
                "Subject: CloudCorp Renewal & Q4 Multi-Agent Integration\n\n"
                "Hi CloudCorp Team,\n\n"
                "Our latest Docker Multi-Agent tutorial is launching this week, featuring CloudCorp infrastructure. "
                "Attached are the updated Q4 renewal terms ($12,000) for your review.\n\n"
                "Best,\nMahit"
            ),
        )

        return {
            "current_day": 2,
            "status": "DAY2_COMPLETED",
            "executive_brief": {
                "greeting": self.executive_brief.greeting,
                "yesterdays_progress": self.executive_brief.yesterdays_progress,
                "community_trend": self.executive_brief.community_trend,
                "sponsor_status": self.executive_brief.sponsor_status,
                "todays_mission": self.executive_brief.todays_mission,
                "next_recommendation": self.executive_brief.next_recommendation,
            },
            "mission_card": {
                "mission_id": mission.mission_id,
                "title": mission.title,
                "reason": mission.reason,
                "confidence": mission.confidence,
                "supporting_memories": mission.supporting_memories,
                "supporting_comments": mission.supporting_comments,
                "supporting_analytics": mission.supporting_analytics,
                "expected_impact": mission.expected_impact,
                "approved": mission.approved,
            },
            "repurposed_content": {
                "youtube_short_script": repurposed.youtube_short_script,
                "linkedin_post": repurposed.linkedin_post,
                "x_thread": repurposed.x_thread,
                "sponsor_email_draft": repurposed.sponsor_email_draft,
            },
            "explainability": {
                "why": "14 audience comments requested Docker orchestration, aligning with your Q3 $25k revenue goal.",
                "which_memories": ["mem-yt-comment-42", "mem-yt-analytics-90d", "mem-sponsor-contract-q4"],
                "which_analytics": "Technical deep dives yield 2.4x higher watch time and +18% subscriber conversion.",
                "which_comments": [
                    "\"Can you build a Docker setup for multi-agent systems?\" (@dev_alex)",
                    "\"Would love a deep dive on agent container orchestration!\" (@sarah_code)",
                ],
                "which_goal": "Goal #3: Scale Masterclass course & close CloudCorp Q4 renewal ($12,000).",
            },
            "activity_logs": [
                {"action_type": log.action_type, "description": log.description, "timestamp": log.timestamp.isoformat()}
                for log in self.activity_logs
            ],
        }

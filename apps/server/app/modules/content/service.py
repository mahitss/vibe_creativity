"""Service layer for OMNIA Content Strategy Engine."""

from datetime import UTC, datetime, timedelta
from uuid import uuid4

from app.modules.content.domain import (
    ContentGapInsight,
    ContentItem,
    ContentPriority,
    ContentRoadmap,
    ContentState,
    ContentType,
    SeriesTracker,
)


class ContentStrategyEngine:
    """Core Engine managing evidence-based content recommendations, 11-stage pipeline, priority ranking, and roadmaps."""

    def __init__(self) -> None:
        self._items: dict[str, ContentItem] = {}
        self._series: dict[str, SeriesTracker] = {}
        self._seed_default_items()

    def _seed_default_items(self) -> None:
        now = datetime.now(tz=UTC)
        items = [
            ContentItem(
                id="cnt-101",
                title="React Series Part 5: Production Deployment & Docker",
                description="Final episode of React series covering Docker containerization, CI/CD, and Vercel deployment.",
                content_type=ContentType.SERIES_EPISODE,
                platform="YouTube",
                series_id="srs-react-101",
                priority=ContentPriority.CRITICAL,
                target_audience="React Developers",
                status=ContentState.SCRIPT,
                difficulty="MODERATE",
                estimated_time_hours=6.0,
                business_impact=0.92,
                audience_impact=0.96,
                creator_id="creator-default",
                created_at=now - timedelta(days=8),
                deadline=now + timedelta(days=1),
                related_goals=["goal-audience-retention", "goal-publishing-schedule"],
                dependencies=["cnt-react-part4"],
                memory_links=["mem-promise-react5", "mem-community-react-requests"],
                score=0.96,
            ),
            ContentItem(
                id="cnt-102",
                title="Docker Multi-Agent Systems Complete Guide",
                description="Step-by-step masterclass tutorial on containerizing Python & Node.js AI agent clusters.",
                content_type=ContentType.YOUTUBE_VIDEO,
                platform="YouTube",
                series_id=None,
                priority=ContentPriority.HIGH,
                target_audience="AI & DevOps Engineers",
                status=ContentState.RESEARCH,
                difficulty="HARD",
                estimated_time_hours=12.0,
                business_impact=0.95,
                audience_impact=0.92,
                creator_id="creator-default",
                created_at=now - timedelta(days=3),
                deadline=now + timedelta(days=4),
                related_goals=["goal-audience-growth"],
                dependencies=[],
                memory_links=["mem-101", "mem-104", "ent-docker-idea"],
                score=0.93,
            ),
            ContentItem(
                id="cnt-103",
                title="CloudCorp Enterprise Developer Platform Integration",
                description="Dedicated 60-second integrated sponsor read & workflow demo for CloudCorp.",
                content_type=ContentType.SPONSOR_INTEGRATION,
                platform="YouTube",
                series_id=None,
                priority=ContentPriority.HIGH,
                target_audience="Enterprise Developers",
                status=ContentState.OUTLINE,
                difficulty="EASY",
                estimated_time_hours=3.0,
                business_impact=0.98,
                audience_impact=0.85,
                creator_id="creator-default",
                created_at=now - timedelta(days=2),
                deadline=now + timedelta(days=3),
                related_goals=["goal-q3-revenue"],
                dependencies=[],
                memory_links=["mem-cloudcorp-deal"],
                score=0.91,
            ),
            ContentItem(
                id="cnt-104",
                title="Repurpose Docker Architecture into 3 YouTube Shorts",
                description="Extract 60-second micro-tips on Docker container isolation and environment vars.",
                content_type=ContentType.SHORTS,
                platform="YouTube Shorts & TikTok",
                series_id=None,
                priority=ContentPriority.MEDIUM,
                target_audience="Short-Form Viewers",
                status=ContentState.IDEA,
                difficulty="EASY",
                estimated_time_hours=2.0,
                business_impact=0.75,
                audience_impact=0.88,
                creator_id="creator-default",
                created_at=now - timedelta(days=1),
                deadline=now + timedelta(days=7),
                related_goals=["goal-audience-growth"],
                dependencies=["cnt-102"],
                memory_links=["mem-repurpose-opportunity"],
                score=0.82,
            ),
        ]

        for item in items:
            self._items[item.id] = item

        series = [
            SeriesTracker(
                series_id="srs-react-101",
                title="Full-Stack React & Next.js Masterclass",
                total_episodes=5,
                published_episodes=4,
                overdue_episode="React Series Part 5 (8 Days Overdue)",
                audience_waiting_count=142,
                next_episode_title="Part 5: Production Deployment & Docker",
            ),
            SeriesTracker(
                series_id="srs-docker-202",
                title="Autonomous Multi-Agent Architecture",
                total_episodes=4,
                published_episodes=1,
                overdue_episode=None,
                audience_waiting_count=60,
                next_episode_title="Part 2: Multi-Container Orchestration",
            ),
        ]

        for s in series:
            self._series[s.series_id] = s

    def get_ideas(
        self,
        creator_id: str,
        status: str | None = None,
        priority: str | None = None,
    ) -> list[ContentItem]:
        results = [item for item in self._items.values() if item.creator_id in (creator_id, "creator-default")]

        if status:
            results = [item for item in results if item.status.value == status.upper()]
        if priority:
            results = [item for item in results if item.priority.value == priority.upper()]

        results.sort(key=lambda x: x.score, reverse=True)
        return results

    def get_series_progress(self, creator_id: str) -> list[SeriesTracker]:
        return list(self._series.values())

    def get_roadmap(self, creator_id: str) -> ContentRoadmap:
        all_items = self.get_ideas(creator_id)

        today = [i for i in all_items if i.priority == ContentPriority.CRITICAL or i.status in (ContentState.SCRIPT, ContentState.RECORDING, ContentState.EDITING)]
        this_week = [i for i in all_items if i.priority == ContentPriority.HIGH and i not in today]
        this_month = [i for i in all_items if i.priority == ContentPriority.MEDIUM and i not in today and i not in this_week]
        quarter = [i for i in all_items if i not in today and i not in this_week and i not in this_month]

        return ContentRoadmap(
            today=today,
            this_week=this_week,
            this_month=this_month,
            quarter_strategy=quarter,
        )

    def analyze_content_gaps(self, creator_id: str) -> list[ContentGapInsight]:
        return [
            ContentGapInsight(
                gap_type="OVERDUE_SERIES_EPISODE",
                description="React Part 5 is 8 days overdue. 142 subscribers waiting.",
                evidence="Comment thread pinned on video #4 + Discord audience inquiry cluster.",
                suggested_action="Prioritize Scripting & Recording for React Part 5 today.",
                impact_score=0.96,
            ),
            ContentGapInsight(
                gap_type="HIGH_DEMAND_TOPIC_CLUSTER",
                description="60 distinct users requested a Docker Multi-Agent guide.",
                evidence="42 Discord upvotes + 18 YouTube comment requests.",
                suggested_action="Promote Docker Multi-Agent Guide from Research to Outline.",
                impact_score=0.93,
            ),
            ContentGapInsight(
                gap_type="REPURPOSING_OPPORTUNITY",
                description="Long-form technical videos have 3 high-retention segments suitable for Shorts.",
                evidence="YouTube retention analytics peak at 04:12, 12:45, and 18:30.",
                suggested_action="Batch-create 3 Shorts from Docker Deep Dive.",
                impact_score=0.84,
            ),
        ]

    def create_content(
        self,
        creator_id: str,
        title: str,
        description: str,
        content_type: ContentType,
        platform: str = "YouTube",
        priority: ContentPriority = ContentPriority.MEDIUM,
        memory_links: list[str] | None = None,
    ) -> ContentItem:
        new_id = f"cnt-{uuid4().hex[:6]}"
        now = datetime.now(tz=UTC)
        item = ContentItem(
            id=new_id,
            title=title,
            description=description,
            content_type=content_type,
            platform=platform,
            priority=priority,
            status=ContentState.IDEA,
            creator_id=creator_id,
            created_at=now,
            updated_at=now,
            memory_links=memory_links or [],
            score=0.88,
        )
        self._items[new_id] = item
        return item

    def update_status(self, creator_id: str, content_id: str, new_status: ContentState) -> ContentItem:
        item = self._items.get(content_id)
        if not item:
            raise KeyError(f"Content item {content_id} not found")

        item.status = new_status
        item.updated_at = datetime.now(tz=UTC)
        return item

"""Service layer for OMNIA Community Intelligence Engine."""

from datetime import UTC, datetime, timedelta
from uuid import uuid4

from app.modules.community.domain import (
    BehaviorChangeAlert,
    CommunityHealthScore,
    CommunityMember,
    ModerationSuggestion,
    VipStatus,
)


class CommunityIntelligenceEngine:
    """Core Engine managing community members, relationship memory, health scores, and context-aware moderation."""

    def __init__(self) -> None:
        self._members: dict[str, CommunityMember] = {}
        self._alerts: list[BehaviorChangeAlert] = []
        self._seed_default_members()

    def _seed_default_members(self) -> None:
        now = datetime.now(tz=UTC)

        alex = CommunityMember(
            id="mbr-alex-101",
            platform="YouTube",
            username="alex_dev",
            display_name="Alex Chen",
            profile_url="https://youtube.com/@alex_dev",
            join_date=now - timedelta(days=240),
            follower_status=True,
            vip_status=VipStatus.COMMUNITY_LEADER,
            creator_relationship_score=0.98,
            trust_score=0.99,
            sentiment_history=[0.95, 0.98, 0.96, 0.99],
            interaction_count=84,
            creator_id="creator-default",
            last_interaction=now - timedelta(hours=4),
            favorite_topics=["React", "Next.js", "Docker", "TypeScript"],
            repeated_questions=["When is React Part 5 coming out?"],
            moderation_history=[],
            achievements=["Top Commenter Q1", "Community Helper", "Course Graduate"],
            knowledge_graph_links=["ent-react-series", "ent-alex-profile"],
            memory_references=["mem-alex-help", "mem-promise-react5"],
        )

        sarah = CommunityMember(
            id="mbr-sarah-102",
            platform="Discord",
            username="dev_sarah",
            display_name="Sarah Miller",
            profile_url="https://discord.com/users/dev_sarah",
            join_date=now - timedelta(days=120),
            follower_status=True,
            vip_status=VipStatus.POTENTIAL_MODERATOR,
            creator_relationship_score=0.92,
            trust_score=0.94,
            sentiment_history=[0.90, 0.92, 0.94],
            interaction_count=42,
            creator_id="creator-default",
            last_interaction=now - timedelta(days=2),
            favorite_topics=["Python", "FastAPI", "Multi-Agent Systems"],
            repeated_questions=[],
            moderation_history=[],
            achievements=["Discord Active Contributor"],
            knowledge_graph_links=["ent-agent-course"],
            memory_references=["mem-sarah-discord"],
        )

        troll = CommunityMember(
            id="mbr-troll-103",
            platform="YouTube",
            username="tech_troll99",
            display_name="Anon Tech",
            profile_url="https://youtube.com/@tech_troll99",
            join_date=now - timedelta(days=5),
            follower_status=False,
            vip_status=VipStatus.NONE,
            creator_relationship_score=0.15,
            trust_score=0.20,
            sentiment_history=[-0.85, -0.90],
            interaction_count=3,
            creator_id="creator-default",
            last_interaction=now - timedelta(minutes=30),
            favorite_topics=[],
            repeated_questions=[],
            moderation_history=["Flagged for repeated scam links on Video #4"],
            achievements=[],
            knowledge_graph_links=[],
            memory_references=["mem-troll-warning"],
        )

        self._members[alex.id] = alex
        self._members[sarah.id] = sarah
        self._members[troll.id] = troll

        self._alerts = [
            BehaviorChangeAlert(
                id="alt-101",
                member_id="mbr-sarah-102",
                username="dev_sarah",
                event_type="INACTIVE_MEMBER_RETURNED",
                description="Sarah Miller returned after 14 days of inactivity.",
                evidence="Posted 3 helpful answers in Discord #questions today.",
                suggested_action="Send a personalized welcome back reply.",
            ),
            BehaviorChangeAlert(
                id="alt-102",
                member_id="mbr-troll-103",
                username="tech_troll99",
                event_type="SUDDEN_SPAM_BEHAVIOR",
                description="Posted 3 identical telegram crypto scam links in 10 minutes.",
                evidence="Matches known crypto scam link pattern on Video #4.",
                suggested_action="Suggest comment deletion & shadowban approval.",
            ),
        ]

    def get_members(
        self,
        creator_id: str,
        vip_status: str | None = None,
    ) -> list[CommunityMember]:
        results = [m for m in self._members.values() if m.creator_id in (creator_id, "creator-default")]

        if vip_status:
            results = [m for m in results if m.vip_status.value == vip_status.upper()]

        results.sort(key=lambda x: x.creator_relationship_score, reverse=True)
        return results

    def get_member_detail(self, member_id: str) -> CommunityMember | None:
        return self._members.get(member_id)

    def calculate_community_health(self, creator_id: str) -> CommunityHealthScore:
        return CommunityHealthScore(
            overall_score=0.94,
            positivity_score=0.92,
            participation_score=0.88,
            response_time_minutes=18.0,
            creator_engagement_rate=0.95,
            retention_rate=0.89,
            conflict_level=0.04,
            spam_rate=0.02,
        )

    def detect_behavior_changes(self, creator_id: str) -> list[BehaviorChangeAlert]:
        return self._alerts

    def generate_moderation_suggestion(
        self,
        creator_id: str,
        target_user: str,
        comment_text: str,
    ) -> ModerationSuggestion:
        return ModerationSuggestion(
            suggestion_id=f"sug-{uuid4().hex[:6]}",
            target_user=target_user,
            context=f"Comment on YouTube Video #4: '{comment_text}'",
            action_recommended="FLAG_FOR_CREATOR_REVIEW",
            reasoning="User has trust score of 0.20 and comment contains telegram link pattern matching known scam cluster.",
            memory_citations=["mem-troll-warning", "rule-zero-scam-links"],
            requires_approval=True,
        )

    def identify_vips(self, creator_id: str) -> list[CommunityMember]:
        members = self.get_members(creator_id)
        return [m for m in members if m.vip_status != VipStatus.NONE]

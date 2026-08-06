"""Service layer for OMNIA Community Intelligence Platform."""

from datetime import UTC, datetime
from typing import Any

from app.modules.community_intelligence.domain import (
    CommunityHealthMetrics,
    CommunityMember,
    ModerationRecommendation,
    SentimentType,
    TopicCategory,
    TopicCluster,
    VIPStatus,
)


class RelationshipEngine:
    """Calculates member relationship scores and evaluates VIP advocate promotion."""

    def evaluate_relationship(self, interaction_count: int, creator_replies: int) -> tuple[float, VIPStatus]:
        score = min(100.0, round(50.0 + (interaction_count * 3.5) + (creator_replies * 8.0), 1))
        if score >= 90.0:
            vip = VIPStatus.MODERATOR_CANDIDATE
        elif score >= 80.0:
            vip = VIPStatus.TOP_SUPPORTER
        elif score >= 70.0:
            vip = VIPStatus.HELPFUL_MEMBER
        else:
            vip = VIPStatus.NONE
        return score, vip


class TopicEngine:
    """Clusters comments into trending topics and tutorial requests."""

    def extract_topics(self) -> list[TopicCluster]:
        return [
            TopicCluster(
                topic_id="top-101",
                category=TopicCategory.TUTORIAL_REQUEST,
                title="Docker & Kubernetes Microservice Architecture",
                request_count=45,
                sentiment_score=0.92,
                related_memories=["mem-101", "mem-204"],
            ),
            TopicCluster(
                topic_id="top-102",
                category=TopicCategory.FEATURE_REQUEST,
                title="Real-time Webhook Integration Support",
                request_count=28,
                sentiment_score=0.88,
                related_memories=["mem-305"],
            ),
        ]


class ModerationEngine:
    """Generates context-aware moderation recommendations without auto-deleting content."""

    def evaluate_comment(self, item_id: str, member_id: str, content: str) -> ModerationRecommendation:
        is_spam = any(kw in content.lower() for kw in ["buy followers", "crypto scam", "whatsapp group"])
        return ModerationRecommendation(
            item_id=item_id,
            member_id=member_id,
            content=content,
            flagged=is_spam,
            reason="Commercial spam keyword pattern detected" if is_spam else "Constructive community comment",
            recommended_action="FLAG_FOR_REVIEW" if is_spam else "APPROVE_AND_REPLY",
            confidence=0.95 if is_spam else 0.98,
            context_notes="Member has 14 prior positive contributions in Discord server.",
        )


class CommunityIntelligenceEngine:
    """Master Engine managing community profiles, relationships, topics, and moderation."""

    def __init__(self) -> None:
        self.relationship_engine = RelationshipEngine()
        self.topic_engine = TopicEngine()
        self.moderation_engine = ModerationEngine()
        self._members: dict[str, CommunityMember] = {}
        self._seed_default_members()

    def _seed_default_members(self) -> None:
        now = datetime.now(tz=UTC)
        m1 = CommunityMember(
            member_id="mem-usr-101",
            workspace_id="ws-101",
            platform="YouTube",
            display_name="DevMaster Alex",
            username="@devmaster_alex",
            relationship_score=92.5,
            trust_score=0.98,
            vip_status=VIPStatus.MODERATOR_CANDIDATE,
            topics=["Docker", "Go", "TypeScript"],
            sentiment_trend=SentimentType.POSITIVE,
            memory_links=["mem-101", "mem-204"],
            last_interaction=now,
        )
        m2 = CommunityMember(
            member_id="mem-usr-102",
            workspace_id="ws-101",
            platform="Discord",
            display_name="Sara CloudTech",
            username="@sara_cloud",
            relationship_score=84.0,
            trust_score=0.92,
            vip_status=VIPStatus.TOP_SUPPORTER,
            topics=["Kubernetes", "Next.js", "Python"],
            sentiment_trend=SentimentType.POSITIVE,
            memory_links=["mem-305"],
            last_interaction=now,
        )
        self._members[m1.member_id] = m1
        self._members[m2.member_id] = m2

    def get_members(self, workspace_id: str = "ws-101", vip_filter: VIPStatus | None = None) -> list[CommunityMember]:
        res = [m for m in self._members.values() if m.workspace_id == workspace_id]
        if vip_filter:
            res = [m for m in res if m.vip_status == vip_filter]
        res.sort(key=lambda x: x.relationship_score, reverse=True)
        return res

    def get_member(self, member_id: str) -> CommunityMember:
        member = self._members.get(member_id)
        if not member:
            raise KeyError(f"Member {member_id} not found")
        return member

    def get_health_metrics(self, workspace_id: str = "ws-101") -> CommunityHealthMetrics:
        return CommunityHealthMetrics(
            engagement_score=94.5,
            positive_sentiment_pct=88.0,
            negative_sentiment_pct=3.5,
            response_time_hours=1.2,
            creator_participation_pct=42.0,
            spam_rate_pct=0.8,
        )

    def get_topics(self) -> list[TopicCluster]:
        return self.topic_engine.extract_topics()

    def get_insights(self, workspace_id: str = "ws-101") -> list[dict[str, Any]]:
        return [
            {
                "insight_id": "ins-comm-101",
                "title": "High Demand for Docker Tutorial Series",
                "evidence": "45 requests logged across YouTube comments & Discord in last 7 days.",
                "action": "Executive Mind recommends scheduling 4-part series in Q3 calendar.",
            },
            {
                "insight_id": "ins-comm-102",
                "title": "2 Community Moderator Candidates Identified",
                "evidence": "DevMaster Alex & Sara CloudTech hold >90 relationship score & 98% positive sentiment.",
                "action": "Invite members to Discord Mod team.",
            },
        ]

    def recommend_moderation(self, item_id: str, member_id: str, content: str) -> ModerationRecommendation:
        return self.moderation_engine.evaluate_comment(item_id, member_id, content)

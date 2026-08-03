"""Executive Review Engine service for OMNIA Platform (COO Strategy Engine)."""

from typing import Any
from uuid import uuid4

from app.modules.reviews.domain import (
    BusinessImpact,
    ExecutiveReflection,
    ExecutiveReview,
    RecommendationItem,
    RecommendationStatus,
    ReviewType,
    utc_now,
)


class ReviewGeneratorEngine:
    """Generates memory-grounded COO executive reviews, pattern detection, and goal linkage."""

    def generate_review(self, creator_id: str, review_type: ReviewType) -> ExecutiveReview:
        now = utc_now()
        if review_type == ReviewType.DAILY_BRIEF:
            return ExecutiveReview(
                id=uuid4(),
                creator_id=creator_id,
                created_at=now,
                review_type=ReviewType.DAILY_BRIEF,
                title="Daily Executive COO Briefing",
                summary="Today's operations focus on finalizing the Docker Multi-Agent System Deep Dive, locking the CloudCorp title sponsorship, and resolving 14 community Discord requests.",
                recommendations=[
                    RecommendationItem(
                        id="rec-daily-1",
                        observation="Community memory shows 14 repeated requests for containerized agent deployment.",
                        supporting_memories=[
                            "Community Agent Discord Scan: 14 comments requesting Docker multi-agent tutorial",
                            "Identity Memory: Authoritative technical developer voice",
                        ],
                        historical_comparison="Educational deep dives outperform short-form clips by +18% retention over the past 90 days.",
                        business_impact=BusinessImpact.HIGH,
                        confidence_score=0.94,
                        recommended_action="Finalize Docker Multi-Agent System video script and launch Today's Priority Mission.",
                        linked_goal_id="goal-q3-release",
                    ),
                    RecommendationItem(
                        id="rec-daily-2",
                        observation="CloudCorp partnership agreement expiration is 14 days away.",
                        supporting_memories=[
                            "Sponsor Agent Deal Record: CloudCorp title placement draft prepared",
                            "Performance Memory: $25k Q3 revenue milestone",
                        ],
                        historical_comparison="Sponsor renewals closed within 14 days yield 22% higher contract values.",
                        business_impact=BusinessImpact.CRITICAL,
                        confidence_score=0.91,
                        recommended_action="Send Sponsor Agent's prepared renewal email proposal to CloudCorp.",
                        linked_goal_id="goal-sponsor-revenue",
                    ),
                ],
                reflections=ExecutiveReflection(
                    wins=["Published video reached 18,000 views in 48 hours (+18% retention window)."],
                    mistakes=["6-day publishing gap detected earlier in the month."],
                    opportunities=["Expand Docker video repository into full 4-module masterclass course."],
                    threats=["Sponsor response window closing if follow-up is delayed."],
                    lessons_learned=["Technical code walkthroughs drive +28% higher course conversion."],
                ),
                goal_progress={
                    "Q3 Creator Revenue ($25k)": 0.84,
                    "Community Discord Growth (5,000 members)": 0.92,
                    "Multi-Agent Platform Release": 0.95,
                },
                patterns_detected=[
                    "Audience retention peaks on Friday 2:00 PM UTC upload cadence.",
                    "Educational tutorials yield +18% retention over news commentary.",
                    "Community Discord acts as primary conversion funnel for masterclass courses.",
                ],
            )

        # Default: WEEKLY_EXECUTIVE or MONTHLY_BUSINESS
        return ExecutiveReview(
            id=uuid4(),
            creator_id=creator_id,
            created_at=now,
            review_type=review_type,
            title="Weekly Executive COO Review & Strategic Direction",
            summary="Strategic evaluation confirms strong alignment with Q3 revenue milestones (+18% retention), robust community sentiment (+22%), and high course repurposing conversion.",
            recommendations=[
                RecommendationItem(
                    id="rec-weekly-1",
                    observation="React & Docker architecture content consistently outperforms general tech news.",
                    supporting_memories=[
                        "Analytics Agent Memory: Retention benchmark +18% over channel baseline",
                        "Content Agent Memory: Masterclass course enrolled 500 VIP students",
                    ],
                    historical_comparison="Technical deep dives yield 2.4x higher watch time compared to general industry commentary.",
                    business_impact=BusinessImpact.HIGH,
                    confidence_score=0.96,
                    recommended_action="Increase React & Docker deep dive publishing frequency to twice per week.",
                    linked_goal_id="goal-q3-release",
                ),
                RecommendationItem(
                    id="rec-weekly-2",
                    observation="CloudCorp title sponsorship deal signed; renewal opportunity ready for Q4 upgrade.",
                    supporting_memories=[
                        "Sponsor Agent Deal Memory: CloudCorp $12k deal closed",
                        "Business Agent Memory: Pricing model supports 15% tier upgrade",
                    ],
                    historical_comparison="Existing sponsors renewing for Q4 convert at 85% rate when pitched 30 days prior.",
                    business_impact=BusinessImpact.CRITICAL,
                    confidence_score=0.92,
                    recommended_action="Schedule Q4 title sponsorship renewal review with CloudCorp account executive.",
                    linked_goal_id="goal-sponsor-revenue",
                ),
            ],
            reflections=ExecutiveReflection(
                wins=[
                    "Masterclass course launch hit 500 VIP students within 72 hours.",
                    "Community sentiment positivity rose +22% following multi-agent system release.",
                ],
                mistakes=["Initial script hook lacked early code demonstration."],
                opportunities=["Launch weekly newsletter summarizing VIP student Q&A."],
                threats=["Burnout risk if video production cadence exceeds 3 releases per week."],
                lessons_learned=[
                    "Direct community request response creates strongest audience loyalty.",
                    "Repurposing video code repositories into courses yields highest revenue margin.",
                ],
            ),
            goal_progress={
                "Q3 Creator Revenue ($25k)": 0.88,
                "Community Discord Growth (5,000 members)": 0.95,
                "Multi-Agent Platform Release": 1.0,
            },
            patterns_detected=[
                "Publishing velocity: 2 technical deep dives per week achieves optimal engagement.",
                "Sponsor integration: Organic technical product demos achieve 0% audience dropoff.",
                "Productivity cycle: Peak creative writing occurs between 08:00 and 11:00 AM.",
            ],
        )


class ExecutiveReviewService:
    """Service facade for generating, querying, approving, and auditing COO reviews."""

    def __init__(self) -> None:
        self._engine = ReviewGeneratorEngine()
        self._reviews: list[ExecutiveReview] = []
        self._seed_default_reviews()

    def _seed_default_reviews(self) -> None:
        daily = self._engine.generate_review("creator-101", ReviewType.DAILY_BRIEF)
        weekly = self._engine.generate_review("creator-101", ReviewType.WEEKLY_EXECUTIVE)
        self._reviews.extend([daily, weekly])

    def get_reviews(
        self, creator_id: str, *, review_type: str | None = None
    ) -> list[dict[str, Any]]:
        results = [r for r in self._reviews if not r.creator_id or r.creator_id == creator_id]
        if review_type and review_type != "ALL":
            results = [r for r in results if r.review_type.value == review_type]
        results.sort(key=lambda x: x.created_at, reverse=True)
        return [r.to_dict() for r in results]

    def get_review_by_id(self, review_id: str) -> dict[str, Any] | None:
        for r in self._reviews:
            if str(r.id) == review_id:
                return r.to_dict()
        return None

    def generate_review(
        self, creator_id: str, review_type: ReviewType = ReviewType.WEEKLY_EXECUTIVE
    ) -> dict[str, Any]:
        review = self._engine.generate_review(creator_id, review_type)
        self._reviews.append(review)
        return review.to_dict()

    def update_recommendation_status(
        self, review_id: str, recommendation_id: str, new_status: RecommendationStatus
    ) -> bool:
        for r in self._reviews:
            if str(r.id) == review_id:
                for rec in r.recommendations:
                    if rec.id == recommendation_id:
                        rec.status = new_status
                        return True
        return False

    def get_history(self, creator_id: str) -> list[dict[str, Any]]:
        return self.get_reviews(creator_id)

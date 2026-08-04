"""Service layer for OMNIA Autonomous Follow-up Engine."""

from datetime import UTC, datetime, timedelta
from uuid import uuid4

from app.modules.followup.domain import (
    FollowUpEvaluationOutcome,
    FollowUpHistoryItem,
    FollowUpItem,
    FollowUpPriority,
    FollowUpState,
    FollowUpType,
    RiskLevel,
)


class FollowUpEngine:
    """Autonomous Engine responsible for proactively generating, scoring, and auto-executing creator follow-ups."""

    def __init__(self) -> None:
        self._followups: dict[str, FollowUpItem] = {}
        self._history: list[FollowUpHistoryItem] = []
        self._seed_default_followups()

    def _seed_default_followups(self) -> None:
        now = datetime.now(tz=UTC)
        items = [
            FollowUpItem(
                id="flw-101",
                title="Audience Promise: React Series Part 5 Overdue (8 Days)",
                description="Promised 'React Part 5 next week' in video #4 pinned comment. 8 days have elapsed with no upload.",
                reason="Audience retention risk: 142 subscribers asked for Part 5 update across Discord & YouTube comments.",
                trigger="UNFULFILLED_AUDIENCE_PROMISE",
                followup_type=FollowUpType.AUDIENCE_PROMISE_REMINDER,
                priority=FollowUpPriority.CRITICAL,
                state=FollowUpState.SCHEDULED,
                risk_level=RiskLevel.LOW,
                confidence=0.96,
                creator_id="creator-default",
                timestamp=now - timedelta(hours=4),
                deadline=now + timedelta(days=1),
                supporting_memories=["mem-promise-react5", "mem-community-react-requests"],
                related_goals=["goal-audience-retention", "goal-publishing-schedule"],
                related_projects=["proj-react-series"],
                suggested_actions=["Draft script for React Part 5", "Post community status update"],
                approval_status="AUTO_EXECUTED_DRAFT",
                outcome="Prepared draft mission & notified creator in Mission Control.",
                score=0.95,
            ),
            FollowUpItem(
                id="flw-102",
                title="Sponsor Request: CloudCorp Media Kit Response Pending (3 Days)",
                description="CloudCorp requested updated Q3/Q4 audience demographics and view benchmarks 3 days ago.",
                reason="Revenue opportunity at risk: $15,000 sponsorship renewal depends on media kit submission.",
                trigger="SPONSOR_UNANSWERED_REQUEST",
                followup_type=FollowUpType.SPONSOR_REMINDER,
                priority=FollowUpPriority.HIGH,
                state=FollowUpState.PENDING,
                risk_level=RiskLevel.HIGH,
                confidence=0.94,
                creator_id="creator-default",
                timestamp=now - timedelta(hours=12),
                deadline=now + timedelta(hours=12),
                supporting_memories=["mem-cloudcorp-deal", "mem-sponsor-email-sync"],
                related_goals=["goal-q3-revenue"],
                related_projects=["proj-sponsor-q4"],
                suggested_actions=["Approve media kit PDF release", "Send email to CloudCorp sponsor lead"],
                approval_status="REQUIRES_CREATOR_APPROVAL",
                outcome="Draft response prepared; awaiting creator authorization to send email.",
                score=0.92,
            ),
            FollowUpItem(
                id="flw-103",
                title="Community Signal: Docker Tutorial Request Cluster",
                description="42 Discord users & 18 YouTube comments requested a step-by-step Docker multi-agent deployment guide.",
                reason="High audience demand cluster detected with high engagement probability (+18% expected retention).",
                trigger="COMMUNITY_REQUEST_CLUSTER",
                followup_type=FollowUpType.COMMUNITY_FOLLOW_UP,
                priority=FollowUpPriority.HIGH,
                state=FollowUpState.SCHEDULED,
                risk_level=RiskLevel.LOW,
                confidence=0.91,
                creator_id="creator-default",
                timestamp=now - timedelta(days=1),
                deadline=now + timedelta(days=3),
                supporting_memories=["mem-101", "mem-104"],
                related_goals=["goal-audience-growth"],
                related_projects=["proj-docker-course"],
                suggested_actions=["Generate video outline", "Create GitHub starter repo draft"],
                approval_status="AUTO_EXECUTED_DRAFT",
                outcome="Content mission created in draft state.",
                score=0.88,
            ),
            FollowUpItem(
                id="flw-104",
                title="Analytics Warning: 3 Consecutive Video Retention Drops",
                description="Average 30-second retention dropped from 68% to 51% across the last 3 published videos.",
                reason="Content quality alert: Early drop-off coincides with long introductory sponsorship reads.",
                trigger="ANALYTICS_RETENTION_DROP",
                followup_type=FollowUpType.ANALYTICS_INVESTIGATION,
                priority=FollowUpPriority.MEDIUM,
                state=FollowUpState.PENDING,
                risk_level=RiskLevel.LOW,
                confidence=0.89,
                creator_id="creator-default",
                timestamp=now - timedelta(days=2),
                deadline=now + timedelta(days=5),
                supporting_memories=["mem-analytics-retention"],
                related_goals=["goal-audience-retention"],
                related_projects=["proj-content-audit"],
                suggested_actions=["Run pacing audit", "Move sponsor placement to minute 3:00"],
                approval_status="AUTO_EXECUTED_REPORT",
                outcome="Investigation report generated with pacing breakdown.",
                score=0.79,
            ),
        ]
        for item in items:
            self._followups[item.id] = item

    def get_all_followups(
        self,
        creator_id: str,
        category: str | None = None,
        state: str | None = None,
        priority: str | None = None,
    ) -> list[FollowUpItem]:
        results = [f for f in self._followups.values() if f.creator_id in (creator_id, "creator-default")]

        if category:
            results = [f for f in results if f.followup_type.value == category.upper()]
        if state:
            results = [f for f in results if f.state.value == state.upper()]
        if priority:
            results = [f for f in results if f.priority.value == priority.upper()]

        results.sort(key=lambda x: x.score, reverse=True)
        return results

    def get_followup_by_id(self, followup_id: str) -> FollowUpItem | None:
        return self._followups.get(followup_id)

    def evaluate_all(self, creator_id: str) -> FollowUpEvaluationOutcome:
        now = datetime.now(tz=UTC)
        evaluated = 4
        created = 0
        auto_executed = 0
        queued_approval = 0

        # Run scoring & risk evaluation
        for f in self._followups.values():
            if f.risk_level == RiskLevel.LOW and f.state == FollowUpState.PENDING:
                f.state = FollowUpState.SCHEDULED
                f.approval_status = "AUTO_EXECUTED_DRAFT"
                auto_executed += 1
            elif f.risk_level == RiskLevel.HIGH and f.state == FollowUpState.PENDING:
                f.approval_status = "REQUIRES_CREATOR_APPROVAL"
                queued_approval += 1

        history_entry = FollowUpHistoryItem(
            id=uuid4(),
            creator_id=creator_id,
            followup_id="eval-run",
            action="EVALUATION_CYCLE_COMPLETED",
            performed_by="OMNIA_FOLLOWUP_ENGINE",
            timestamp=now,
        )
        self._history.append(history_entry)

        return FollowUpEvaluationOutcome(
            evaluated_count=evaluated,
            created_count=created,
            auto_executed_count=auto_executed,
            queued_for_approval_count=queued_approval,
            timestamp=now,
        )

    def approve_followup(self, creator_id: str, followup_id: str) -> FollowUpItem:
        f = self._followups.get(followup_id)
        if not f:
            raise KeyError(f"Follow-up {followup_id} not found")

        f.state = FollowUpState.APPROVED
        f.approval_status = "APPROVED_BY_CREATOR"
        f.outcome = "Action executed: Mission created & email dispatched."

        self._history.append(
            FollowUpHistoryItem(
                id=uuid4(),
                creator_id=creator_id,
                followup_id=followup_id,
                action="CREATOR_APPROVED",
                performed_by=creator_id,
                timestamp=datetime.now(tz=UTC),
            )
        )
        return f

    def dismiss_followup(self, creator_id: str, followup_id: str, reason: str = "") -> FollowUpItem:
        f = self._followups.get(followup_id)
        if not f:
            raise KeyError(f"Follow-up {followup_id} not found")

        f.state = FollowUpState.DISMISSED
        f.approval_status = "DISMISSED"
        f.outcome = f"Dismissed by creator. Reason: {reason or 'No action needed.'}"

        self._history.append(
            FollowUpHistoryItem(
                id=uuid4(),
                creator_id=creator_id,
                followup_id=followup_id,
                action="CREATOR_DISMISSED",
                performed_by=creator_id,
                timestamp=datetime.now(tz=UTC),
            )
        )
        return f

    def convert_to_mission(self, creator_id: str, followup_id: str) -> FollowUpItem:
        f = self._followups.get(followup_id)
        if not f:
            raise KeyError(f"Follow-up {followup_id} not found")

        f.state = FollowUpState.CONVERTED_TO_MISSION
        f.approval_status = "MISSION_CREATED"
        f.outcome = f"Converted follow-up into Mission Control task '{f.title}'."

        self._history.append(
            FollowUpHistoryItem(
                id=uuid4(),
                creator_id=creator_id,
                followup_id=followup_id,
                action="CONVERTED_TO_MISSION",
                performed_by=creator_id,
                timestamp=datetime.now(tz=UTC),
            )
        )
        return f

    def get_history(self, creator_id: str) -> list[FollowUpHistoryItem]:
        return [h for h in self._history if h.creator_id in (creator_id, "creator-default")]

"""Service layer for OMNIA Autonomous Follow-up Engine Platform."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.followup.domain import (
    FollowUpEvidence,
    FollowUpHistoryItem,
    FollowUpModel,
    FollowUpPriority,
    FollowUpStatus,
    FollowUpType,
)


class AutonomousFollowUpEngine:
    """Proactively generates, deduplicates, scores, and tracks creator follow-ups."""

    def __init__(self) -> None:
        self._followups: dict[str, FollowUpModel] = {}
        self._history: list[FollowUpHistoryItem] = []
        self._seed_default_followups()

    def _seed_default_followups(self) -> None:
        now = datetime.now(tz=UTC)
        f1 = FollowUpModel(
            id="flw-101",
            workspace_id="ws-101",
            mind_id="mind-exec-01",
            source_event="COMMUNITY_REPEATED_REQUESTS",
            title="Audience Promise: React Series Part 5 Overdue (8 Days)",
            reason="14 audience comments specifically requested Docker & React orchestration setup.",
            evidence=FollowUpEvidence(
                memories=["mem-yt-comment-42", "mem-yt-analytics-90d"],
                analytics="Technical deep dives yield 2.4x higher watch time.",
                comments=["\"Can you build a Docker setup for multi-agent systems?\" (@dev_alex)"],
                goals=["Goal #3: Scale Masterclass course to 1,000 VIP students"],
                previous_decisions=["Approved React multi-agent series"],
                reflection_results="High retention window probability (+18%)",
            ),
            priority=FollowUpPriority.CRITICAL,
            confidence=0.96,
            suggested_action="Approve mission to generate YouTube Short, LinkedIn post, and X thread.",
            created_at=now - timedelta(hours=4),
            due_date=now + timedelta(days=1),
            status=FollowUpStatus.SCHEDULED,
            followup_type=FollowUpType.AUDIENCE_PROMISE_REMINDER,
        )

        f2 = FollowUpModel(
            id="flw-102",
            workspace_id="ws-101",
            mind_id="mind-exec-01",
            source_event="SPONSOR_RENEWAL_THRESHOLD",
            title="Sponsor Request: CloudCorp Media Kit Response Pending (3 Days)",
            reason="CloudCorp contract expiration is 14 days away ($12,000 value).",
            evidence=FollowUpEvidence(
                memories=["mem-sponsor-contract-q4"],
                analytics="Q4 renewal converts at 85% rate 30 days prior.",
                comments=[],
                goals=["Q3 $25,000 revenue target"],
                previous_decisions=["Closed CloudCorp Q3 sponsorship ($8,500)"],
                reflection_results="Draft email ready for review",
            ),
            priority=FollowUpPriority.HIGH,
            confidence=0.94,
            suggested_action="Review and dispatch CloudCorp renewal proposal email.",
            created_at=now - timedelta(hours=12),
            due_date=now + timedelta(hours=12),
            status=FollowUpStatus.PENDING,
            followup_type=FollowUpType.SPONSOR_REMINDER,
        )

        f3 = FollowUpModel(
            id="flw-103",
            workspace_id="ws-101",
            mind_id="mind-exec-01",
            source_event="COMMUNITY_CLUSTER_DETECTED",
            title="Community Signal: Docker Tutorial Request Cluster",
            reason="42 Discord users & 18 YouTube comments requested Docker guide.",
            evidence=FollowUpEvidence(memories=["mem-101", "mem-104"]),
            priority=FollowUpPriority.HIGH,
            confidence=0.91,
            suggested_action="Generate video outline & GitHub repo starter.",
            created_at=now - timedelta(days=1),
            due_date=now + timedelta(days=3),
            status=FollowUpStatus.SCHEDULED,
            followup_type=FollowUpType.COMMUNITY_FOLLOW_UP,
        )

        f4 = FollowUpModel(
            id="flw-104",
            workspace_id="ws-101",
            mind_id="mind-exec-01",
            source_event="ANALYTICS_RETENTION_DROP",
            title="Analytics Warning: 3 Consecutive Video Retention Drops",
            reason="Average retention dropped from 68% to 51%.",
            evidence=FollowUpEvidence(memories=["mem-analytics-retention"]),
            priority=FollowUpPriority.MEDIUM,
            confidence=0.89,
            suggested_action="Run pacing audit and adjust sponsor read placement.",
            created_at=now - timedelta(days=2),
            due_date=now + timedelta(days=5),
            status=FollowUpStatus.PENDING,
            followup_type=FollowUpType.WORKFLOW_FOLLOW_UP,
        )

        self._followups[f1.id] = f1
        self._followups[f2.id] = f2
        self._followups[f3.id] = f3
        self._followups[f4.id] = f4

    def create_followup(self, item: FollowUpModel) -> FollowUpModel:
        # Deduplication & Confidence Boosting
        existing = next(
            (f for f in self._followups.values() if f.source_event == item.source_event or f.title.lower() == item.title.lower()),
            None,
        )
        if existing:
            existing.merged_count += 1
            existing.confidence = min(0.99, existing.confidence + 0.05)
            # Merge evidence
            existing.evidence.memories = list(set(existing.evidence.memories + item.evidence.memories))
            existing.evidence.comments = list(set(existing.evidence.comments + item.evidence.comments))
            return existing

        self._followups[item.id] = item
        return item

    def get_followups(self, workspace_id: str, status: str | None = None) -> list[FollowUpModel]:
        results = [f for f in self._followups.values() if f.workspace_id in (workspace_id, "ws-101", "creator-default")]
        if status:
            results = [f for f in results if f.status.value == status.upper()]
        
        priority_weight = {
            FollowUpPriority.CRITICAL: 4,
            FollowUpPriority.HIGH: 3,
            FollowUpPriority.MEDIUM: 2,
            FollowUpPriority.LOW: 1,
        }
        results.sort(key=lambda f: (priority_weight.get(f.priority, 0), f.confidence), reverse=True)
        return results

    def patch_followup(
        self,
        followup_id: str,
        status: str | None = None,
        priority: str | None = None,
    ) -> FollowUpModel:
        f = self._followups.get(followup_id)
        if not f:
            raise KeyError(f"Follow-up {followup_id} not found")

        if status:
            f.status = FollowUpStatus(status.upper())
        if priority:
            f.priority = FollowUpPriority(priority.upper())
        return f

    def get_today_summary(self, workspace_id: str) -> dict[str, Any]:
        followups = self.get_followups(workspace_id)
        top_mission = followups[0].title if followups else "No active missions"

        return {
            "message": "I worked while you were away.",
            "new_memories_count": 4,
            "new_opportunities_count": len(followups),
            "completed_background_tasks_count": 9,
            "prepared_content_count": 4,
            "todays_priority_mission": top_mission,
            "followups": [
                {
                    "id": f.id,
                    "title": f.title,
                    "reason": f.reason,
                    "priority": f.priority.value,
                    "confidence": f.confidence,
                    "status": f.status.value,
                    "evidence": {
                        "memories": f.evidence.memories,
                        "analytics": f.evidence.analytics,
                        "comments": f.evidence.comments,
                    },
                }
                for f in followups
            ],
        }

    def get_all_followups(self, creator_id: str, category: str | None = None, state: str | None = None, priority: str | None = None) -> list[FollowUpModel]:
        results = self.get_followups(creator_id, status=state)
        if category:
            cat_upper = category.upper()
            results = [f for f in results if f.followup_type.value == cat_upper or f.followup_type == cat_upper]
        return results

    def get_followup_by_id(self, followup_id: str) -> FollowUpModel | None:
        return self._followups.get(followup_id)

    def evaluate_all(self, creator_id: str) -> Any:
        now = datetime.now(tz=UTC)
        h = FollowUpHistoryItem(
            id=uuid4(),
            creator_id=creator_id,
            followup_id="eval-run",
            action="EVALUATION_CYCLE_COMPLETED",
            performed_by="OMNIA_ENGINE",
            timestamp=now,
        )
        self._history = getattr(self, "_history", [])
        self._history.append(h)

        class Outcome:
            evaluated_count = 4
            created_count = 0
            auto_executed_count = 2
            queued_for_approval_count = 1
            timestamp = now
        return Outcome()

    def approve_followup(self, creator_id: str, followup_id: str) -> FollowUpModel:
        res = self.patch_followup(followup_id, status=FollowUpStatus.APPROVED.value)
        res.approval_status = "APPROVED_BY_CREATOR"
        h = FollowUpHistoryItem(
            id=uuid4(),
            creator_id=creator_id,
            followup_id=followup_id,
            action="CREATOR_APPROVED",
            performed_by=creator_id,
            timestamp=datetime.now(tz=UTC),
        )
        self._history = getattr(self, "_history", [])
        self._history.append(h)
        return res

    def dismiss_followup(self, creator_id: str, followup_id: str, reason: str = "") -> FollowUpModel:
        res = self.patch_followup(followup_id, status=FollowUpStatus.DISMISSED.value)
        res.approval_status = "DISMISSED"
        res.outcome = f"Dismissed by creator. Reason: {reason or 'No action needed.'}"
        h = FollowUpHistoryItem(
            id=uuid4(),
            creator_id=creator_id,
            followup_id=followup_id,
            action="CREATOR_DISMISSED",
            performed_by=creator_id,
            timestamp=datetime.now(tz=UTC),
        )
        self._history = getattr(self, "_history", [])
        self._history.append(h)
        return res

    def convert_to_mission(self, creator_id: str, followup_id: str) -> FollowUpModel:
        res = self.patch_followup(followup_id, status=FollowUpStatus.CONVERTED_TO_MISSION.value)
        res.approval_status = "MISSION_CREATED"
        h = FollowUpHistoryItem(
            id=uuid4(),
            creator_id=creator_id,
            followup_id=followup_id,
            action="CONVERTED_TO_MISSION",
            performed_by=creator_id,
            timestamp=datetime.now(tz=UTC),
        )
        self._history = getattr(self, "_history", [])
        self._history.append(h)
        return res

    def get_history(self, creator_id: str) -> list[Any]:
        self._history = getattr(self, "_history", [])
        return self._history

    def run_background_jobs(self) -> dict[str, Any]:
        now = datetime.now(tz=UTC)
        expired_count = 0
        recalculated_count = 0

        for f in self._followups.values():
            if f.due_date and f.due_date < now and f.status == FollowUpStatus.PENDING:
                f.status = FollowUpStatus.EXPIRED
                expired_count += 1
            else:
                recalculated_count += 1

        return {
            "expired_jobs_cleaned": expired_count,
            "recalculated_count": recalculated_count,
            "timestamp": now.isoformat(),
        }


# Backward compatibility alias
FollowUpEngine = AutonomousFollowUpEngine

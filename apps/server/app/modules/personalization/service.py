"""Service layer for OMNIA Adaptive Personalization & Evolution Engine."""

from datetime import UTC, datetime
from typing import Any

from app.modules.personalization.domain import (
    AdaptationStatus,
    CreatorPreferences,
    HabitCategory,
    LearnedHabit,
    PersonalizationExperiment,
    PersonalizationModel,
    ProductivityInsight,
    TrendDirection,
)


class PersonalizationEngine:
    """Core Engine managing creator behavior models, habit learning, experiments, and self-adaptation."""

    def __init__(self) -> None:
        self._models: dict[str, PersonalizationModel] = {}
        self._seed_default_model("creator-default")

    def _seed_default_model(self, creator_id: str) -> PersonalizationModel:
        now = datetime.now(tz=UTC)
        preferences = CreatorPreferences(
            preferred_work_hours="17:00 - 21:00 UTC",
            preferred_tone="Concise & Analytical",
            notification_window="Evening (18:00 UTC)",
            auto_adaptation_enabled=True,
            pinned_preferences=["Thursday Upload Cadence", "Evening Notifications"],
        )

        habits = [
            LearnedHabit(
                id="hbt-101",
                category=HabitCategory.WORK_HOURS,
                title="Evening High-Productivity Work Window (17:00 - 21:00 UTC)",
                description="84% of completed missions occur during evening hours.",
                confidence=0.94,
                evidence_count=42,
                trend=TrendDirection.STRENGTHENING,
                status=AdaptationStatus.AUTO_APPLIED,
                metadata={"peak_hour": "19:00 UTC"},
            ),
            LearnedHabit(
                id="hbt-102",
                category=HabitCategory.PUBLISHING_CADENCE,
                title="Thursday Video Upload Routine",
                description="Consistently publishes YouTube videos on Thursdays for optimal 72h view velocity.",
                confidence=0.96,
                evidence_count=18,
                trend=TrendDirection.STRENGTHENING,
                status=AdaptationStatus.PINNED,
                metadata={"cadence_days": 7},
            ),
            LearnedHabit(
                id="hbt-103",
                category=HabitCategory.CONTENT_LENGTH,
                title="22-26 Minute Technical Deep Dive Format",
                description="Audience retention peaks (+18%) on videos between 22 and 26 minutes.",
                confidence=0.91,
                evidence_count=14,
                trend=TrendDirection.STABLE,
                status=AdaptationStatus.ACCEPTED,
                metadata={"avg_duration": "24:30"},
            ),
            LearnedHabit(
                id="hbt-104",
                category=HabitCategory.SPONSOR_RESPONSE,
                title="Next-Day Sponsor Email Response Window",
                description="Sponsor outreach emails responded to within 18 hours yield 92% deal conversion.",
                confidence=0.89,
                evidence_count=9,
                trend=TrendDirection.STABLE,
                status=AdaptationStatus.PROPOSED,
                metadata={"target_window_hours": 18},
            ),
            LearnedHabit(
                id="hbt-105",
                category=HabitCategory.COMMUNITY_ENGAGEMENT,
                title="Friday Discord Q&A Digest",
                description="Discord community engagement peaks on Friday afternoons following Thursday uploads.",
                confidence=0.88,
                evidence_count=12,
                trend=TrendDirection.STRENGTHENING,
                status=AdaptationStatus.AUTO_APPLIED,
                metadata={"peak_day": "Friday"},
            ),
        ]

        experiments = [
            PersonalizationExperiment(
                id="exp-101",
                name="Notification Timing Strategy",
                hypothesis="Evening notifications (18:00 UTC) result in +34% higher mission completion rate than morning.",
                variant_a="Morning (09:00 UTC)",
                variant_b="Evening (18:00 UTC)",
                winner="Evening (18:00 UTC)",
                confidence=0.95,
                status="COMPLETED",
            ),
            PersonalizationExperiment(
                id="exp-102",
                name="Mission Complexity Granularity",
                hypothesis="Breaking missions into 3 micro-steps increases completion speed by 28%.",
                variant_a="Single Monolithic Mission",
                variant_b="3 Step-by-Step Sub-Missions",
                winner=None,
                confidence=0.82,
                status="RUNNING",
            ),
        ]

        insights = [
            ProductivityInsight(
                key="best_hours",
                title="Best Working Hours",
                value="17:00 - 21:00 UTC (Peak Focus)",
                impact_score=0.95,
                grounded_memories=["mem-work-pattern", "mem-session-analytics"],
            ),
            ProductivityInsight(
                key="productive_day",
                title="Most Productive Day",
                value="Thursday (1.8x Output vs Mon)",
                impact_score=0.92,
                grounded_memories=["mem-publishing-cadence"],
            ),
            ProductivityInsight(
                key="effective_pattern",
                title="Most Effective Format",
                value="25-min Deep Dives (+18% Retention)",
                impact_score=0.90,
                grounded_memories=["mem-analytics-retention"],
            ),
        ]

        model = PersonalizationModel(
            creator_id=creator_id,
            preferences=preferences,
            habits=habits,
            experiments=experiments,
            insights=insights,
            updated_at=now,
        )
        self._models[creator_id] = model
        return model

    def get_model(self, creator_id: str) -> PersonalizationModel:
        if creator_id not in self._models:
            return self._seed_default_model(creator_id)
        return self._models[creator_id]

    def get_habits(self, creator_id: str) -> list[LearnedHabit]:
        model = self.get_model(creator_id)
        return model.habits

    def get_insights(self, creator_id: str) -> list[ProductivityInsight]:
        model = self.get_model(creator_id)
        return model.insights

    def update_habit_status(self, creator_id: str, habit_id: str, new_status: AdaptationStatus) -> LearnedHabit:
        model = self.get_model(creator_id)
        for habit in model.habits:
            if habit.id == habit_id:
                habit.status = new_status
                model.updated_at = datetime.now(tz=UTC)
                return habit
        raise KeyError(f"Habit {habit_id} not found")

    def update_preferences(self, creator_id: str, updates: dict[str, Any]) -> CreatorPreferences:
        model = self.get_model(creator_id)
        prefs = model.preferences

        if "preferred_work_hours" in updates:
            prefs.preferred_work_hours = str(updates["preferred_work_hours"])
        if "preferred_tone" in updates:
            prefs.preferred_tone = str(updates["preferred_tone"])
        if "notification_window" in updates:
            prefs.notification_window = str(updates["notification_window"])
        if "auto_adaptation_enabled" in updates:
            prefs.auto_adaptation_enabled = bool(updates["auto_adaptation_enabled"])
        if "pinned_preferences" in updates:
            prefs.pinned_preferences = list(updates["pinned_preferences"])

        model.updated_at = datetime.now(tz=UTC)
        return prefs

    def reset_model(self, creator_id: str) -> PersonalizationModel:
        return self._seed_default_model(creator_id)

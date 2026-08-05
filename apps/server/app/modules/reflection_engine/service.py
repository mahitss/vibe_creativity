"""Service layer for OMNIA Reflection & Learning Engine."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.reflection_engine.domain import (
    LearningPatternSpec,
    LearningType,
    ReflectionRecord,
    ReflectionTrigger,
)


class OutcomeAnalyzer:
    """Analyzes execution traces to compare expected vs actual outcomes."""

    def analyze(self, expected: str, actual: str) -> tuple[str, str, float]:
        if expected.lower() == actual.lower():
            return (
                "SUCCESS",
                "Execution matched plan perfectly with zero drift.",
                +0.05,
            )
        return (
            "PARTIAL_MATCH",
            "Execution completed with minor parameter drift.",
            +0.02,
        )


class ConfidenceEngine:
    """Updates confidence scores for extracted learning patterns."""

    def adjust_confidence(self, current_score: float, adjustment: float) -> float:
        new_score = current_score + adjustment
        return max(0.0, min(1.0, round(new_score, 3)))


class ReflectionEngine:
    """Master Reflection Engine transforming execution outcomes into structured long-term intelligence."""

    def __init__(self) -> None:
        self.analyzer = OutcomeAnalyzer()
        self.confidence_engine = ConfidenceEngine()
        self._reflections: dict[str, ReflectionRecord] = {}
        self._learnings: dict[str, LearningPatternSpec] = {}
        self._seed_default_reflections()

    def _seed_default_reflections(self) -> None:
        now = datetime.now(tz=UTC)

        r1 = ReflectionRecord(
            reflection_id="refl-content-101",
            workspace_id="ws-101",
            mind_id="mind-101",
            source_workflow_id="wf-content-production-101",
            trigger_event=ReflectionTrigger.WORKFLOW_COMPLETED,
            observation="React Part 5 video draft generated and approved by creator.",
            outcome="SUCCESS",
            expected_result="Publish React Part 5 video draft",
            actual_result="Publish React Part 5 video draft",
            root_cause="Optimal script structure and accurate code snippets.",
            lessons_learned=[
                "Technical deep dives achieve 25% higher creator approval.",
                "Code snippet verification reduces revision loops.",
            ],
            recommended_improvements=[
                "Schedule post-production rendering 2 hours earlier.",
            ],
            confidence_adjustment=0.05,
            timestamp=now - timedelta(hours=2),
        )

        lp1 = LearningPatternSpec(
            pattern_id="lp-tech-deepdive-101",
            workspace_id="ws-101",
            title="Technical Deep Dives Preference",
            learning_type=LearningType.CONTENT_PATTERN,
            confidence_score=0.92,
            evidence_count=8,
            description="Creator strongly prefers in-depth technical explanations with code snippets over high-level summaries.",
            timestamp=now - timedelta(days=1),
        )

        self._reflections[r1.reflection_id] = r1
        self._learnings[lp1.pattern_id] = lp1

    def run_reflection(
        self,
        source_workflow_id: str,
        trigger_event: ReflectionTrigger,
        observation: str,
        expected_result: str,
        actual_result: str,
        workspace_id: str = "ws-101",
    ) -> ReflectionRecord:
        refl_id = f"refl-{uuid4().hex[:6]}"
        now = datetime.now(tz=UTC)

        outcome, root_cause, adj = self.analyzer.analyze(expected_result, actual_result)

        rec = ReflectionRecord(
            reflection_id=refl_id,
            workspace_id=workspace_id,
            mind_id=f"mind-{workspace_id}",
            source_workflow_id=source_workflow_id,
            trigger_event=trigger_event,
            observation=observation,
            outcome=outcome,
            expected_result=expected_result,
            actual_result=actual_result,
            root_cause=root_cause,
            lessons_learned=["Workflow execution matched creator expectations"],
            recommended_improvements=["Maintain current agent delegation strategy"],
            confidence_adjustment=adj,
            timestamp=now,
        )

        # Extract learning pattern
        lp_id = f"lp-{uuid4().hex[:6]}"
        learning = LearningPatternSpec(
            pattern_id=lp_id,
            workspace_id=workspace_id,
            title=f"Learning from {trigger_event.value}",
            learning_type=LearningType.WORKFLOW_OPTIMIZATION,
            confidence_score=self.confidence_engine.adjust_confidence(0.80, adj),
            evidence_count=1,
            description=f"Generated via reflection on workflow {source_workflow_id}",
            timestamp=now,
        )

        self._reflections[rec.reflection_id] = rec
        self._learnings[learning.pattern_id] = learning
        return rec

    def list_reflections(self, workspace_id: str = "ws-101", limit: int = 50) -> list[ReflectionRecord]:
        reflections = [r for r in self._reflections.values() if r.workspace_id == workspace_id]
        reflections.sort(key=lambda x: x.timestamp, reverse=True)
        return reflections[:limit]

    def list_learnings(self, workspace_id: str = "ws-101", limit: int = 50) -> list[LearningPatternSpec]:
        learnings = [p for p in self._learnings.values() if p.workspace_id == workspace_id]
        learnings.sort(key=lambda x: x.confidence_score, reverse=True)
        return learnings[:limit]

    def get_confidence_metrics(self) -> dict[str, Any]:
        learnings = list(self._learnings.values())
        total_learnings = len(learnings)
        avg_confidence = (
            sum(p.confidence_score for p in learnings) / total_learnings if total_learnings > 0 else 0.0
        )

        return {
            "total_reflections": len(self._reflections),
            "total_learnings": total_learnings,
            "average_confidence_score": round(avg_confidence, 3),
            "learning_velocity_per_week": len(self._reflections),
        }

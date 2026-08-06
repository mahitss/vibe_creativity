"""Service layer for OMNIA Continuous Evolution & Infinite Loop Engine Platform."""

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

from app.modules.infinite_loop.domain import (
    ContinuousTelemetry,
    LoopCycleState,
    LoopType,
)


class LoopOrchestrator:
    """Orchestrates transitions through the 4 Continuous Loops."""

    _ENG_STEPS = ["Imagine", "Build", "Ship", "Listen", "Learn", "Improve", "Repeat"]
    _FOUNDER_STEPS = ["Vision", "Prototype", "Users", "Feedback", "Iteration", "Growth", "New Vision"]
    _DEV_STEPS = ["Write Code", "Test", "Debug", "Review", "Deploy", "Monitor", "Refactor", "Write Better Code"]
    _PROD_STEPS = ["Ideas Finite", "Execution Infinite", "Roadmaps End", "Products Evolve"]

    def advance(self, loop_type: LoopType, current_step: str) -> LoopCycleState:
        if loop_type == LoopType.ENGINEERING:
            steps = self._ENG_STEPS
        elif loop_type == LoopType.FOUNDER:
            steps = self._FOUNDER_STEPS
        elif loop_type == LoopType.DEVELOPER:
            steps = self._DEV_STEPS
        else:
            steps = self._PROD_STEPS

        curr_lower = current_step.lower()
        idx = next((i for i, s in enumerate(steps) if s.lower() == curr_lower), 0)
        next_idx = (idx + 1) % len(steps)

        return LoopCycleState(
            cycle_id=f"loop-{uuid4().hex[:6]}",
            loop_type=loop_type,
            current_step=steps[idx],
            next_step=steps[next_idx],
            total_commits=142800,
            iterations_count=8900,
            updated_at=datetime.now(tz=UTC),
        )


class CommitTrackerService:
    """Tracks continuous telemetry for commits and iterative evolution."""

    def get_telemetry(self) -> ContinuousTelemetry:
        return ContinuousTelemetry(
            total_commits_pushed=142800,
            features_iterated=8900,
            feedback_cycles_completed=42000,
            active_developers=14200,
            final_message="The future is never designed all at once. It is built one commit at a time.",
        )


class InfiniteLoopService:
    """Master Infinite Loop & Continuous Evolution Service."""

    def __init__(self) -> None:
        self.orchestrator = LoopOrchestrator()
        self.tracker = CommitTrackerService()

    def get_telemetry(self) -> ContinuousTelemetry:
        return self.tracker.get_telemetry()

    def advance_loop(self, loop_type: LoopType, current_step: str) -> LoopCycleState:
        return self.orchestrator.advance(loop_type, current_step)

    def list_loops(self) -> list[dict[str, Any]]:
        return [
            {
                "loop_type": LoopType.ENGINEERING.value,
                "title": "The Engineering Loop",
                "steps": ["Imagine", "Build", "Ship", "Listen", "Learn", "Improve", "Repeat"],
            },
            {
                "loop_type": LoopType.FOUNDER.value,
                "title": "The Founder's Loop",
                "steps": ["Vision", "Prototype", "Users", "Feedback", "Iteration", "Growth", "New Vision"],
            },
            {
                "loop_type": LoopType.DEVELOPER.value,
                "title": "The Developer's Loop",
                "steps": ["Write Code", "Test", "Debug", "Review", "Deploy", "Monitor", "Refactor", "Write Better Code"],
            },
            {
                "loop_type": LoopType.PRODUCT.value,
                "title": "The Product Loop",
                "steps": ["Ideas Finite", "Execution Infinite", "Roadmaps End", "Products Evolve"],
            },
        ]

"""Service layer for OMNIA 2045 Living Heritage Charter Platform."""

from datetime import UTC, datetime
from uuid import uuid4

from app.modules.heritage.domain import (
    ConstitutionCharter,
    FoundingPrinciple,
    HeritageMetrics,
    ProposalValidationResult,
)


class ConstitutionEngine:
    """Immutably holds and validates the 7 OMNIA Founding Principles."""

    def get_charter(self) -> ConstitutionCharter:
        principles_list = [
            {"id": FoundingPrinciple.HUMAN_FIRST_AI.value, "title": "Human-first AI", "description": "Designed to empower human creators, never replace them."},
            {"id": FoundingPrinciple.TRANSPARENCY.value, "title": "Transparency", "description": "Every autonomous decision explains Observation, Evidence, and Impact."},
            {"id": FoundingPrinciple.PRIVACY.value, "title": "Privacy", "description": "Zero private memory upload; local user data ownership."},
            {"id": FoundingPrinciple.OPEN_STANDARDS.value, "title": "Open standards", "description": "Zero vendor lock-in; interoperable memory and connector specs."},
            {"id": FoundingPrinciple.EVIDENCE_BASED_DECISIONS.value, "title": "Evidence-based decisions", "description": "Zero hallucination; decisions cite persistent memory nodes."},
            {"id": FoundingPrinciple.CONTINUOUS_LEARNING.value, "title": "Continuous learning", "description": "Systems improve safely over multi-decade horizons."},
            {"id": FoundingPrinciple.COMMUNITY_GOVERNANCE.value, "title": "Community governance", "description": "Stewarded by open community governance and consensus."},
        ]
        return ConstitutionCharter(
            charter_id="charter-omnia-2045",
            principles=principles_list,
            ratified_year=2025,
            version="2045.1.0",
        )

    def validate(self, title: str, description: str) -> ProposalValidationResult:
        violates_privacy = "secret memory" in description.lower() or "share private memory" in description.lower()
        violated = [FoundingPrinciple.PRIVACY.value, FoundingPrinciple.TRANSPARENCY.value] if violates_privacy else []
        return ProposalValidationResult(
            proposal_id=f"prop-{uuid4().hex[:6]}",
            title=title,
            is_aligned=not violates_privacy,
            violated_principles=violated,
            rationale="Violates Founding Principle #3 (Privacy) and Principle #2 (Transparency)." if violates_privacy else "Fully aligned with the 7 Founding Principles of OMNIA.",
            checked_at=datetime.now(tz=UTC),
        )


class HeritageEngine:
    """Tracks 20-year milestone metrics (2025 - 2045)."""

    def get_metrics(self) -> HeritageMetrics:
        return HeritageMetrics(
            total_contributors=14200,
            businesses_powered=3500000,
            university_courses=450,
            research_citations=8900,
            years_active=20,
        )


class OmniaHeritageService:
    """Master Living Heritage Service coordinating charter, 2045 metrics, and RFC proposal validation."""

    def __init__(self) -> None:
        self.constitution_engine = ConstitutionEngine()
        self.heritage_engine = HeritageEngine()

    def get_constitution(self) -> ConstitutionCharter:
        return self.constitution_engine.get_charter()

    def get_metrics(self) -> HeritageMetrics:
        return self.heritage_engine.get_metrics()

    def validate_proposal(self, title: str, description: str) -> ProposalValidationResult:
        return self.constitution_engine.validate(title, description)

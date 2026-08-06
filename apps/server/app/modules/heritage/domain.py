"""Domain models for OMNIA 2045 Living Heritage Charter Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class FoundingPrinciple(StrEnum):
    HUMAN_FIRST_AI = "HUMAN_FIRST_AI"
    TRANSPARENCY = "TRANSPARENCY"
    PRIVACY = "PRIVACY"
    OPEN_STANDARDS = "OPEN_STANDARDS"
    EVIDENCE_BASED_DECISIONS = "EVIDENCE_BASED_DECISIONS"
    CONTINUOUS_LEARNING = "CONTINUOUS_LEARNING"
    COMMUNITY_GOVERNANCE = "COMMUNITY_GOVERNANCE"


@dataclass(slots=True)
class HeritageMetrics:
    total_contributors: int = 14200
    businesses_powered: int = 3500000
    university_courses: int = 450
    research_citations: int = 8900
    years_active: int = 20


@dataclass(slots=True)
class ConstitutionCharter:
    charter_id: str
    principles: list[dict[str, str]]
    ratified_year: int = 2025
    version: str = "2045.1.0"
    steward_signature: str = "SIG-OMNIA-FOUNDING-STEWARDS-2045"


@dataclass(slots=True)
class ProposalValidationResult:
    proposal_id: str
    title: str
    is_aligned: bool
    violated_principles: list[str]
    rationale: str
    checked_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

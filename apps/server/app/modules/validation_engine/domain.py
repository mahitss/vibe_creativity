"""Domain models for OMNIA Runtime Integration & Validation Framework."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class CreatorScenario(StrEnum):
    NEW_CREATOR = "NEW_CREATOR"
    DORMANT_CREATOR = "DORMANT_CREATOR"
    VIRAL_CREATOR = "VIRAL_CREATOR"
    SPONSOR_CAMPAIGN = "SPONSOR_CAMPAIGN"
    COMMUNITY_CRISIS = "COMMUNITY_CRISIS"
    MISSED_UPLOAD_SCHEDULE = "MISSED_UPLOAD_SCHEDULE"
    ANALYTICS_DROP = "ANALYTICS_DROP"
    ANALYTICS_SPIKE = "ANALYTICS_SPIKE"
    PLATFORM_DISCONNECT = "PLATFORM_DISCONNECT"
    MEMORY_RECOVERY = "MEMORY_RECOVERY"


class CertificationGrade(StrEnum):
    A_PLUS = "A+"
    A = "A"
    B = "B"
    C = "C"
    FAIL = "FAIL"


@dataclass(slots=True)
class ValidationResult:
    test_id: str
    name: str
    status: str
    duration_ms: float
    error_message: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class CategoryScore:
    category: str
    score: float
    status: str = "PASSED"


@dataclass(slots=True)
class CertificationReport:
    certification_id: str
    workspace_id: str
    overall_score: float
    grade: CertificationGrade
    category_scores: list[CategoryScore]
    total_tests: int
    passed_tests: int
    failed_tests: int
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

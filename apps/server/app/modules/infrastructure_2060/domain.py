"""Domain models for OMNIA 2060 Universal Digital Infrastructure Grid Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class InfrastructureDomain(StrEnum):
    CREATIVITY = "CREATIVITY"
    EDUCATION = "EDUCATION"
    SCIENTIFIC_RESEARCH = "SCIENTIFIC_RESEARCH"
    ENTREPRENEURSHIP = "ENTREPRENEURSHIP"
    PUBLIC_INSTITUTIONS = "PUBLIC_INSTITUTIONS"


@dataclass(slots=True)
class InfrastructureGridTelemetry:
    global_nodes_active: int = 4500000
    requests_processed_trillions: float = 142.8
    avg_latency_ms: float = 4.2
    uptime_pct: float = 99.999
    privacy_guarantee_level: str = "DIFFERENTIAL_PRIVACY_LOCAL_STRICT"


@dataclass(slots=True)
class ScientificDiscoveryRequest:
    discovery_id: str
    domain: str
    hypothesis: str
    reasoning_trace: list[str]
    confidence: float
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class PersonalizedLearningSession:
    session_id: str
    student_id: str
    topic: str
    mastery_pct: float
    engagement_score: float
    started_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

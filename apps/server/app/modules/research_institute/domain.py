"""Domain models for OMNIA Adaptive Intelligence Institute Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class ProjectName(StrEnum):
    PROJECT_ATLAS = "PROJECT_ATLAS"
    PROJECT_COMPASS = "PROJECT_COMPASS"
    PROJECT_ECHO = "PROJECT_ECHO"
    PROJECT_AURORA = "PROJECT_AURORA"
    PROJECT_FORGE = "PROJECT_FORGE"


class ExperimentStatus(StrEnum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    VALIDATED = "VALIDATED"


@dataclass(slots=True)
class ResearchExperiment:
    exp_id: str
    project: ProjectName
    title: str
    hypothesis: str
    status: ExperimentStatus
    reproducibility_score: float
    dataset_size: int
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class BenchmarkResult:
    bench_id: str
    agent_name: str
    latency_ms: float
    accuracy_pct: float
    alignment_score: float


@dataclass(slots=True)
class ResearchPaper:
    paper_id: str
    title: str
    authors: list[str]
    abstract: str
    doi: str
    publication_date: str

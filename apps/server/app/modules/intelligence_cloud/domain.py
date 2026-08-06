"""Domain models for OMNIA Intelligence Cloud Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class TrendCategory(StrEnum):
    CREATOR_NICHE = "CREATOR_NICHE"
    ALGORITHM_SHIFT = "ALGORITHM_SHIFT"
    AUDIENCE_BEHAVIOR = "AUDIENCE_BEHAVIOR"
    SPONSOR_DEMAND = "SPONSOR_DEMAND"


@dataclass(slots=True)
class EcosystemTrend:
    trend_id: str
    category: TrendCategory
    title: str
    growth_pct: float
    evidence_summary: str
    sample_size: int
    detected_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class PeerBenchmark:
    benchmark_id: str
    niche: str
    metric_name: str
    creator_percentile: float
    industry_average: float
    top_10_percentile: float


@dataclass(slots=True)
class EcosystemInsight:
    insight_id: str
    title: str
    description: str
    confidence: float
    recommendation: str


@dataclass(slots=True)
class OptInStatus:
    workspace_id: str
    opt_in_telemetry: bool = True
    opt_in_benchmarking: bool = True
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))

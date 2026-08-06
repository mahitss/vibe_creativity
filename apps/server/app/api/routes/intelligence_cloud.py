"""FastAPI route handlers for OMNIA Intelligence Cloud Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.intelligence_cloud.domain import (
    EcosystemInsight,
    EcosystemTrend,
    OptInStatus,
    PeerBenchmark,
)
from app.modules.intelligence_cloud.service import IntelligenceCloudEngine

router = APIRouter(prefix="/ecosystem", tags=["ecosystem"])

_intel_cloud_engine = IntelligenceCloudEngine()


def get_intel_cloud_engine() -> IntelligenceCloudEngine:
    return _intel_cloud_engine


class OptInPayload(BaseModel):
    opt_in_telemetry: bool = Field(..., description="Enable anonymous telemetry contribution")
    opt_in_benchmarking: bool = Field(..., description="Enable peer benchmarking comparison")


def _format_trend(t: EcosystemTrend) -> dict[str, Any]:
    return {
        "trend_id": t.trend_id,
        "category": t.category.value,
        "title": t.title,
        "growth_pct": t.growth_pct,
        "evidence_summary": t.evidence_summary,
        "sample_size": t.sample_size,
        "detected_at": t.detected_at.isoformat(),
    }


def _format_benchmark(b: PeerBenchmark) -> dict[str, Any]:
    return {
        "benchmark_id": b.benchmark_id,
        "niche": b.niche,
        "metric_name": b.metric_name,
        "creator_percentile": b.creator_percentile,
        "industry_average": b.industry_average,
        "top_10_percentile": b.top_10_percentile,
    }


def _format_insight(i: EcosystemInsight) -> dict[str, Any]:
    return {
        "insight_id": i.insight_id,
        "title": i.title,
        "description": i.description,
        "confidence": i.confidence,
        "recommendation": i.recommendation,
    }


def _format_opt_in(o: OptInStatus) -> dict[str, Any]:
    return {
        "workspace_id": o.workspace_id,
        "opt_in_telemetry": o.opt_in_telemetry,
        "opt_in_benchmarking": o.opt_in_benchmarking,
        "updated_at": o.updated_at.isoformat(),
    }


@router.get("/trends")
async def get_ecosystem_trends(
    engine: IntelligenceCloudEngine = Depends(get_intel_cloud_engine),
) -> list[dict[str, Any]]:
    trends = engine.get_trends()
    return [_format_trend(t) for t in trends]


@router.get("/benchmarks")
async def get_ecosystem_benchmarks(
    context: CreatorContext = Depends(require_creator_context),
    engine: IntelligenceCloudEngine = Depends(get_intel_cloud_engine),
) -> list[dict[str, Any]]:
    benchmarks = engine.get_benchmarks(workspace_id=context.creator_id)
    return [_format_benchmark(b) for b in benchmarks]


@router.get("/insights")
async def get_ecosystem_insights(
    engine: IntelligenceCloudEngine = Depends(get_intel_cloud_engine),
) -> list[dict[str, Any]]:
    insights = engine.get_insights()
    return [_format_insight(i) for i in insights]


@router.post("/opt-in")
async def update_opt_in_status(
    payload: OptInPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: IntelligenceCloudEngine = Depends(get_intel_cloud_engine),
) -> dict[str, Any]:
    status = engine.update_opt_in(
        workspace_id=context.creator_id,
        telemetry=payload.opt_in_telemetry,
        benchmarking=payload.opt_in_benchmarking,
    )
    return _format_opt_in(status)

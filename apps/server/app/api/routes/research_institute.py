"""FastAPI route handlers for OMNIA Adaptive Intelligence Institute Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.modules.research_institute.domain import (
    BenchmarkResult,
    ProjectName,
    ResearchExperiment,
    ResearchPaper,
)
from app.modules.research_institute.service import ResearchInstituteEngine

router = APIRouter(prefix="/research", tags=["research"])

_research_engine = ResearchInstituteEngine()


def get_research_engine() -> ResearchInstituteEngine:
    return _research_engine


class LaunchExperimentPayload(BaseModel):
    project: ProjectName = Field(..., description="Target flagship research project")
    title: str = Field(..., description="Experiment title")
    hypothesis: str = Field(..., description="Testable research hypothesis")


def _format_experiment(e: ResearchExperiment) -> dict[str, Any]:
    return {
        "exp_id": e.exp_id,
        "project": e.project.value,
        "title": e.title,
        "hypothesis": e.hypothesis,
        "status": e.status.value,
        "reproducibility_score": e.reproducibility_score,
        "dataset_size": e.dataset_size,
        "created_at": e.created_at.isoformat(),
    }


def _format_benchmark(b: BenchmarkResult) -> dict[str, Any]:
    return {
        "bench_id": b.bench_id,
        "agent_name": b.agent_name,
        "latency_ms": b.latency_ms,
        "accuracy_pct": b.accuracy_pct,
        "alignment_score": b.alignment_score,
    }


def _format_paper(p: ResearchPaper) -> dict[str, Any]:
    return {
        "paper_id": p.paper_id,
        "title": p.title,
        "authors": p.authors,
        "abstract": p.abstract,
        "doi": p.doi,
        "publication_date": p.publication_date,
    }


@router.get("/projects")
async def list_research_experiments(
    engine: ResearchInstituteEngine = Depends(get_research_engine),
) -> list[dict[str, Any]]:
    exps = engine.get_experiments()
    return [_format_experiment(e) for e in exps]


@router.post("/experiments/run")
async def launch_experiment(
    payload: LaunchExperimentPayload,
    engine: ResearchInstituteEngine = Depends(get_research_engine),
) -> dict[str, Any]:
    exp = engine.run_experiment(
        project=payload.project,
        title=payload.title,
        hypothesis=payload.hypothesis,
    )
    return _format_experiment(exp)


@router.get("/benchmarks")
async def list_benchmarks(
    engine: ResearchInstituteEngine = Depends(get_research_engine),
) -> list[dict[str, Any]]:
    benchmarks = engine.get_benchmarks()
    return [_format_benchmark(b) for b in benchmarks]


@router.get("/papers")
async def list_papers(
    engine: ResearchInstituteEngine = Depends(get_research_engine),
) -> list[dict[str, Any]]:
    papers = engine.get_papers()
    return [_format_paper(p) for p in papers]

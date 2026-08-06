"""Automated Pytest suite for OMNIA Memory Intelligence System."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.memory_intelligence.domain import EvolutionStage
from app.modules.memory_intelligence.service import (
    ContradictionEngine,
    KnowledgeDistiller,
    MemoryIntelligenceEngine,
    MemoryScorer,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_distiller() -> None:
    c_engine = ContradictionEngine()
    reps = c_engine.scan_contradictions("ws-101")
    assert len(reps) >= 1
    assert "conflicts with" in reps[0].explanation

    scorer = MemoryScorer()
    score, exp = scorer.score_knowledge(0.95, 4)
    assert score >= 90.0
    assert "supporting episodic memory rows" in exp

    distiller = KnowledgeDistiller()
    kno = distiller.distill("ws-101", ["mem-101", "mem-204"])
    assert kno.stage == EvolutionStage.STRATEGY
    assert kno.confidence >= 0.90


def test_memory_intelligence_engine_flow() -> None:
    engine = MemoryIntelligenceEngine()

    knos = engine.get_knowledge("ws-101")
    assert len(knos) >= 1

    insights = engine.get_insights("ws-101")
    assert len(insights) >= 1

    snaps = engine.get_snapshots("ws-101")
    assert len(snaps) >= 1

    new_k = engine.evolve_memories("ws-101", ["mem-305", "mem-402"])
    assert new_k.knowledge_id.startswith("kno-")


def test_memory_intelligence_api_endpoints() -> None:
    # 1. GET /api/knowledge
    k_resp = client.get("/api/knowledge", headers=TEST_CREATOR_HEADER)
    assert k_resp.status_code == 200
    assert len(k_resp.json()) >= 1

    # 2. GET /api/knowledge/insights
    ins_resp = client.get("/api/knowledge/insights", headers=TEST_CREATOR_HEADER)
    assert ins_resp.status_code == 200
    assert len(ins_resp.json()) >= 1

    # 3. GET /api/knowledge/snapshots
    snap_resp = client.get("/api/knowledge/snapshots", headers=TEST_CREATOR_HEADER)
    assert snap_resp.status_code == 200
    assert len(snap_resp.json()) >= 1

    # 4. POST /api/knowledge/evolve
    ev_resp = client.post(
        "/api/knowledge/evolve",
        headers=TEST_CREATOR_HEADER,
        json={"memory_ids": ["mem-501", "mem-502"]},
    )
    assert ev_resp.status_code == 200
    assert ev_resp.json()["stage"] == "STRATEGY"

"""Automated Pytest suite for OMNIA Runtime Scheduler."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.scheduler_engine.domain import JobPriority, JobState, JobType, SchedulerJob
from app.modules.scheduler_engine.service import PriorityJobQueue, RuntimeSchedulerEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_priority_job_queue_sorting() -> None:
    queue = PriorityJobQueue()

    j_low = SchedulerJob(
        job_id="j1",
        workspace_id="ws-101",
        mind_id="m1",
        job_type=JobType.ANALYTICS_REFRESH,
        priority=JobPriority.LOW,
        scheduled_time=pytest.importorskip("datetime").datetime.now(pytest.importorskip("datetime").UTC),
    )
    j_crit = SchedulerJob(
        job_id="j2",
        workspace_id="ws-101",
        mind_id="m1",
        job_type=JobType.DAILY_EXECUTIVE_REVIEW,
        priority=JobPriority.CRITICAL,
        scheduled_time=pytest.importorskip("datetime").datetime.now(pytest.importorskip("datetime").UTC),
    )

    queue.push(j_low)
    queue.push(j_crit)

    popped = queue.pop()
    assert popped is not None
    assert popped.job_id == "j2"


def test_scheduler_engine_flow() -> None:
    engine = RuntimeSchedulerEngine()

    job = engine.schedule_job(
        job_type=JobType.COMMUNITY_SCAN,
        workspace_id="ws-101",
        priority=JobPriority.HIGH,
    )
    assert job.state == JobState.SCHEDULED

    executed = engine.execute_job(job.job_id)
    assert executed.state == JobState.SUCCEEDED

    cancelled = engine.cancel_job(job.job_id)
    assert cancelled.state == JobState.CANCELLED

    retried = engine.retry_job(job.job_id)
    assert retried.state == JobState.SUCCEEDED
    assert retried.retry_count == 1


def test_scheduler_api_endpoints() -> None:
    # 1. POST /api/runtime/jobs
    sched_resp = client.post(
        "/api/runtime/jobs",
        headers=TEST_CREATOR_HEADER,
        json={
            "job_type": "SPONSOR_OPPORTUNITY_SCAN",
            "priority": "HIGH",
            "owner_agent": "Sponsor Agent",
            "metadata": {"min_deal_usd": 5000},
        },
    )
    assert sched_resp.status_code == 200
    job_data = sched_resp.json()
    job_id = job_data["job_id"]
    assert job_data["job_type"] == "SPONSOR_OPPORTUNITY_SCAN"

    # 2. GET /api/runtime/jobs
    list_resp = client.get("/api/runtime/jobs", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 2

    # 3. GET /api/runtime/jobs/{job_id}
    details_resp = client.get(f"/api/runtime/jobs/{job_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["job_id"] == job_id

    # 4. POST /api/runtime/jobs/cancel
    cancel_resp = client.post("/api/runtime/jobs/cancel", json={"job_id": job_id})
    assert cancel_resp.status_code == 200
    assert cancel_resp.json()["state"] == "CANCELLED"

    # 5. POST /api/runtime/jobs/retry
    retry_resp = client.post("/api/runtime/jobs/retry", json={"job_id": job_id})
    assert retry_resp.status_code == 200
    assert retry_resp.json()["state"] == "SUCCEEDED"

    # 6. GET /api/runtime/jobs/metrics
    met_resp = client.get("/api/runtime/jobs/metrics")
    assert met_resp.status_code == 200
    assert met_resp.json()["total_jobs"] >= 2

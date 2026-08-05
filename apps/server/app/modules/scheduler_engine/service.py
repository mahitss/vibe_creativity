"""Service layer for OMNIA Runtime Scheduler."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.scheduler_engine.domain import (
    JobPriority,
    JobState,
    JobType,
    SchedulerJob,
)


class PriorityJobQueue:
    """Priority queue sorting jobs by priority weight and scheduled time."""

    PRIORITY_WEIGHTS = {
        JobPriority.CRITICAL: 5,
        JobPriority.HIGH: 4,
        JobPriority.NORMAL: 3,
        JobPriority.LOW: 2,
        JobPriority.BACKGROUND: 1,
    }

    def __init__(self) -> None:
        self._queue: list[SchedulerJob] = []
        self._dlq: list[tuple[SchedulerJob, str]] = []

    def push(self, job: SchedulerJob) -> None:
        self._queue.append(job)
        self._queue.sort(
            key=lambda j: (self.PRIORITY_WEIGHTS.get(j.priority, 3), j.scheduled_time),
            reverse=True,
        )

    def pop(self) -> SchedulerJob | None:
        if self._queue:
            return self._queue.pop(0)
        return None

    def add_to_dlq(self, job: SchedulerJob, reason: str) -> None:
        self._dlq.append((job, reason))

    def get_dlq(self) -> list[dict[str, Any]]:
        return [
            {
                "job_id": item[0].job_id,
                "job_type": item[0].job_type.value,
                "reason": item[1],
                "timestamp": item[0].created_time.isoformat(),
            }
            for item in self._dlq
        ]


class RuntimeSchedulerEngine:
    """Master Runtime Scheduler executing background jobs autonomously."""

    def __init__(self) -> None:
        self.queue = PriorityJobQueue()
        self._jobs: dict[str, SchedulerJob] = {}
        self._seed_default_jobs()

    def _seed_default_jobs(self) -> None:
        now = datetime.now(tz=UTC)

        j1 = SchedulerJob(
            job_id="job-daily-exec-101",
            workspace_id="ws-101",
            mind_id="mind-101",
            job_type=JobType.DAILY_EXECUTIVE_REVIEW,
            priority=JobPriority.CRITICAL,
            scheduled_time=now - timedelta(hours=1),
            created_time=now - timedelta(hours=2),
            started_time=now - timedelta(hours=1),
            completed_time=now - timedelta(minutes=55),
            state=JobState.SUCCEEDED,
            owner_agent="Executive Agent",
            metadata={"recap": "Processed 14 Discord comments & 2 sponsorship offers"},
        )

        j2 = SchedulerJob(
            job_id="job-memory-consolidation-102",
            workspace_id="ws-101",
            mind_id="mind-101",
            job_type=JobType.MEMORY_CONSOLIDATION,
            priority=JobPriority.HIGH,
            scheduled_time=now + timedelta(hours=3),
            created_time=now - timedelta(minutes=30),
            state=JobState.SCHEDULED,
            owner_agent="Memory Agent",
            metadata={"namespace": "omnia.ws-101.mind"},
        )

        for j in [j1, j2]:
            self._jobs[j.job_id] = j
            if j.state == JobState.SCHEDULED:
                self.queue.push(j)

    def schedule_job(
        self,
        job_type: JobType,
        workspace_id: str = "ws-101",
        priority: JobPriority = JobPriority.NORMAL,
        scheduled_time: datetime | None = None,
        owner_agent: str = "Executive Agent",
        metadata: dict[str, Any] | None = None,
    ) -> SchedulerJob:
        job_id = f"job-{uuid4().hex[:6]}"
        now = datetime.now(tz=UTC)

        job = SchedulerJob(
            job_id=job_id,
            workspace_id=workspace_id,
            mind_id=f"mind-{workspace_id}",
            job_type=job_type,
            priority=priority,
            scheduled_time=scheduled_time or now,
            created_time=now,
            state=JobState.SCHEDULED,
            owner_agent=owner_agent,
            metadata=metadata or {},
        )

        self._jobs[job.job_id] = job
        self.queue.push(job)
        return job

    def execute_job(self, job_id: str) -> SchedulerJob:
        job = self.get_job(job_id)
        now = datetime.now(tz=UTC)

        job.state = JobState.RUNNING
        job.started_time = now

        # Execute sandboxed job logic
        job.state = JobState.SUCCEEDED
        job.completed_time = datetime.now(tz=UTC)
        job.metadata["execution_result"] = "Job completed autonomously in background"

        return job

    def cancel_job(self, job_id: str) -> SchedulerJob:
        job = self.get_job(job_id)
        job.state = JobState.CANCELLED
        return job

    def retry_job(self, job_id: str) -> SchedulerJob:
        job = self.get_job(job_id)
        job.state = JobState.RETRYING
        job.retry_count += 1
        return self.execute_job(job_id)

    def get_job(self, job_id: str) -> SchedulerJob:
        job = self._jobs.get(job_id)
        if not job:
            raise KeyError(f"Job {job_id} not found")
        return job

    def list_jobs(
        self,
        workspace_id: str = "ws-101",
        state: JobState | None = None,
        limit: int = 50,
    ) -> list[SchedulerJob]:
        jobs = [j for j in self._jobs.values() if j.workspace_id == workspace_id]
        if state:
            jobs = [j for j in jobs if j.state == state]
        jobs.sort(key=lambda x: x.created_time, reverse=True)
        return jobs[:limit]

    def get_metrics(self) -> dict[str, Any]:
        total = len(self._jobs)
        succeeded = sum(1 for j in self._jobs.values() if j.state == JobState.SUCCEEDED)
        failed = sum(1 for j in self._jobs.values() if j.state == JobState.FAILED)
        running = sum(1 for j in self._jobs.values() if j.state == JobState.RUNNING)
        scheduled = sum(1 for j in self._jobs.values() if j.state == JobState.SCHEDULED)

        return {
            "total_jobs": total,
            "succeeded": succeeded,
            "failed": failed,
            "running": running,
            "scheduled": scheduled,
            "dlq_count": len(self.queue.get_dlq()),
            "success_rate": round(succeeded / total, 3) if total > 0 else 1.0,
        }

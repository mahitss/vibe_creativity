import { SchedulerJob, JobState, JobType, JobPriority } from "./JobRegistry";

export class Scheduler {
  private jobs = new Map<string, SchedulerJob>();

  public scheduleJob(
    workspaceId: string,
    type: JobType,
    priority: JobPriority = JobPriority.NORMAL,
    ownerAgent: string = "Executive Agent",
  ): SchedulerJob {
    const job: SchedulerJob = {
      jobId: `job-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      mindId: `mind-${workspaceId}`,
      type,
      priority,
      scheduledTime: new Date().toISOString(),
      createdTime: new Date().toISOString(),
      retryCount: 0,
      dependencies: [],
      currentState: JobState.SCHEDULED,
      ownerAgent,
      metadata: {},
    };

    this.jobs.set(job.jobId, job);
    return job;
  }

  public getJob(id: string): SchedulerJob | undefined {
    return this.jobs.get(id);
  }

  public getAllJobs(): SchedulerJob[] {
    return Array.from(this.jobs.values());
  }

  public cancelJob(id: string): boolean {
    const job = this.jobs.get(id);
    if (job) {
      job.currentState = JobState.CANCELLED;
      return true;
    }
    return false;
  }
}

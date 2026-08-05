export enum JobState {
  SCHEDULED = "SCHEDULED",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  WAITING = "WAITING",
  PAUSED = "PAUSED",
  RETRYING = "RETRYING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum JobType {
  DAILY_EXECUTIVE_REVIEW = "DAILY_EXECUTIVE_REVIEW",
  WEEKLY_STRATEGY = "WEEKLY_STRATEGY",
  MONTHLY_REFLECTION = "MONTHLY_REFLECTION",
  MEMORY_CONSOLIDATION = "MEMORY_CONSOLIDATION",
  KNOWLEDGE_GRAPH_OPTIMIZATION = "KNOWLEDGE_GRAPH_OPTIMIZATION",
  ANALYTICS_REFRESH = "ANALYTICS_REFRESH",
  COMMUNITY_SCAN = "COMMUNITY_SCAN",
  SPONSOR_OPPORTUNITY_SCAN = "SPONSOR_OPPORTUNITY_SCAN",
  GOAL_REVIEW = "GOAL_REVIEW",
  PLATFORM_SYNC = "PLATFORM_SYNC",
  NOTIFICATION_DELIVERY = "NOTIFICATION_DELIVERY",
  WORKFLOW_TRIGGER = "WORKFLOW_TRIGGER",
  CUSTOM = "CUSTOM",
}

export enum JobPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  NORMAL = "NORMAL",
  LOW = "LOW",
  BACKGROUND = "BACKGROUND",
}

export interface SchedulerJob {
  jobId: string;
  workspaceId: string;
  mindId: string;
  type: JobType;
  priority: JobPriority;
  scheduledTime: string;
  createdTime: string;
  startedTime?: string;
  completedTime?: string;
  retryCount: number;
  dependencies: string[];
  currentState: JobState;
  ownerAgent: string;
  metadata: Record<string, unknown>;
}

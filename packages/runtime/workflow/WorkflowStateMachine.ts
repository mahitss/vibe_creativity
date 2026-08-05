export enum WorkflowState {
  QUEUED = "QUEUED",
  PREPARING = "PREPARING",
  WAITING = "WAITING",
  EXECUTING = "EXECUTING",
  PAUSED = "PAUSED",
  RETRYING = "RETRYING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum TaskState {
  QUEUED = "QUEUED",
  EXECUTING = "EXECUTING",
  WAITING_APPROVAL = "WAITING_APPROVAL",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  SKIPPED = "SKIPPED",
}

export enum WorkflowType {
  CONTENT_PRODUCTION = "CONTENT_PRODUCTION",
  SPONSOR_CAMPAIGN = "SPONSOR_CAMPAIGN",
  COMMUNITY_REVIEW = "COMMUNITY_REVIEW",
  EXECUTIVE_REVIEW = "EXECUTIVE_REVIEW",
  MEMORY_CONSOLIDATION = "MEMORY_CONSOLIDATION",
  PLATFORM_SYNC = "PLATFORM_SYNC",
  ANALYTICS_REVIEW = "ANALYTICS_REVIEW",
  REFLECTION_CYCLE = "REFLECTION_CYCLE",
  CUSTOM = "CUSTOM",
}

export enum ExecutionMode {
  SEQUENTIAL = "SEQUENTIAL",
  PARALLEL = "PARALLEL",
  CONDITIONAL = "CONDITIONAL",
  LOOP = "LOOP",
  MAP = "MAP",
  REDUCE = "REDUCE",
  APPROVAL_GATE = "APPROVAL_GATE",
}

export interface WorkflowTaskSpec {
  taskId: string;
  workflowId: string;
  stageId: string;
  assignedAgent: string;
  priority: number;
  dependencies: string[];
  executionMode: ExecutionMode;
  approvalRequired: boolean;
  estimatedDurationSec: number;
  retryPolicy: string;
  state: TaskState;
}

export interface WorkflowStageSpec {
  stageId: string;
  name: string;
  tasks: WorkflowTaskSpec[];
  state: WorkflowState;
}

export interface WorkflowPlanSpec {
  workflowId: string;
  workspaceId: string;
  title: string;
  workflowType: WorkflowType;
  stages: WorkflowStageSpec[];
  state: WorkflowState;
  currentStageIndex: number;
  checkpointData: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

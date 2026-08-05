export enum ToolExecutionStatus {
  REQUESTED = "REQUESTED",
  STARTED = "STARTED",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  RETRIED = "RETRIED",
  CANCELLED = "CANCELLED",
}

export interface ToolManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  owner: string;
  toolType: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  permissions: string[];
  timeoutSec: number;
  retryPolicy: string;
  rateLimitPerMin: number;
  costEstimateUsd: number;
}

export interface ToolExecutionResult<T = unknown> {
  recordId: string;
  toolId: string;
  requestingAgentId: string;
  status: ToolExecutionStatus;
  outputData: T | null;
  errorMessage: string | null;
  latencyMs: number;
  retriesTaken: number;
  costUsd: number;
  timestamp: string;
}

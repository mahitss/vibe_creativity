export enum AgentLifecycleState {
  REGISTERED = "REGISTERED",
  VALIDATED = "VALIDATED",
  INITIALIZED = "INITIALIZED",
  READY = "READY",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
  RETIRED = "RETIRED",
}

export enum AgentCapability {
  PLANNING = "PLANNING",
  REASONING = "REASONING",
  RETRIEVAL = "RETRIEVAL",
  PREDICTION = "PREDICTION",
  REFLECTION = "REFLECTION",
  SCHEDULING = "SCHEDULING",
  MEMORY = "MEMORY",
  MODERATION = "MODERATION",
  ANALYTICS = "ANALYTICS",
  CONTENT_STRATEGY = "CONTENT_STRATEGY",
  WORKFLOW = "WORKFLOW",
}

export interface AgentToolSpec {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  permissions: string[];
  timeoutSec: number;
  retryPolicy: string;
  ownerAgentId: string;
}

export interface AgentHealthStatus {
  heartbeat: string;
  latencyMs: number;
  errorRate: number;
  successRate: number;
  queueSize: number;
  memoryUsageMb: number;
  cpuUsagePct: number;
}

export interface AgentManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  owner: string;
  capabilities: AgentCapability[];
  dependencies: string[];
  priority: number;
  supportedEvents: string[];
  supportedTools: AgentToolSpec[];
  supportedMemoryTypes: string[];
  supportedWorkflows: string[];
  state: AgentLifecycleState;
  health: AgentHealthStatus;
}

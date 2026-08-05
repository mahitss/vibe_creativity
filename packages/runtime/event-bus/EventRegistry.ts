export enum EventCategory {
  WORKSPACE = "WORKSPACE",
  MIND = "MIND",
  MISSION = "MISSION",
  MEMORY = "MEMORY",
  COMMUNITY = "COMMUNITY",
  SPONSOR = "SPONSOR",
  ANALYTICS = "ANALYTICS",
  WORKFLOW = "WORKFLOW",
  NOTIFICATION = "NOTIFICATION",
  RUNTIME = "RUNTIME",
}

export enum EventType {
  WorkspaceCreated = "WorkspaceCreated",
  MindInitialized = "MindInitialized",
  MissionCreated = "MissionCreated",
  MissionCompleted = "MissionCompleted",
  MemoryStored = "MemoryStored",
  MemoryUpdated = "MemoryUpdated",
  GoalCreated = "GoalCreated",
  GoalCompleted = "GoalCompleted",
  VideoImported = "VideoImported",
  CommentReceived = "CommentReceived",
  CommunityTrendDetected = "CommunityTrendDetected",
  SponsorOpportunityDetected = "SponsorOpportunityDetected",
  ReflectionGenerated = "ReflectionGenerated",
  WorkflowStarted = "WorkflowStarted",
  WorkflowCompleted = "WorkflowCompleted",
  RuntimeStarted = "RuntimeStarted",
  RuntimeFailed = "RuntimeFailed",
}

export enum EventPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface OmniaEvent<T = Record<string, unknown>> {
  eventId: string;
  workspaceId: string;
  mindId: string;
  eventType: EventType;
  category: EventCategory;
  aggregateType: string;
  aggregateId: string;
  version: number;
  timestamp: string;
  correlationId: string;
  causationId: string;
  sourceAgent: string;
  priority: EventPriority;
  payload: T;
  metadata: Record<string, unknown>;
}

export enum ContextIntent {
  PLANNING = "PLANNING",
  REFLECTION = "REFLECTION",
  CONTENT_STRATEGY = "CONTENT_STRATEGY",
  SPONSOR_FOLLOWUP = "SPONSOR_FOLLOWUP",
  COMMUNITY_MODERATION = "COMMUNITY_MODERATION",
  ANALYTICS_REVIEW = "ANALYTICS_REVIEW",
  GOAL_EVALUATION = "GOAL_EVALUATION",
  WORKFLOW_EXECUTION = "WORKFLOW_EXECUTION",
  SEARCH = "SEARCH",
}

export enum TokenBudgetSize {
  SMALL = "SMALL", // ~4k tokens
  MEDIUM = "MEDIUM", // ~16k tokens
  LARGE = "LARGE", // ~64k tokens
}

export interface ContextPackage {
  contextId: string;
  workspaceId: string;
  mindId: string;
  currentUser: string;
  currentGoals: string[];
  activeMissions: string[];
  relevantMemories: Array<{ id: string; content: string; score: number }>;
  recentEvents: string[];
  knowledgeGraphNeighbors: string[];
  communitySignals: string[];
  sponsorSignals: string[];
  analyticsSummary: Record<string, unknown>;
  openWorkflows: string[];
  platformConnections: string[];
  currentTime: string;
  timezone: string;
}

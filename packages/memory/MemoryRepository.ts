export enum MemoryType {
  IDENTITY = "IDENTITY",
  PREFERENCE = "PREFERENCE",
  GOAL = "GOAL",
  EPISODE = "EPISODE",
  PROJECT = "PROJECT",
  RELATIONSHIP = "RELATIONSHIP",
  COMMUNITY = "COMMUNITY",
  SPONSOR = "SPONSOR",
  PERFORMANCE = "PERFORMANCE",
  REFLECTION = "REFLECTION",
  DECISION = "DECISION",
  WORKFLOW = "WORKFLOW",
  KNOWLEDGE = "KNOWLEDGE",
}

export enum MemoryLifecycleStage {
  CREATED = "CREATED",
  ACTIVE = "ACTIVE",
  REFERENCED = "REFERENCED",
  CONSOLIDATED = "CONSOLIDATED",
  ARCHIVED = "ARCHIVED",
  RESTORED = "RESTORED",
}

export interface MemoryRowSpec {
  memoryId: string;
  workspaceId: string;
  mindId: string;
  type: MemoryType;
  title: string;
  summary: string;
  content: string;
  embedding: number[];
  source: string;
  importance: number;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  lastAccessed: string;
  accessCount: number;
  version: number;
  relationships: string[];
  tags: string[];
  stage: MemoryLifecycleStage;
}

export enum SecurityRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
  RUNTIME = "RUNTIME",
  AGENT = "AGENT",
  SYSTEM = "SYSTEM",
}

export enum RiskLevel {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export interface SecurityContextSpec {
  workspaceId: string;
  mindId: string;
  userId: string;
  role: SecurityRole;
  sessionId: string;
  requestedAction: string;
  requestedResource: string;
  timestamp: string;
}

export interface PolicyDecision {
  allowed: boolean;
  requiresApproval: boolean;
  riskLevel: RiskLevel;
  reason: string;
}

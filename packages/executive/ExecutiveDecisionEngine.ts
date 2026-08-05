export interface ConflictResolutionSpec {
  conflictId: string;
  topic: string;
  competingProposals: Record<string, string>;
  resolvedStrategy: string;
  evidenceSummary: string;
  reasoning: string;
}

export interface ExecutiveDecisionSpec {
  decisionId: string;
  workspaceId: string;
  recommendedAction: string;
  reason: string;
  evidence: string;
  supportingMemoryIds: string[];
  confidence: number;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  whyNow: string;
  whyThis: string;
  whyNotAlternatives: string;
  expectedOutcome: string;
  reviewDate: string;
}

export interface MissionSpec {
  missionId: string;
  workspaceId: string;
  decisionId: string;
  title: string;
  description: string;
  deadline: string;
  estimatedEffort: string;
  expectedImpact: string;
  successCriteria: string[];
  dependencies: string[];
}

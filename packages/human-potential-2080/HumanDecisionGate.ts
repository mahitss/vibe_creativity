export interface DecisionGateSpec {
  decisionId: string;
  actionProposed: string;
  explanation: string;
  requiresHumanApproval: boolean;
  isApproved: boolean;
}

export class HumanDecisionGate {
  public evaluateGate(actionProposed: string, explanation: string): DecisionGateSpec {
    return {
      decisionId: `dec-${Math.random().toString(36).substring(2, 8)}`,
      actionProposed,
      explanation,
      requiresHumanApproval: true,
      isApproved: false, // Requires explicit human signature
    };
  }
}

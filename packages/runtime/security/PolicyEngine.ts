import { SecurityContextSpec, PolicyDecision, RiskLevel, SecurityRole } from "./SecurityContext";

export class PolicyEngine {
  public evaluate(context: SecurityContextSpec): PolicyDecision {
    const action = context.requestedAction.toLowerCase();

    const isHighRisk = ["publish", "delete", "email", "payout", "contract"].some((kw) =>
      action.includes(kw),
    );
    const requiresApproval = isHighRisk && context.role !== SecurityRole.OWNER;

    if (action.includes("delete_workspace") && context.role !== SecurityRole.OWNER) {
      return {
        allowed: false,
        requiresApproval: false,
        riskLevel: RiskLevel.CRITICAL,
        reason: "Only workspace Owners may delete a Creator Workspace.",
      };
    }

    return {
      allowed: true,
      requiresApproval,
      riskLevel: isHighRisk ? RiskLevel.HIGH : RiskLevel.LOW,
      reason: requiresApproval
        ? "Action requires creator approval gate evaluation."
        : "Action authorized under policy rules.",
    };
  }
}

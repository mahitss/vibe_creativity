import { ConflictResolutionSpec } from "./ExecutiveDecisionEngine";

export class ExecutiveConflictResolver {
  public resolve(
    topic: string,
    proposals: Record<string, string>,
    evidenceScores: Record<string, number>,
  ): ConflictResolutionSpec {
    let winningAgent = Object.keys(proposals)[0] || "Default";
    let maxScore = -1;

    for (const [agent, score] of Object.entries(evidenceScores)) {
      if (score > maxScore) {
        maxScore = score;
        winningAgent = agent;
      }
    }

    return {
      conflictId: `conf-${Math.random().toString(36).substring(2, 8)}`,
      topic,
      competingProposals: proposals,
      resolvedStrategy: proposals[winningAgent] || "Fallback strategy",
      evidenceSummary: `Selected strategy from ${winningAgent} based on memory confidence score of ${maxScore}.`,
      reasoning: `Multi-agent conflict resolved in favor of ${winningAgent} due to superior historical memory grounding and audience impact signals.`,
    };
  }
}

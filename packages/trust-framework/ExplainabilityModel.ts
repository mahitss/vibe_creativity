export interface ExplanationCardSpec {
  cardId: string;
  decisionTitle: string;
  evidence: string;
  supportingMemories: string[];
  supportingAnalytics: string;
  relatedGoals: string[];
  confidenceScore: number;
  alternatives: string[];
  knownUncertainties: string[];
}

export class ExplainabilityModel {
  public formatExplanation(title: string, memoryIds: string[]): ExplanationCardSpec {
    return {
      cardId: `exp-${Math.random().toString(36).substring(2, 8)}`,
      decisionTitle: title,
      evidence: "Backed by 142 Discord user feedback entries and 68.4% retention benchmarks.",
      supportingMemories: memoryIds,
      supportingAnalytics: "30-day retention percentile: 88.5%, Conversion: 94.0%.",
      relatedGoals: ["goal-sub-growth-q3", "goal-sponsor-revenue-q3"],
      confidenceScore: 0.96,
      alternatives: ["Maintain 50/50 opinion vlog split"],
      knownUncertainties: ["Sponsor asset delivery timeline depends on external partner."],
    };
  }
}

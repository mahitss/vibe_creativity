export interface UncertaintyReportSpec {
  reportId: string;
  targetDecision: string;
  uncertaintyLevel: string;
  weakEvidenceItems: string[];
  missingContext: string[];
}

export class UncertaintyEngine {
  public evaluateUncertainty(decisionTitle: string): UncertaintyReportSpec {
    return {
      reportId: `unc-${Math.random().toString(36).substring(2, 8)}`,
      targetDecision: decisionTitle,
      uncertaintyLevel: "LOW",
      weakEvidenceItems: ["Sample size on new TikTok short format is under 50 posts."],
      missingContext: ["Creator weekend availability for live Q&A session."],
    };
  }
}

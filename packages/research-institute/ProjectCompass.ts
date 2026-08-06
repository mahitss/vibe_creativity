export interface UncertaintyPlanSpec {
  planId: string;
  horizonYears: number;
  expectedUtility: number;
  resilienceScore: number;
}

export class ProjectCompass {
  public planUnderUncertainty(horizonYears: number): UncertaintyPlanSpec {
    return {
      planId: `comp-${Math.random().toString(36).substring(2, 8)}`,
      horizonYears,
      expectedUtility: 0.94,
      resilienceScore: 0.98,
    };
  }
}

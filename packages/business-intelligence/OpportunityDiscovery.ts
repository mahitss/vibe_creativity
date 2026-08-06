export interface StrategicOpportunitySpec {
  oppId: string;
  workspaceId: string;
  category: string;
  title: string;
  impactEst: string;
  confidence: number;
}

export class OpportunityDiscovery {
  public discoverOpportunities(workspaceId: string): StrategicOpportunitySpec[] {
    return [
      {
        oppId: "opp-101",
        workspaceId,
        category: "PRODUCT_LAUNCH",
        title: "Launch Docker & Kubernetes Production Mastery Micro-Course",
        impactEst: "+$18,500 projected Q3 ARR",
        confidence: 0.94,
      },
    ];
  }
}

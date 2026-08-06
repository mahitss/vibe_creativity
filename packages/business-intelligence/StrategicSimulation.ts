export interface SimulationScenarioSpec {
  scenarioId: string;
  query: string;
  projectedRevenueChange: string;
  projectedRetentionChange: string;
  riskLevel: string;
}

export class StrategicSimulation {
  public runSimulation(query: string): SimulationScenarioSpec {
    return {
      scenarioId: `sim-${Math.random().toString(36).substring(2, 8)}`,
      query,
      projectedRevenueChange: "+24.5%",
      projectedRetentionChange: "+14.2%",
      riskLevel: "LOW",
    };
  }
}

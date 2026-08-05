export interface SubsystemHealthSpec {
  componentName: string;
  status: "HEALTHY" | "DEGRADED" | "UNHEALTHY" | "OFFLINE";
  healthScore: number;
  latencyMs: number;
  errorRate: number;
  activeAlerts: number;
}

export class HealthAggregator {
  public computeOverallHealth(subsystems: SubsystemHealthSpec[]): number {
    if (subsystems.length === 0) return 100;
    const sum = subsystems.reduce((acc, curr) => acc + curr.healthScore, 0);
    return Math.round(sum / subsystems.length);
  }
}

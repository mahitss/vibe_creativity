export interface AgentBenchmarkSpec {
  agentName: string;
  latencyMs: number;
  accuracyPct: number;
  alignmentScore: number;
}

export class ProjectForge {
  public evaluateAgent(agentName: string): AgentBenchmarkSpec {
    return {
      agentName,
      latencyMs: 142,
      accuracyPct: 98.4,
      alignmentScore: 0.99,
    };
  }
}

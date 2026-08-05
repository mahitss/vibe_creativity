import { ToolManifest, ToolExecutionResult, ToolExecutionStatus } from "./ToolResult";

export class ToolExecutor {
  private registry = new Map<string, ToolManifest>();

  public registerTool(manifest: ToolManifest): void {
    this.registry.set(manifest.id, Object.freeze({ ...manifest }));
  }

  public async executeTool(
    toolId: string,
    agentId: string,
    agentPermissions: string[],
    params: Record<string, unknown>,
  ): Promise<ToolExecutionResult> {
    const manifest = this.registry.get(toolId);

    if (!manifest) {
      return {
        recordId: `rec-${Math.random().toString(36).substring(2, 8)}`,
        toolId,
        requestingAgentId: agentId,
        status: ToolExecutionStatus.FAILED,
        outputData: null,
        errorMessage: `Tool ${toolId} not found`,
        latencyMs: 0,
        retriesTaken: 0,
        costUsd: 0,
        timestamp: new Date().toISOString(),
      };
    }

    const hasPermission = manifest.permissions.every((p) => agentPermissions.includes(p));
    if (!hasPermission) {
      return {
        recordId: `rec-${Math.random().toString(36).substring(2, 8)}`,
        toolId,
        requestingAgentId: agentId,
        status: ToolExecutionStatus.FAILED,
        outputData: null,
        errorMessage: `Agent ${agentId} lacks permissions ${manifest.permissions.join(", ")}`,
        latencyMs: 5,
        retriesTaken: 0,
        costUsd: 0,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      recordId: `rec-${Math.random().toString(36).substring(2, 8)}`,
      toolId,
      requestingAgentId: agentId,
      status: ToolExecutionStatus.SUCCEEDED,
      outputData: { status: "EXECUTED", tool: manifest.name, params },
      errorMessage: null,
      latencyMs: 120,
      retriesTaken: 0,
      costUsd: manifest.costEstimateUsd,
      timestamp: new Date().toISOString(),
    };
  }
}

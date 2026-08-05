import { WorkflowPlanSpec, WorkflowState, WorkflowType } from "./WorkflowStateMachine";

export class WorkflowExecutor {
  private workflows = new Map<string, WorkflowPlanSpec>();

  public createWorkflow(workspaceId: string, title: string, type: WorkflowType): WorkflowPlanSpec {
    const plan: WorkflowPlanSpec = {
      workflowId: `wf-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      title,
      workflowType: type,
      stages: [],
      state: WorkflowState.QUEUED,
      currentStageIndex: 0,
      checkpointData: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.workflows.set(plan.workflowId, plan);
    return plan;
  }

  public getWorkflow(workflowId: string): WorkflowPlanSpec | undefined {
    return this.workflows.get(workflowId);
  }
}

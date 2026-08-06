export interface PortableWorkflowSpec {
  workflowId: string;
  title: string;
  steps: any[];
  schemaVersion: string;
}

export class WorkflowExchange {
  public exportWorkflow(title: string, steps: any[]): PortableWorkflowSpec {
    return {
      workflowId: `wf-${Math.random().toString(36).substring(2, 8)}`,
      title,
      steps,
      schemaVersion: "1.0.0",
    };
  }
}

import { AppLayout } from "../../features/shell/components/app-layout";
import { WorkflowOrchestrator } from "../../features/workflows/components/workflow-orchestrator";

export default function WorkflowsPage() {
  return (
    <AppLayout>
      <WorkflowOrchestrator />
    </AppLayout>
  );
}

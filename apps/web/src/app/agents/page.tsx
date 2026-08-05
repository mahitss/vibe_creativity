import { AppLayout } from "../../features/shell/components/app-layout";
import { AgentRegistryDashboard } from "../../features/agents/components/agent-registry-dashboard";

export default function AgentsPage() {
  return (
    <AppLayout>
      <AgentRegistryDashboard />
    </AppLayout>
  );
}

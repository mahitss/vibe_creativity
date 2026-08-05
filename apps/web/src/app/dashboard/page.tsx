import { AppLayout } from "../../features/shell/components/app-layout";
import { MissionControlWorkspace } from "../../features/mission-control/components/mission-control-workspace";

export default function DashboardPage() {
  return (
    <AppLayout>
      <MissionControlWorkspace userDisplayName="Mahit" />
    </AppLayout>
  );
}

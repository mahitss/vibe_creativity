import { AppLayout } from "../../features/shell/components/app-layout";
import { MissionControlCockpit } from "../../features/mission-control/components/mission-control-cockpit";

export default function MissionsPage() {
  return (
    <AppLayout>
      <MissionControlCockpit />
    </AppLayout>
  );
}

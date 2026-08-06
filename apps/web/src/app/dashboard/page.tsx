"use client";

import { AppLayout } from "../../features/shell/components/app-layout";
import { MissionControlCockpit } from "../../features/mission-control/components/mission-control-cockpit";

export default function DashboardPage() {
  return (
    <AppLayout>
      <MissionControlCockpit />
    </AppLayout>
  );
}

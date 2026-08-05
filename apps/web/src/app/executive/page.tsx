import { AppLayout } from "../../features/shell/components/app-layout";
import { ExecutiveDashboard } from "../../features/executive/components/executive-dashboard";

export default function ExecutivePage() {
  return (
    <AppLayout>
      <ExecutiveDashboard />
    </AppLayout>
  );
}

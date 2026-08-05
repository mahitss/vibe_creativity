import { AppLayout } from "../../features/shell/components/app-layout";
import { RuntimeDashboard } from "../../features/runtime/components/runtime-dashboard";

export default function RuntimePage() {
  return (
    <AppLayout>
      <RuntimeDashboard />
    </AppLayout>
  );
}

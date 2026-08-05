import { AppLayout } from "../../features/shell/components/app-layout";
import { EvaluationDashboard } from "../../features/evaluation/components/evaluation-dashboard";

export default function EvaluationPage() {
  return (
    <AppLayout>
      <EvaluationDashboard />
    </AppLayout>
  );
}

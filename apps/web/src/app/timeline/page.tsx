import { AppLayout } from "../../features/shell/components/app-layout";
import { LivingMemoryTimeline } from "../../features/timeline/components/living-memory-timeline";

export default function TimelinePage() {
  return (
    <AppLayout>
      <LivingMemoryTimeline />
    </AppLayout>
  );
}

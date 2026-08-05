import { AppLayout } from "../../features/shell/components/app-layout";
import { KnowledgeUniverseCanvas } from "../../features/universe/components/knowledge-universe-canvas";

export default function UniversePage() {
  return (
    <AppLayout>
      <KnowledgeUniverseCanvas />
    </AppLayout>
  );
}

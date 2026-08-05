import { AppLayout } from "../../features/shell/components/app-layout";
import { CommunityWorkspace } from "../../features/community/components/community-workspace";

export default function CommunityPage() {
  return (
    <AppLayout>
      <CommunityWorkspace />
    </AppLayout>
  );
}

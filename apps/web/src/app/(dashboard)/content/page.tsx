"use client";

import { AppLayout } from "../../../features/shell/components/app-layout";
import { ContentStrategyWorkspace } from "../../../features/content/components/content-strategy-workspace";

export default function ContentPage() {
  return (
    <AppLayout>
      <ContentStrategyWorkspace />
    </AppLayout>
  );
}

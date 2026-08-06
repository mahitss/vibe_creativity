"use client";

import { AppLayout } from "../../../features/shell/components/app-layout";
import { SponsorWorkspace } from "../../../features/sponsors/components/sponsor-workspace";

export default function SponsorsPage() {
  return (
    <AppLayout>
      <SponsorWorkspace />
    </AppLayout>
  );
}

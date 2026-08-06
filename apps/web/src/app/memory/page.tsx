"use client";

import { AppLayout } from "../../features/shell/components/app-layout";
import { MemoryStudio } from "../../features/memory/components/memory-studio";

export default function MemoryPage() {
  return (
    <AppLayout>
      <MemoryStudio />
    </AppLayout>
  );
}

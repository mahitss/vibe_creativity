"use client";

import React, { Suspense } from "react";
import { ShellProvider } from "../providers/shell-provider";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { ContextPanel } from "./context-panel";
import { StatusBar } from "./status-bar";
import { CommandPalette } from "./command-palette";

function ShellContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen select-none flex-col overflow-hidden bg-neutral-950 font-sans text-neutral-100 antialiased">
      {/* Top Bar */}
      <Topbar />

      {/* Center Body: Sidebar + Main Area + Right Context Panel */}
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main Content Scrollable Workspace */}
        <main className="scrollbar-thin scrollbar-thumb-neutral-800 flex-1 overflow-y-auto bg-neutral-950 p-6">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center space-x-2 font-mono text-xs text-neutral-500">
                <span className="h-2 w-2 animate-ping rounded-full bg-indigo-500" />
                <span>Loading OMNIA Workspace...</span>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>

        <ContextPanel />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShellProvider>
      <ShellContent>{children}</ShellContent>
    </ShellProvider>
  );
}

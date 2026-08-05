"use client";

import React from "react";
import { X, Layers, Brain } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function ContextPanel() {
  const { rightPanelOpen, rightPanelTitle, rightPanelContent, closeRightPanel } = useShell();

  if (!rightPanelOpen) return null;

  return (
    <aside className="border-neutral-850 z-10 flex w-80 shrink-0 select-none flex-col border-l bg-neutral-950 font-sans text-xs">
      {/* Panel Header */}
      <div className="border-neutral-850 flex h-10 items-center justify-between border-b bg-neutral-900/50 px-4">
        <div className="flex items-center gap-2 truncate">
          <Brain className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span className="truncate font-bold text-neutral-200">
            {rightPanelTitle || "Context Inspector"}
          </span>
        </div>
        <button
          onClick={closeRightPanel}
          className="hover:bg-neutral-850 rounded-lg p-1 text-neutral-400 transition hover:text-neutral-200"
          title="Close Context Panel"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {rightPanelContent ? (
          rightPanelContent
        ) : (
          <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
            <Layers className="mx-auto h-6 w-6 text-neutral-600" />
            <p>Select any entity or memory item to inspect details.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

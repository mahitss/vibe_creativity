"use client";

import React from "react";
import { Search } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function SearchBar() {
  const { setCommandPaletteOpen } = useShell();

  return (
    <button
      onClick={() => setCommandPaletteOpen(true)}
      className="hover:bg-neutral-850 flex w-64 items-center justify-between gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-neutral-700"
    >
      <div className="flex items-center gap-2 truncate">
        <Search className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
        <span className="truncate">Search commands, pages...</span>
      </div>
      <kbd className="shrink-0 rounded border border-neutral-800 bg-neutral-950 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
        Ctrl K
      </kbd>
    </button>
  );
}

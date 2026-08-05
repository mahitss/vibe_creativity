"use client";

import React from "react";
import { Activity, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function StatusBar() {
  const { setSidebarCollapsed, setCommandPaletteOpen } = useShell();

  return (
    <footer className="border-neutral-850 z-20 flex h-7 shrink-0 select-none items-center justify-between border-t bg-neutral-950 px-3 font-mono text-[11px] text-neutral-400">
      {/* Left System Metrics */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-semibold">Connected</span>
        </div>

        <div className="bg-neutral-850 h-3 w-px" />

        <div className="flex items-center gap-1">
          <Cpu className="h-3 w-3 text-indigo-400" />
          <span>OMNIA Core v1.0</span>
        </div>

        <div className="bg-neutral-850 hidden h-3 w-px sm:block" />

        <div className="hidden items-center gap-1 text-neutral-400 sm:flex">
          <ShieldCheck className="h-3 w-3 text-cyan-400" />
          <span>Tenant Isolation Active</span>
        </div>
      </div>

      {/* Right Shortcut Cheatsheet */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="transition hover:text-neutral-200"
        >
          Sidebar{" "}
          <kbd className="py-0.2 rounded border border-neutral-800 bg-neutral-900 px-1 text-[9px]">
            Ctrl B
          </kbd>
        </button>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="transition hover:text-neutral-200"
        >
          Commands{" "}
          <kbd className="py-0.2 rounded border border-neutral-800 bg-neutral-900 px-1 text-[9px]">
            Ctrl K
          </kbd>
        </button>
      </div>
    </footer>
  );
}

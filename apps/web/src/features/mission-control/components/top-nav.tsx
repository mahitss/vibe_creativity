"use client";

import {
  Bell,
  Bot,
  Brain,
  ChevronDown,
  Cpu,
  Database,
  Radio,
  Search,
  Sparkles,
  User,
} from "lucide-react";

interface TopNavProps {
  onOpenCommandPalette: () => void;
  userDisplayName: string;
  onOpenDemo?: () => void;
}

export function TopNav({ onOpenCommandPalette, userDisplayName, onOpenDemo }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-950/80 px-4 font-sans backdrop-blur md:px-6">
      {/* Left: Brand Logo & Workspace Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 font-mono text-xs font-bold text-neutral-950 shadow-sm">
            O
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-100">OMNIA</span>
        </div>

        <div className="hidden h-4 w-[1px] bg-neutral-800 sm:block" />

        <div className="hidden cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-xs text-neutral-400 transition hover:border-neutral-800 hover:bg-neutral-900 hover:text-neutral-200 sm:flex">
          <span className="font-medium text-neutral-200">{userDisplayName}&apos;s Workspace</span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="mx-4 hidden max-w-md flex-1 md:block">
        <button
          onClick={onOpenCommandPalette}
          className="flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-400 shadow-inner transition hover:border-neutral-700 hover:text-neutral-300"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-neutral-500" />
            <span>Search or jump to command...</span>
          </div>
          <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Live Agent Status & Demo Mode Trigger */}
      <div className="flex items-center gap-3">
        {/* Launch Demo Mode Button */}
        {onOpenDemo && (
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500"
          >
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>2-Min Demo</span>
          </button>
        )}
        {/* Live Status Indicators */}
        <div className="hidden items-center gap-2 font-mono text-[11px] lg:flex">
          <div className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-neutral-400">Agent Thinking</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-400">
            <Database className="h-3 w-3 text-blue-400" />
            <span>Memory Sync</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-400">
            <Radio className="h-3 w-3 text-indigo-400" />
            <span>Community Scan</span>
          </div>
        </div>

        <div className="hidden h-4 w-[1px] bg-neutral-800 lg:block" />

        {/* Search button mobile */}
        <button
          onClick={onOpenCommandPalette}
          className="p-2 text-neutral-400 hover:text-neutral-200 md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-xs font-semibold text-neutral-200">
          {userDisplayName[0]?.toUpperCase() ?? "M"}
        </div>
      </div>
    </header>
  );
}

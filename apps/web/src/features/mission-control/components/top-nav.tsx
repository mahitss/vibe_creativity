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
}

export function TopNav({ onOpenCommandPalette, userDisplayName }: TopNavProps) {
  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between font-sans">
      {/* Left: Brand Logo & Workspace Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-neutral-100 text-neutral-950 flex items-center justify-center font-bold text-xs font-mono shadow-sm">
            O
          </div>
          <span className="font-semibold text-sm tracking-tight text-neutral-100">OMNIA</span>
        </div>

        <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer transition py-1 px-2 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800">
          <span className="font-medium text-neutral-200">{userDisplayName}'s Workspace</span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-400 hover:text-neutral-300 transition shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-neutral-500" />
            <span>Search or jump to command...</span>
          </div>
          <kbd className="font-mono text-[10px] bg-neutral-800 border border-neutral-700 text-neutral-400 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Live Agent Status & Profile */}
      <div className="flex items-center gap-3">
        {/* Live Status Indicators */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-400">Agent Thinking</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
            <Database className="h-3 w-3 text-blue-400" />
            <span>Memory Sync</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
            <Radio className="h-3 w-3 text-indigo-400" />
            <span>Community Scan</span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-neutral-800 hidden lg:block" />

        {/* Search button mobile */}
        <button
          onClick={onOpenCommandPalette}
          className="p-2 text-neutral-400 hover:text-neutral-200 md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 text-neutral-400 hover:text-neutral-200 rounded-md hover:bg-neutral-900 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </button>

        {/* User Profile Avatar */}
        <div className="h-7 w-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-semibold text-neutral-200 cursor-pointer">
          {userDisplayName[0]?.toUpperCase() ?? "M"}
        </div>
      </div>
    </header>
  );
}

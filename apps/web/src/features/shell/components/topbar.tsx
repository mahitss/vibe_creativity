"use client";

import React from "react";
import { Sun, Moon, Laptop, ShieldCheck } from "lucide-react";
import { useShell } from "../providers/shell-provider";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SearchBar } from "./search-bar";
import { AgentStatus } from "./agent-status";
import { NotificationBell } from "./notification-bell";

export function Topbar() {
  const { theme, setTheme } = useShell();

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const getThemeIcon = () => {
    if (theme === "dark") return <Moon className="h-3.5 w-3.5 text-neutral-400" />;
    if (theme === "light") return <Sun className="h-3.5 w-3.5 text-amber-500" />;
    return <Laptop className="h-3.5 w-3.5 text-neutral-400" />;
  };

  return (
    <header className="border-neutral-850 z-20 flex h-12 shrink-0 select-none items-center justify-between border-b bg-neutral-950 px-4 font-sans text-xs">
      {/* Left Section: Workspace Switcher & Search */}
      <div className="flex items-center gap-3">
        <WorkspaceSwitcher />
        <div className="bg-neutral-850 hidden h-4 w-px sm:block" />
        <SearchBar />
      </div>

      {/* Right Section: System Sync, Agent Status, Theme, Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 font-mono text-[11px] text-neutral-400 md:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Tenant Isolated (X-Creator-Id)</span>
        </div>

        <div className="bg-neutral-850 hidden h-4 w-px md:block" />

        <AgentStatus />

        <NotificationBell />

        <button
          onClick={toggleTheme}
          className="hover:bg-neutral-850 rounded-lg border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400 transition hover:border-neutral-700"
          title={`Theme: ${theme}`}
        >
          {getThemeIcon()}
        </button>

        <div className="bg-neutral-850 h-4 w-px" />

        {/* User Avatar */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-sm">
          M
        </div>
      </div>
    </header>
  );
}

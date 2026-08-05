"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Plus, Layers } from "lucide-react";
import { useShell } from "../providers/shell-provider";

export function WorkspaceSwitcher() {
  const { workspaceName, setWorkspaceName } = useShell();
  const [isOpen, setIsOpen] = useState(false);

  const workspaces = [
    { id: "ws-1", name: "OMNIA Creator Studio", role: "Owner" },
    { id: "ws-2", name: "Engineering & AI Lab", role: "Admin" },
    { id: "ws-3", name: "Content Operations", role: "Editor" },
  ];

  return (
    <div className="relative font-sans text-xs">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:bg-neutral-850 flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 font-medium text-neutral-200 transition hover:border-neutral-700"
      >
        <div className="flex h-4 w-4 items-center justify-center rounded bg-indigo-600 text-[10px] font-bold uppercase text-white">
          {workspaceName.charAt(0)}
        </div>
        <span className="max-w-[140px] truncate font-semibold">{workspaceName}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-1 w-56 space-y-1 rounded-xl border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
            <div className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Workspaces
            </div>

            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setWorkspaceName(ws.name);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition ${
                  workspaceName === ws.name
                    ? "bg-neutral-800 font-semibold text-neutral-100"
                    : "hover:bg-neutral-850 text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Layers className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                  <span className="truncate">{ws.name}</span>
                </div>
                {workspaceName === ws.name && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                )}
              </button>
            ))}

            <div className="my-1 border-t border-neutral-800" />

            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-neutral-850 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-neutral-400 transition hover:text-neutral-200"
            >
              <Plus className="h-3.5 w-3.5 text-neutral-400" />
              <span>Create Workspace</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

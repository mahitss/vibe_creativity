"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export function OnboardingWorkspaceForm() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("OMNIA Creator Studio");
  const [timezone, setTimezone] = useState("America/New_York");
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      router.push("/dashboard");
    }, 1000);
  };

  const slug = workspaceName.toLowerCase().replace(/ /g, "-").replace(/'/g, "");

  return (
    <div className="flex min-h-screen w-screen select-none flex-col justify-between bg-neutral-950 p-6 font-sans text-neutral-100">
      <header className="mx-auto flex w-full max-w-xl items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
            Ω
          </div>
          <span className="text-sm font-bold tracking-tight text-neutral-100">
            OMNIA OS Onboarding
          </span>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400">
          First Login Setup
        </span>
      </header>

      <main className="border-neutral-850 mx-auto my-auto w-full max-w-xl space-y-6 rounded-3xl border bg-neutral-900 p-8 shadow-2xl">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-bold text-neutral-100">Configure Your Creator Workspace</h1>
          <p className="text-xs text-neutral-400">
            Every workspace automatically receives an isolated Executive Mind, memory substrate, and
            agent registry.
          </p>
        </div>

        <form onSubmit={handleInitialize} className="space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase text-neutral-400">
              Workspace Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs font-semibold text-neutral-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-neutral-400">
                Primary Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-xs text-neutral-200 focus:outline-none"
              >
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-neutral-400">Region</label>
              <input
                type="text"
                disabled
                value="us-east (Encrypted)"
                className="border-neutral-850 w-full rounded-xl border bg-neutral-950 px-3 py-2.5 font-mono text-xs text-neutral-500"
              />
            </div>
          </div>

          {/* Automatic Executive Mind Preview Card */}
          <div className="space-y-2 rounded-2xl border border-indigo-500/30 bg-neutral-950 p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-indigo-400" />
              <span className="font-bold text-neutral-200">
                Automatic Executive Mind Provisioning
              </span>
            </div>

            <div className="space-y-1 font-mono text-[10px] text-neutral-400">
              <p>
                Memory Namespace: <span className="text-emerald-400">omnia.{slug}.mind</span>
              </p>
              <p>
                Knowledge Graph: <span className="text-cyan-400">omnia.{slug}.graph</span>
              </p>
              <p>
                Agent Registry: <span className="text-violet-400">6 Specialized Agents Bound</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isInitializing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
          >
            <span>
              {isInitializing
                ? "Initializing Executive Mind..."
                : "Initialize Workspace & Launch OMNIA"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </main>

      <footer className="flex items-center justify-center gap-2 py-4 text-center font-mono text-[11px] text-neutral-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>One Workspace · One Executive Mind · Zero Hallucination Guarantee</span>
      </footer>
    </div>
  );
}

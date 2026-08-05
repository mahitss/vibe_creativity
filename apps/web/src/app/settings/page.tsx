import { AppLayout } from "../../features/shell/components/app-layout";
import { Settings, Shield, Key, Bell, User, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-6 pb-12 font-sans text-neutral-100">
        <header className="border-neutral-850 border-b pb-4">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            <Settings className="h-6 w-6 text-indigo-400" /> Platform &amp; Tenant Settings
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Manage your workspace configuration, security isolation, API credentials, and
            notification preferences.
          </p>
        </header>

        <section className="space-y-4 font-sans text-xs">
          <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl">
            <div className="border-neutral-850 flex items-center gap-2 border-b pb-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-neutral-100">
                Tenant Security &amp; Isolation
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Tenant Isolation ID:{" "}
              <code className="rounded bg-neutral-950 px-2 py-0.5 font-mono text-emerald-400">
                X-Creator-Id: creator-default
              </code>
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl">
            <div className="border-neutral-850 flex items-center gap-2 border-b pb-2">
              <Database className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-neutral-100">Memory Substrate Storage</h2>
            </div>
            <p className="text-xs text-neutral-400">
              Persistent memory database configured with 100% provenance grounding and
              zero-hallucination policy.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

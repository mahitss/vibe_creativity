import { AppLayout } from "../../features/shell/components/app-layout";
import { BarChart3, TrendingUp, Users, Zap, Eye, Clock } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
        <header className="border-neutral-850 border-b pb-4">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            <BarChart3 className="h-6 w-6 text-indigo-400" /> Analytics &amp; Performance Insights
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Real-time telemetry, creator audience retention trends, and multi-channel performance
            intelligence.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <span className="block font-mono text-[10px] uppercase text-neutral-500">
              Total Monthly Views
            </span>
            <p className="font-mono text-xl font-bold text-indigo-400">1,420,000</p>
            <span className="font-mono text-[10px] text-emerald-400">+14.2% Growth</span>
          </div>

          <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <span className="block font-mono text-[10px] uppercase text-neutral-500">
              Average Watch Time
            </span>
            <p className="font-mono text-xl font-bold text-violet-400">11m 42s</p>
            <span className="font-mono text-[10px] text-neutral-400">High Retention</span>
          </div>

          <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <span className="block font-mono text-[10px] uppercase text-neutral-500">
              Subscriber Conversion
            </span>
            <p className="font-mono text-xl font-bold text-emerald-400">4.8%</p>
            <span className="font-mono text-[10px] text-emerald-400">+0.6% Benchmark</span>
          </div>

          <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <span className="block font-mono text-[10px] uppercase text-neutral-500">
              Sponsor Conversion
            </span>
            <p className="font-mono text-xl font-bold text-cyan-400">$15,000 / Mo</p>
            <span className="font-mono text-[10px] text-neutral-400">Q3 Active Contract</span>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

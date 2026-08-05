"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // First-time users or missing workspace redirect to /onboarding, else /dashboard
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-screen select-none flex-col justify-between bg-neutral-950 p-6 font-sans text-neutral-100">
      {/* Top Brand Banner */}
      <header className="mx-auto flex w-full max-w-md items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-md">
            Ω
          </div>
          <span className="text-sm font-bold tracking-tight text-neutral-100">OMNIA OS</span>
        </div>
        <span className="rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          v1.0 Pro
        </span>
      </header>

      {/* Main Sign In Card */}
      <main className="border-neutral-850 mx-auto my-auto w-full max-w-md space-y-6 rounded-3xl border bg-neutral-900 p-8 shadow-2xl">
        <div className="space-y-1.5 text-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-100">Sign in to OMNIA</h1>
          <p className="text-xs text-neutral-400">
            Access your persistent creator operating system &amp; executive mind.
          </p>
        </div>

        {/* Social Providers */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="hover:bg-neutral-850 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-neutral-200 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="hover:bg-neutral-850 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-neutral-200 transition"
          >
            <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-neutral-850 h-px flex-1" />
          <span className="font-mono text-[10px] uppercase text-neutral-500">Or Email</span>
          <div className="bg-neutral-850 h-px flex-1" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase text-neutral-400">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@omnia.ai"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-3 text-xs text-neutral-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-semibold text-white shadow-md transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
          >
            <span>{isLoading ? "Signing in..." : "Continue to Workspace"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </main>

      {/* Footer Security Badges */}
      <footer className="flex items-center justify-center gap-2 py-4 text-center font-mono text-[11px] text-neutral-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Strict Tenant Isolation &amp; Encrypted Sessions</span>
      </footer>
    </div>
  );
}

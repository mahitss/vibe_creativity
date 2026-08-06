"use client";

import * as React from "react";
import { Button } from "@omnia/ui";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 font-sans text-slate-100">
      <section className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
          System boundary
        </p>
        <h1 className="text-xl font-extrabold text-slate-100">Something interrupted OMNIA.</h1>
        <p className="text-xs leading-relaxed text-slate-400">
          The client shell caught the failure before it could leak into the session state.
        </p>
        <Button
          className="mt-4 bg-emerald-500 font-bold text-slate-950 hover:bg-emerald-400"
          onClick={reset}
        >
          Recover session
        </Button>
      </section>
    </main>
  );
}

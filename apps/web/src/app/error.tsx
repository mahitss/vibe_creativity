"use client";

import * as React from "react";
import { Button } from "@omnia/ui";

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
          <section className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-8">
            <p className="text-sm text-neutral-500">System boundary</p>
            <h1 className="mt-3 text-2xl font-semibold text-neutral-950">Something interrupted OMNIA.</h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              The client shell caught the failure before it could leak into the session state.
            </p>
            <Button className="mt-6" onClick={reset}>
              Recover session
            </Button>
          </section>
        </main>
      </body>
    </html>
  );
}


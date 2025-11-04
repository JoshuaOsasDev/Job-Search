"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { AlertTriangle } from "lucide-react";

export default function PostError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const route = useRouter();

  const reload = () => {
    startTransition(() => {
      route.refresh();
      reset();
    });
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Something went wrong!
        </h1>
        <p className="mb-6 text-base text-gray-600">{error.message}</p>

        <button
          onClick={reload}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-700 px-6 py-3 text-sm font-medium text-indigo-100 transition hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

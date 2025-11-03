"use client";

import { ReactNode } from "react";
import { login } from "../_libs/auth";

export default function SubmitProviderButton({
  children,
  provider,
}: {
  children: ReactNode;
  provider: "github" | "google";
}) {
  return (
    <button
      onClick={() => login(provider)}
      type="button"
      className="mb-3 flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      aria-label="Sign in with GitHub"
    >
      {children}
    </button>
  );
}

import SubmitProviderButton from "@/app/_components/SubmitProviderButton";
import React from "react";

export default function signInPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 dark:bg-slate-900">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-center gap-3">
          {/* Small logo area */}
          <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
            {/* Example tiny job/logo SVG */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 7a2 2 0 0 1 2-2h3l2 3h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
                fill="white"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Welcome to the Job Board
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Sign in to post jobs or apply for opportunities
            </p>
          </div>
        </div>

        {/* form-like area (non-interactive example) */}
        <div className="mb-4 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:border-slate-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:border-slate-700"
          />
          <button className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
            Sign in
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
        </div>

        {/* Sign in with Git (GitHub) */}
        <div className="mt-4">
          <SubmitProviderButton provider="github">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-800 dark:text-gray-100"
            >
              <title>GitHub</title>
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.085 3.292 9.394 7.865 10.915.575.106.785-.249.785-.554 0-.273-.01-1-.015-1.962-3.197.695-3.873-1.54-3.873-1.54-.523-1.328-1.276-1.682-1.276-1.682-1.043-.713.08-.699.08-.699 1.153.082 1.76 1.185 1.76 1.185 1.025 1.755 2.689 1.249 3.344.955.104-.743.402-1.249.732-1.536-2.552-.29-5.236-1.276-5.236-5.673 0-1.252.447-2.276 1.179-3.08-.118-.29-.511-1.458.112-3.038 0 0 .963-.31 3.156 1.175a10.99 10.99 0 0 1 2.873-.386c.976.004 1.96.132 2.873.386 2.191-1.485 3.153-1.175 3.153-1.175.625 1.58.232 2.748.114 3.038.734.804 1.179 1.828 1.179 3.08 0 4.406-2.688 5.379-5.25 5.66.413.354.783 1.053.783 2.122 0 1.532-.014 2.766-.014 3.144 0 .309.207.667.79.553C20.71 21.39 24 17.082 24 12 24 5.648 18.352.5 12 .5z" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Sign in with GitHub
            </span>
          </SubmitProviderButton>

          {/* Google */}
          <SubmitProviderButton provider="google">
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-800 dark:text-gray-100"
            >
              <title>Google</title>
              <path
                fill="#EA4335"
                d="M24 9.5c3.04 0 5.69 1.04 7.81 3.07l5.83-5.83C33.73 3.17 29.24 1 24 1 14.88 1 7.16 6.64 3.72 14.26l6.93 5.39C12.2 14.04 17.56 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.63-.15-3.18-.44-4.68H24v9.09h12.72c-.55 2.89-2.22 5.34-4.72 6.99l7.24 5.63c4.23-3.9 6.76-9.64 6.76-16.03z"
              />
              <path
                fill="#4A90E2"
                d="M9.05 28.65A14.43 14.43 0 0 1 8 24c0-1.62.28-3.18.77-4.65l-6.93-5.39A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.57 10.78l6.48-6.13z"
              />
              <path
                fill="#FBBC05"
                d="M24 47c6.5 0 11.96-2.14 15.95-5.82l-7.24-5.63c-2.01 1.36-4.58 2.17-7.71 2.17-6.45 0-11.8-4.55-13.35-10.72l-6.93 5.39C7.16 41.36 14.88 47 24 47z"
              />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Sign in with Google
            </span>
          </SubmitProviderButton>
        </div>

        {/* footer */}
        <p className="mt-4 text-xs text-gray-400">
          By signing in you agree to our{" "}
          <span className="underline">terms</span>.
        </p>
      </div>
    </div>
  );
}

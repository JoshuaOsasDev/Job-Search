"use client";

import { motion } from "framer-motion";

export default function JobDetailsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl animate-pulse"
    >
      <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
        {/* Back button placeholder */}
        <div className="mb-6 h-8 w-40 rounded-lg bg-gray-200" />

        {/* Job title */}
        <div className="mb-2 h-8 w-3/4 rounded-md bg-gray-200" />
        <div className="mb-4 h-6 w-1/2 rounded-md bg-gray-200" />

        {/* Job info row */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="h-5 w-20 rounded-full bg-gray-200" />
          <div className="h-5 w-16 rounded-full bg-gray-200" />
          <div className="h-5 w-24 rounded-full bg-gray-200" />
          <div className="h-5 w-28 rounded-full bg-gray-200" />
        </div>

        {/* Posted by */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-200" />
          <div className="h-5 w-32 rounded-md bg-gray-200" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-gray-200" />
          <div className="h-4 w-11/12 rounded-md bg-gray-200" />
          <div className="h-4 w-10/12 rounded-md bg-gray-200" />
          <div className="h-4 w-9/12 rounded-md bg-gray-200" />
        </div>

        {/* Apply button */}
        <div className="mt-8 h-10 w-32 rounded-lg bg-gray-200" />
      </div>
    </motion.div>
  );
}

export function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:gap-4"
    >
      {/* Each card imitates the look of your dashboard cards */}
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-md"
    >
      {/* Title placeholder */}
      <div className="mb-5 h-5 w-40 animate-pulse rounded-md bg-gray-200" />

      {/* Circular placeholder (like profile completion ring) */}
      <div className="flex items-center space-x-6">
        <div className="relative h-24 w-24 flex-shrink-0 animate-pulse rounded-full bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-3 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <div className="h-3 w-2/3 animate-pulse rounded-md bg-gray-200" />
          <div className="h-3 w-1/2 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>

      {/* Button placeholder */}
      <div className="mt-6 h-9 w-32 animate-pulse rounded-full bg-gray-300" />
    </motion.div>
  );
}

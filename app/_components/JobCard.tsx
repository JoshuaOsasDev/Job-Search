"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { LinkIcon, MapPinCheck } from "lucide-react";
import { Props } from "../_types/types";
import { useState } from "react";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function JobCard({ jobs }: Props) {
  const [expandedJobs, setExpandedJobs] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleShowMore = (jobId: string) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId], // toggle only this job
    }));
  };

  // Render a message if there are no jobs to display.
  if (!jobs || jobs.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No jobs to display at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {jobs.map((job) => {
        const words = job.description?.split(" ") || [];
        const isLong = words.length >= 15;
        const shortDescription = words.slice(0, 20).join(" ") + "...";
        const isExpanded = expandedJobs[job.id] || false; // ✅ get per-job expansion state

        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-xl bg-white p-6 shadow-sm transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="md:w-3/4">
                <h2
                  className={`mb-2 text-2xl font-semibold text-gray-900 ${geistMono.className}`}
                >
                  {job.title}
                </h2>
                <p className="mb-2 font-medium text-gray-600">{job.company}</p>
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPinCheck /> {job.location}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {job.type}
                  </span>
                </div>

                {/* ✅ use the per-job state */}
                <p className="text-lg text-gray-600">
                  {isExpanded || !isLong ? job.description : shortDescription}
                </p>

                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggleShowMore(job.id)}
                    className="text-sm font-medium text-indigo-500 hover:underline"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              {job.salary && (
                <div className="mt-4 md:mt-0">
                  <span className="text-lg font-semibold text-gray-900">
                    {job.salary}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-300">
                  {job.postedBy.image ? (
                    <Image
                      src={job.postedBy.image}
                      alt={job.postedBy.name || "User avatar"}
                      className="h-full w-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                      <span className="text-sm font-medium">
                        {job.postedBy.name?.[0]?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Posted by {job.postedBy.name}
                </span>
              </div>
              <Link
                href={`/job/${job.id}`}
                className="flex cursor-pointer items-center gap-1 pl-2 font-medium text-indigo-600 hover:text-indigo-700"
              >
                <LinkIcon />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  ArrowLeft,
  CreditCard,
  Users,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "./ApplyButton";
import { JobProps } from "../_types/types";
import Image from "next/image";

export default function JobDetails({ job }: { job: JobProps }) {
  const { _count: JobCount } = job;
  // console.log(job);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-4xl"
    >
      <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
        {/* 🔙 Back link */}
        <Link
          href="/job"
          className="mb-6 inline-flex items-center gap-2 rounded-lg bg-indigo-700 p-2 text-sm text-indigo-100 transition hover:text-indigo-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Jobs</span>
        </Link>

        {/* 🧾 Job Header */}
        <div className="mb-3 sm:mb-6">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:mb-1">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 sm:text-2xl">
            <Building2 className="h-4 w-4" />
            <span className="font-medium">{job.company}</span>
          </div>
        </div>

        {/* 📍 Job Info */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>{job.type}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        {JobCount && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <Users className="mb-[3px] h-4 w-4" />
            <span>
              {JobCount.application > 0 ? JobCount.application : "No"} persons
              applied
            </span>
          </div>
        )}

        {/* ✍️ Posted by */}
        <div className="mb-8 flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-200">
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
          <div>
            <p className="text-sm text-gray-600">
              Posted by{" "}
              <span className="font-medium text-gray-900">
                {job.postedBy.name}
              </span>
            </p>
          </div>
        </div>

        {/* 🧠 Job Description */}
        <div className="max-w-none">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Job Description
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed tracking-wide whitespace-pre-wrap text-gray-700"
          >
            {job.description}
          </motion.div>
        </div>

        {/* 🚀 Apply Button */}
        <div className="mt-1 border-t border-gray-100 pt-8">
          <ApplyButton jobId={job.id} postedById={job.postedById} />
        </div>
      </div>
    </motion.div>
  );
}

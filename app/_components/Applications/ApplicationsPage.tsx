"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, MapPin, Building2, Clock, CreditCard } from "lucide-react";
import { Application } from "@/app/_types/types";

export default function ApplicationsPage({
  applications,
}: {
  applications: Application[];
}) {
  if (!applications || applications.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No applications yet.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full px-4 py-8"
    >
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        My Applications
      </h2>

      <div className="grid gap-6">
        {applications.map((app) => (
          <motion.div
            key={app.id}
            // whileHover={{ scale: 1.01 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {app.job.title}
                </h3>
                <p className="flex items-center text-gray-500">
                  <Building2 size={16} className="mr-1" />
                  {app.job.company}
                </p>
              </div>

              <span
                className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ${
                  app.status === "PENDING"
                    ? "bg-gray-500 text-gray-100"
                    : app.status === "OFFERED"
                      ? "bg-green-100 text-green-800"
                      : app.status === "INTERVIEW"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {app.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPin size={15} className="mr-1" /> {app.job.location}
              </span>
              <span className="flex items-center">
                <Briefcase size={15} className="mr-1" /> {app.job.type}
              </span>
              <span className="flex items-center">
                <CreditCard size={15} className="mr-1" /> {app.job.salary}
              </span>
              <span className="flex items-center">
                <Clock size={15} className="mr-1" /> Applied{" "}
                {formatDistanceToNow(new Date(app.appliedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

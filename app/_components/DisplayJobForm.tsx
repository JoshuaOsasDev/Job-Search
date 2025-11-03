"use client";

import { ListFilterPlus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function DisplayJobForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const q = formData.get("q")?.toString().trim() || "";
    const type = formData.get("type")?.toString().trim() || "";
    const location = formData.get("location")?.toString().trim() || "";

    const params = new URLSearchParams(searchParams.toString());

    // Update or clear parameters
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }

    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }

    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    router.push(`/job?${params.toString()}`, { scroll: true });
  };

  return (
    <>
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
      >
        <h1
          className={`${
            open ? "mb-2" : ""
          } text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl`}
        >
          Find Your Dream Job
        </h1>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((prev) => !prev)}
          className={`flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto ${
            open ? "mb-2" : ""
          }`}
        >
          <ListFilterPlus className="h-4 w-4 text-gray-600" />
          <span>{open ? "Hide Filters" : "Filter Jobs"}</span>
        </motion.button>
      </motion.div>

      {/* FILTER FORM */}
      <AnimatePresence>
        {open && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
          >
            <input
              type="text"
              name="q"
              placeholder="Search jobs..."
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              defaultValue={searchParams.get("q") || ""}
            />

            <select
              name="type"
              className="rounded-md border border-gray-300 px-2.5 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              defaultValue={searchParams.get("type") || ""}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              defaultValue={searchParams.get("location") || ""}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:col-span-2 md:col-span-3 md:w-auto md:justify-self-end"
            >
              Search
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

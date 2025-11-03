"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HandleJobPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payLoad = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      description: formData.get("description"),
      salary: formData.get("salary"),
      type: formData.get("type"),
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      router.replace("/job");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  //  Small animated spinner
  const Spinner = () => (
    <motion.div
      className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />
  );
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Post a Job</h1>

      <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { id: "title", label: "Job Title", type: "text", required: true },
            { id: "company", label: "Company", type: "text", required: true },
            { id: "location", label: "Location", type: "text", required: true },
            {
              id: "salary",
              label: "Salary (optional)",
              type: "text",
              required: false,
              placeholder: "e.g., $80,000 - $100,000",
            },
          ].map((field) => (
            <div
              key={field.id}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4"
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 sm:w-1/3"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.id}
                id={field.id}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
              />
            </div>
          ))}

          {/* Job Type select */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 sm:w-1/3"
            >
              Job Type
            </label>
            <select
              name="type"
              id="type"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
            >
              <option value="">Select a type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Description textarea */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 sm:w-1/3"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Spinner /> posting...
                </>
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

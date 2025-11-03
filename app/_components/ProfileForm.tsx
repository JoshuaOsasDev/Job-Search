"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { updateProfileAction } from "../_libs/actions/uploadProfile";
import { UserProfile } from "../_types/types";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  userId,
  name,
  profile,
}: {
  userId: string | undefined | null;
  name: string | undefined | null;
  profile: UserProfile;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    await updateProfileAction(formData);

    setIsLoading(false);
    // alert("✅ Profile updated successfully!");
    route.push("/dashboard");
  }

  // Small spinner animation (same as job form)
  const Spinner = () => (
    <motion.div
      className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    />
  );

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Update Profile</h1>

      <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="userId" value={userId ?? ""} />

          {[
            {
              id: "name",
              label: "Full Name",
              value: name ?? "",
              required: true,
            },
            { id: "phone", label: "Phone Number", value: profile?.phone ?? "" },
            {
              id: "location",
              label: "Location",
              value: profile?.location ?? "",
            },
            { id: "website", label: "Website", value: profile?.website ?? "" },
            {
              id: "linkedinUrl",
              label: "LinkedIn URL",
              value: profile?.linkedinUrl ?? "",
            },
            {
              id: "githubUrl",
              label: "GitHub URL",
              value: profile?.githubUrl ?? "",
            },
            {
              id: "portfolio",
              label: "Portfolio URL",
              value: profile?.portfolio ?? "",
            },
            {
              id: "skills",
              label: "Skills (comma-separated)",
              value: profile?.skills ?? "",
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
                type="text"
                id={field.id}
                name={field.id}
                defaultValue={field.value}
                required={field.required ?? false}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
              />
            </div>
          ))}

          {/* Bio */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 sm:w-1/3"
            >
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={5}
              defaultValue={profile?.bio ?? ""}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 sm:w-1/3"
              >
                Resume (PDF)
              </label>
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:mt-0 sm:w-2/3"
              />
            </div>
            {profile?.resumeUrl && (
              <p className="text-sm font-light text-green-600 sm:ml-5 sm:text-center">
                File UpLoaded{" "}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  View Resume
                </a>
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

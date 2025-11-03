"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ApplyButton({
  jobId,
  postedById,
}: {
  jobId: string;
  postedById: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "checking" | "loading" | "success" | "error" | "exists"
  >("checking");
  const [message, setMessage] = useState("");
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  //  If logged-in user posted this job → don’t show Apply button
  const currentUserId = session?.user?.id;
  const isJobOwner = currentUserId === postedById;

  // ✅ Check if the user already applied when page loads
  useEffect(() => {
    const checkApplication = async () => {
      if (!session) return setStatus("idle");

      try {
        const res = await fetch(`/api/jobs/${jobId}/apply`, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data?.applied) {
            setStatus("exists");
            setMessage("You’ve already applied for this job.");
          } else {
            setStatus("idle");
          }
        } else {
          setStatus("idle");
        }
      } catch (error) {
        console.error("Error checking application:", error);
        setStatus("idle");
      }
    };

    checkApplication();
  }, [session, jobId]);

  const handleApply = async () => {
    if (!session) return router.push("/auth/signin");

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });

      if (res.status === 409 || res.status === 404) {
        setStatus("exists");
        setMessage("You’ve already applied for this job.");
        return;
      }

      if (!res.ok) throw new Error(await res.text());

      setStatus("success");
      setMessage("Application submitted successfully!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to apply.");
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

  //  If it's the job poster, hide button entirely
  if (isJobOwner) {
    return (
      <p className="text-gray-500 italic">
        You posted this job — applications are disabled.
      </p>
    );
  }

  //  Auth still loading
  if (authStatus === "loading" || status === "checking") {
    return (
      <button
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-300 px-6 py-3 text-gray-700 sm:w-auto"
      >
        <Spinner /> <span>Checking...</span>
      </button>
    );
  }

  // ✅ Already applied
  if (status === "exists")
    return (
      <div className="text-center">
        <p className="mb-2 text-gray-600">{message}</p>
        <Link
          href="/dashboard"
          className="font-medium text-indigo-600 hover:underline"
        >
          View Application →
        </Link>
      </div>
    );

  // ✅ Successfully applied
  if (status === "success")
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="mb-2 font-medium text-green-600">{message}</p>
        <Link
          href="/dashboard"
          className="font-medium text-indigo-600 hover:underline"
        >
          View in Dashboard →
        </Link>
      </motion.div>
    );

  // 🧠 Apply button
  return (
    <motion.button
      onClick={handleApply}
      disabled={status === "loading"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition sm:w-auto ${
        status === "loading"
          ? "cursor-not-allowed bg-indigo-400"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {status === "loading" ? (
        <>
          <Spinner /> <span>Applying...</span>
        </>
      ) : (
        "Apply Now"
      )}
    </motion.button>
  );
}

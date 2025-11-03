"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { UserProfile } from "../_types/types";

import Link from "next/link";

const calculateCompletionPercentage = (profile: UserProfile | null): number => {
  if (!profile) return 0;

  const fieldsToCheck = [
    "bio",
    "phone",
    "location",
    "website",
    "resumeUrl",
    "linkedinUrl",
    "githubUrl",
    "portfolio",
    "skills",
  ] as const;

  type ProfileField = (typeof fieldsToCheck)[number];

  let completedFields = 0;
  const totalFields = fieldsToCheck.length;

  for (const field of fieldsToCheck) {
    const value = profile[field as ProfileField];
    if (value !== null && (typeof value !== "string" || value.trim() !== "")) {
      completedFields++;
    }
  }

  return Math.round((completedFields / totalFields) * 100);
};

export const ProfileCompletionCard = ({
  profile,
}: {
  profile: UserProfile | null;
}) => {
  const completionPercentage = useMemo(
    () => calculateCompletionPercentage(profile),
    [profile],
  );

  // --- Framer Motion Animations ---
  const progress = useMotionValue(0);
  const strokeDasharray = 314; // 2πr for r=50
  const strokeDashoffset = useTransform(
    progress,
    (p) => strokeDasharray - (strokeDasharray * p) / 100,
  );
  const roundedValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate both arc & number
    const controls = animate(progress, completionPercentage, {
      duration: 1.6,
      ease: "easeInOut",
    });
    const numControls = animate(roundedValue, completionPercentage, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => {
      controls.stop();
      numControls.stop();
    };
  }, [completionPercentage, progress, roundedValue]);

  const progressColor =
    completionPercentage < 50
      ? "text-red-500"
      : completionPercentage < 100
        ? "text-blue-500"
        : "text-green-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-md"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Profile Completion
      </h3>
      <div className="flex flex-col">
        <div className="flex items-center space-x-6">
          {/* Circular Animated Progress */}
          <div className="relative h-28 w-28 flex-shrink-0">
            <svg
              className="h-full w-full -rotate-90 transform"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="10"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>

            {/* Center Number (Animated Count-Up) */}
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
              <motion.span
                className={`text-2xl font-bold ${progressColor}`}
                key={displayValue}
              >
                {displayValue}%
              </motion.span>
            </div>
          </div>

          {/* Info + CTA */}

          <div className="md:pl-1">
            <p className="mb-3 text-sm text-gray-600 md:text-sm">
              Your profile is{" "}
              <span className="font-bold text-gray-900">{displayValue}%</span>{" "}
              complete.
              {completionPercentage < 100 && (
                <span>
                  {" "}
                  Finish adding your details to attract more recruiters.
                </span>
              )}
            </p>
          </div>
        </div>

        <Link
          className="mt-4 rounded-4xl bg-gray-600 px-4 py-2 text-center font-medium text-white shadow-md transition duration-200 hover:bg-gray-500"
          href={"/profile/update"}
        >
          Edit Profile
        </Link>
      </div>
    </motion.div>
  );
};

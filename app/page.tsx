"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import DashboardNavbar from "./_components/DashboardNavbar";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Background image with zoom-in animation */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/getty3.jpg"
          alt="background image"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Gradient overlay (fades in softly) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute inset-0 bg-[rgba(36,42,46,0.5)]"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl leading-tight font-extrabold text-gray-50 sm:text-4xl md:text-4xl"
            >
              Find Your Dream Job,
              <br className="hidden sm:block" />
              Build Your Future
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-6 max-w-xl text-lg text-gray-300"
            >
              Discover thousands of job opportunities that match your skills and
              goals. Connect with top employers, submit your applications, and
              take the next step in your career — all in one place.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/job"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
              >
                Browse Jobs →
              </Link>

              {session?.user ? (
                <Link
                  href="/profile/update"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-white"
                >
                  Update Profile →
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-white"
                >
                  Create Profile →
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right side: optional slider (animated in) */}
          {/* <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden lg:col-span-6 lg:block xl:col-span-7"
          >
            <Slider />
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}

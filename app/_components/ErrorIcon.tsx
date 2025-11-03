"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
export default function ErrorIcon({ props = "jobs" }: { props: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* ✈️ Animated Plane */}
      <motion.div
        initial={{ x: -80, y: 30, rotate: -20, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="relative"
      >
        <Send className="h-16 w-16 text-gray-500" />
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* ✨ Oops Text */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-3xl font-semibold text-gray-800"
      >
        Oops!
      </motion.h2>

      {/* Error Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-gray-500"
      >
        Something went wrong while loading {props}.
      </motion.p>

      {/* Retry Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        transition={{ delay: 0.6 }}
        className="mt-6 rounded-lg bg-gray-500 px-5 py-2 text-white shadow hover:bg-gray-600"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
}

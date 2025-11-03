"use client";
import { motion } from "framer-motion";

export default function SaveJobMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-6 w-full rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold">Saved Jobs</h3>
      <div className="text-gray-600">Features available soon</div>
    </motion.div>
  );
}

// This directive makes this file a Client Component
"use client";

import { motion } from "framer-motion";
import DisplayJobForm from "./DisplayJobForm"; // Assuming this is also a Client Component

export default function AnimatedJobForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: ["easeIn", "easeOut"] }}
      className="rounded-xl bg-white p-6 shadow-md"
    >
      <DisplayJobForm />
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ApplicationMotionSummary({
  pending,
  success,
  rejected,
  interview,
}: {
  pending: number;
  success: number;
  rejected: number;
  interview: number;
}) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🧾 Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-md"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Application Summary
        </h2>

        {/* ✅ 2x2 Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <p className="rounded-2xl bg-gray-500 px-3 py-2 text-center font-medium text-white shadow-sm">
            {pending ? `${pending} In Review` : "No Reviews Yet"}
          </p>

          <p className="rounded-2xl bg-blue-500 px-3 py-2 text-center font-medium text-white shadow-sm">
            {interview ? `${interview} Interview` : "No Interviews"}
          </p>

          <p className="rounded-2xl bg-green-500 px-3 py-2 text-center font-medium text-white shadow-sm">
            {success ? `${success} Successful` : "No Success"}
          </p>

          <p className="rounded-2xl bg-red-500 px-3 py-2 text-center font-medium text-white shadow-sm">
            {rejected ? `${rejected} Rejected` : "No Rejections"}
          </p>
        </div>

        <Link
          href="profile/applications"
          className="rounded-full bg-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-400"
        >
          View All Applications
        </Link>
      </motion.div>

      {/* 🪟 Modal (Framer Motion) */}
      {/* <AnimatePresence>
        {isOpen && (
          <>
       
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

          
            <motion.div
              key="modal"
              initial={{ scale: 0.9, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 60 }}
              transition={{ duration: 0.35, type: "spring" }}
              className="fixed top-1/2 left-1/2 z-50 mt-9 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl sm:w-[90%] md:w-[80%] lg:max-w-xl"
            >
           
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Applications
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

           
              <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-4">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <motion.div
                      key={app.job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
                    >
                      <p className="text-base font-semibold text-gray-800">
                        {app.job.title}
                      </p>
                      <p className="text-sm text-gray-500">{app.job.company}</p>

                      <p
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          app.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : app.status === "INTERVIEW_SUCCESSFUL"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                        }`}
                      >
                        {app.status.replace("_", " ")}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500">
                    You haven’t applied for any jobs yet.
                  </p>
                )}
              </div>

            
              <div className="border-t px-6 py-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl bg-gray-800 px-5 py-2 text-white transition hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}
    </>
  );
}

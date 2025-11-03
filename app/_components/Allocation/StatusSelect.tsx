"use client";

import { UpdateStatus } from "@/app/_libs/actions/uploadProfile";
import { useTransition } from "react";

const statusArray = [
  { value: "PENDING", label: "Pending" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "REJECTED", label: "Rejected" },
  { value: "OFFERED", label: "Offered" },
];

export default function StatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const form = e.currentTarget.form;
    if (form) startTransition(() => form.requestSubmit());
  };

  return (
    <form action={UpdateStatus} className="inline-block">
      <input type="hidden" name="applicationId" value={applicationId} />

      <select
        name="status"
        defaultValue={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        className="rounded-md border border-gray-400 bg-gray-100 px-2 py-1 text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:outline-none"
      >
        {statusArray.map((status) => (
          <option key={status.value} value={status.value}>
            {isPending ? "loading..." : status.label}
          </option>
        ))}
      </select>
    </form>
  );
}

import { auth } from "@/auth";
import ApplicationMotionSummary from "./ApplicationMotionSummary";
import { prisma } from "@/app/_libs/prisma";

export default async function ApplicationSummary() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  // Count applications by status
  const [pendingCount, interviewCount, rejectedCount, successCount] =
    await Promise.all([
      prisma.application.count({
        where: { userId, status: "PENDING" },
      }),
      prisma.application.count({
        where: { userId, status: "INTERVIEW" },
      }),
      prisma.application.count({
        where: { userId, status: "REJECTED" },
      }),
      prisma.application.count({
        where: { userId, status: "OFFERED" },
      }),
    ]);

  // console.log(applications);
  return (
    <div>
      <ApplicationMotionSummary
        pending={pendingCount}
        interview={interviewCount}
        rejected={rejectedCount}
        success={successCount}
      />
    </div>
  );
}

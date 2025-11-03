import { auth } from "@/auth";
import { prisma } from "../_libs/prisma";
import DashboardCard from "./DashboardCard";

export default async function WelcomeDashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  const totalApplications = await prisma.application.count({
    where: { userId },
  });

  const pending = await prisma.application.count({
    where: { userId, status: "PENDING" },
  });

  const hired = await prisma.application.count({
    where: { userId, status: "HIRED" },
  });

  const rejected = await prisma.application.count({
    where: { userId, status: "REJECTED" },
  });
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Welcome back, {session?.user?.name?.split(" ")[0] || "User"} 👋
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <DashboardCard
          title="Total Applications"
          value={totalApplications}
          color="bg-indigo-50"
        />
        <DashboardCard title="Pending" value={pending} color="bg-yellow-50" />
        <DashboardCard title="Hired" value={hired} color="bg-green-50" />
        <DashboardCard title="Rejected" value={rejected} color="bg-red-100" />
      </div>
    </>
  );
}

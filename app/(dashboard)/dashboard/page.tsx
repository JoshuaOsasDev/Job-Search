import AllocationServer from "@/app/_components/Allocation/AllocationServer";
import ApplicationSummary from "@/app/_components/Applications/ApplicationSummary";
import SaveJobs from "@/app/_components/Applications/SaveJobs";
import { DashboardSkeleton } from "@/app/_components/JobDetailsSkeleton";
import ProfileDashboard from "@/app/_components/ProfileDashboard";
import WelcomeDashboard from "@/app/_components/WelcomeDashboard";
import { Suspense } from "react";

export const metadata = {
  title: "Dashbboard",
};
export default async function DashboardPage() {
  return (
    <div>
      <WelcomeDashboard />
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <ProfileDashboard />
          <ApplicationSummary />
          <SaveJobs />
        </Suspense>
      </div>
      <AllocationServer />
    </div>
  );
}

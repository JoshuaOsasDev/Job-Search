// app/jobs/page.tsx (Server Component)
import AnimatedJobForm from "@/app/_components/AnimatedJobForm";
import Jobs from "@/app/_components/Jobs";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Browse Jobs",
};
export default async function JobPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, type, location } = await searchParams;
  return (
    <div className="min-h-screen space-y-8 bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <AnimatedJobForm />

      <div className="grid gap-6">
        <Suspense fallback={<Spinner />}>
          <Jobs q={q} type={type} location={location} />
        </Suspense>
      </div>
    </div>
  );
}

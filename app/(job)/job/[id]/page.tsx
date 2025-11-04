import ErrorIcon from "@/app/_components/ErrorIcon";
import JobDetails from "@/app/_components/JobDetails";
import { prisma } from "@/app/_libs/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      postedBy: true,
    },
  });

  return {
    title: job?.title,
    description: job?.description,
  };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    select: { id: true },
  });
  return jobs.map((job) => ({
    id: job.id,
  }));
}
export default async function JobIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id: jobId } = await params;
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        postedBy: true,
        _count: {
          select: { application: true },
        },
      },
    });

    if (!job) return notFound();

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <JobDetails job={job} />
      </div>
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return <ErrorIcon props="job details" />;
  }
}

"úse client";
import { prisma } from "../_libs/prisma";
import ErrorIcon from "./ErrorIcon";
import JobCard from "./JobCard";

export default async function Jobs({
  q,
  type,
  location,
}: {
  q: string | string[] | undefined;
  type: string | string[] | undefined;
  location: string | string[] | undefined;
}) {
  const query = q as string;
  const types = type as string;
  const loc = location as string;
  // console.log(q, type, location);

  try {
    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          query
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { company: { contains: query, mode: "insensitive" } },
                  { description: { contains: query, mode: "insensitive" } },
                ],
              }
            : {},
          type ? { type: types } : {},
          location ? { location: { contains: loc, mode: "insensitive" } } : {},
        ],
      },
      orderBy: { postedAt: "desc" },
      include: { postedBy: true },
    });
    if (!jobs) throw new Error("404 Error");
    return <JobCard jobs={jobs} />;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return (
      // <div className="py-10 text-center text-red-500">
      //   Failed to load jobs. Please try again later.
      // </div>
      <ErrorIcon props="jobs" />
    );
  }
}

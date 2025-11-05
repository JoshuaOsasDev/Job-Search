import { auth } from "@/auth";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  BriefcaseIcon,
  MapPinIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { prisma } from "@/app/_libs/prisma";
import StatusSelect from "./StatusSelect";

// Helper component for the status badge

// const StatusBadge = ({ status }) => {
//   let colorClass = "";
//   switch (status) {
//     case "PENDING":
//       colorClass = "bg-gray-400/20 text-gray-700 ring-gray-600/20";
//       break;
//     case "REVIEWED":
//       colorClass = "bg-blue-400/20 text-blue-700 ring-blue-600/20";
//       break;
//     case "INTERVIEW":
//       colorClass = "bg-yellow-400/20 text-yellow-700 ring-yellow-600/20";
//       break;
//     case "REJECTED":
//       colorClass = "bg-red-400/20 text-red-700 ring-red-600/20";
//       break;
//     case "OFFERED":
//       colorClass = "bg-green-400/20 text-green-700 ring-green-600/20";
//       break;
//     default:
//       colorClass = "bg-gray-500/10 text-gray-600 ring-gray-500/10";
//       break;
//   }

//   return (
//     <span
//       className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClass}`}
//     >
//       {status.charAt(0) + status.slice(1).toLowerCase()}
//     </span>
//   );
// };

export default async function AllocationServer() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-gray-600">
          Please sign in to view your posted job applications.
        </p>
      </div>
    );
  }

  const applications = await prisma.application.findMany({
    where: {
      job: {
        postedById: user.id,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              resumeUrl: true,
              phone: true,
            },
          },
        },
      },
      job: {
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
        },
      },
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="l mx-auto">
        <h1 className="mb-6 border-b border-gray-200 pb-2 text-3xl font-bold tracking-tight text-gray-800">
          Applications for Your Posted Jobs
        </h1>

        {applications.length === 0 ? (
          <div className="max-w-6x rounded-xl border border-gray-100 bg-white p-10 text-center shadow-lg sm:p-6 lg:p-8">
            <p className="text-lg text-gray-500">
              No applications found for your posted jobs yet.
            </p>
            <p className="mt-2 text-gray-400">Check back later!</p>
          </div>
        ) : (
          <ul role="list" className="space-y-4">
            {applications.map((application) => (
              <li
                key={application.id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    {/* Job Details - Higher priority */}
                    <h2 className="flex items-center text-xl font-semibold text-gray-800">
                      <BriefcaseIcon className="mr-2 h-5 w-5 text-gray-600" />
                      <Link
                        href={`/jobs/${application.job.id}`}
                        className="transition-colors hover:text-gray-900"
                      >
                        {application.job.title} at {application.job.company}
                      </Link>
                    </h2>
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPinIcon className="mr-1 h-4 w-4" />
                      {application.job.location}
                    </p>
                  </div>

                  <StatusSelect
                    currentStatus={application.status}
                    applicationId={application.id}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 md:grid-cols-3">
                  {/* Applicant Details */}
                  <div className="md:col-span-2">
                    <h3 className="mb-2 flex items-center text-lg font-medium text-gray-700">
                      <UserCircleIcon className="mr-2 h-5 w-5 text-gray-600" />
                      Applicant
                    </h3>
                    <dl className="space-y-1 text-sm">
                      <div className="flex">
                        <dt className="w-24 font-medium text-gray-600">
                          Name:
                        </dt>
                        <dd className="text-gray-800">
                          {application.user.name ?? "N/A"}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 font-medium text-gray-600">
                          Email:
                        </dt>
                        <dd className="text-gray-800">
                          <a
                            href={`mailto:${application.user.email}`}
                            className="text-gray-600 transition-colors hover:text-gray-800"
                          >
                            {application.user.email}
                          </a>
                        </dd>
                      </div>
                      {application.user.profile?.phone && (
                        <div className="flex">
                          <dt className="w-24 font-medium text-gray-600">
                            Phone:
                          </dt>
                          <dd className="text-gray-800">
                            {application.user.profile.phone}
                          </dd>
                        </div>
                      )}
                      <div className="flex">
                        <dt className="w-24 font-medium text-gray-600">
                          Applied On:
                        </dt>
                        <dd className="text-gray-800">
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Actions/Resume */}
                  <div className="flex flex-col items-start justify-start space-y-3 pt-2 md:items-end md:pt-0">
                    {application.user.profile?.resumeUrl && (
                      <a
                        href={application.user.profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none md:w-auto"
                      >
                        View Resume
                        <ArrowTopRightOnSquareIcon className="-mr-1 ml-2 h-4 w-4" />
                      </a>
                    )}
                    <Link
                      // href={`/applicants/${application.user.id}`}
                      href="#"
                      className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 md:w-auto"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import ApplicationsPage from "@/app/_components/Applications/ApplicationsPage";
import { prisma } from "@/app/_libs/prisma";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const applications = await prisma.application.findMany({
    where: { userId },
    include: { job: true },
  });
  //   console.log(applications);
  return (
    <div>
      <ApplicationsPage applications={applications} />
    </div>
  );
}

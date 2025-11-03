import { auth } from "@/auth";
import { prisma } from "../_libs/prisma";

import { ProfileCompletionCard } from "./calculateCompletionPercentage ";

export default async function ProfileDashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  const profile = await prisma.profile.findUnique({
    where: { userId: userId },
  });
  // console.log(profile);
  return (
    <>
      <ProfileCompletionCard profile={profile} />
    </>
  );
}

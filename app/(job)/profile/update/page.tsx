import ProfileForm from "@/app/_components/ProfileForm";
import { prisma } from "@/app/_libs/prisma";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  // Make sure user is authenticated
  if (!session?.user) {
    return (
      <div className="p-6 text-center text-gray-600">
        Please sign in to access your profile.
      </div>
    );
  }

  const userId = session.user.id; // ✅ Not session.user.userId
  const name = session.user.name;

  // Handle missing userId safely
  if (!userId) {
    console.error("No userId found in session:", session.user);
    return <div>Error: No user ID found in session.</div>;
  }

  // Fetch profile (if it exists)
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  return (
    <div className="p-6">
      <ProfileForm userId={userId} name={name} profile={profile} />
    </div>
  );
}

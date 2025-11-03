import { UserProfile } from "../_types/types";
import { ProfileCompletionCard } from "./calculateCompletionPercentage ";
import ProfileForm from "./ProfileForm";

export default function ProfileColumnDash({
  userId,
  name,
  profile,
}: {
  profile: UserProfile | null;
  name: string | undefined;
  userId: string | undefined;
}) {
  // Mock user data (8/9 fields present -> 89%)
  //   const [mockProfile, setMockProfile] = useState<UserProfile[]>({
  //     userId: "u-12345",
  //     id: "p-abcde",
  //     bio: "Passionate full-stack developer with 5+ years of experience in React, Node, and TypeScript.",
  //     phone: null, // Missing field 1
  //     location: "San Francisco, CA",
  //     website: "https://mywebsite.com",
  //     resumeUrl: "/resumes/u-12345.pdf",
  //     linkedinUrl: "https://linkedin.com/in/user",
  //     githubUrl: "https://github.com/user",
  //     portfolio: "https://portfolio.com",
  //     skills: "TypeScript, React, Node.js, Tailwind CSS",
  //     createdAt: new Date("2024-01-01T00:00:00Z"),
  //     updatedAt: new Date("2024-10-24T12:00:00Z"),
  //   });

  //   const mockUserName = "Alex Johnson";

  //   // Handler to update the local state after the form mock submission
  //   const handleProfileUpdate = (newProfileData: Partial<UserProfile>) => {
  //     setMockProfile((prev) => ({
  //       ...prev,
  //       ...newProfileData,
  //       //   // Ensure updatedAt is always a Date object for the ProfileCompletionCard logic
  //       //   updatedAt: newProfileData.updatedAt || prev.updatedAt,
  //       //   // Resume URL needs to be special-cased for this mock
  //       //   resumeUrl: newProfileData.resumeUrl || prev.resumeUrl,
  //     }));
  //   };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans sm:p-8">
      <header className="mx-auto mb-10 max-w-4xl rounded-xl border-b border-gray-200 bg-white p-4 shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-700">
          Profile Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your credentials and track completion.
        </p>
      </header>

      <main className="mx-auto max-w-4xl space-y-10">
        {/* TOP SECTION: Profile Completion Card (from image) */}
        <ProfileCompletionCard profile={profile} name={name} userId={userId} />

        {/* BOTTOM SECTION: Profile Update Form */}
        <ProfileForm userId={userId} name={name} profile={profile} />
      </main>
    </div>
  );
}

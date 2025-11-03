"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/app/_libs/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function updateProfileAction(formData: FormData) {
  const userId = formData.get("userId") as string;
  if (!userId) throw new Error("Missing user ID");

  // const name = formData.get("name") as string | undefined;
  const bio = formData.get("bio") as string | undefined;
  const phone = formData.get("phone") as string | undefined;
  const location = formData.get("location") as string | undefined;
  const website = formData.get("website") as string | undefined;
  const linkedinUrl = formData.get("linkedinUrl") as string | undefined;
  const githubUrl = formData.get("githubUrl") as string | undefined;
  const portfolio = formData.get("portfolio") as string | undefined;
  const skills = formData.get("skills") as string | undefined;
  const file = formData.get("resume") as File | null;

  let resumeUrl: string | null = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "resumes" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(buffer);
    });

    resumeUrl = upload.secure_url;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      profile: {
        upsert: {
          create: {
            bio,
            phone,
            location,
            website,
            linkedinUrl,
            githubUrl,
            portfolio,
            skills,
            resumeUrl,
          },
          update: {
            bio,
            phone,
            location,
            website,
            linkedinUrl,
            githubUrl,
            portfolio,
            skills,
            ...(resumeUrl ? { resumeUrl } : {}),
          },
        },
      },
    },
  });

  revalidatePath("/dashboard");
}

export async function UpdateStatus(formData: FormData) {
  const status = formData.get("status") as string;
  const applicationId = formData.get("applicationId") as string;

  console.log(" Updating status:", status, "for application:", applicationId);

  // Optional: update the DB directly
  await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  revalidatePath("/dashboard");
}

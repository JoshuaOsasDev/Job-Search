import { prisma } from "@/app/_libs/prisma";
import { auth } from "@/auth";

import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const jobId = (await params).jobId;
  const session = await auth();
  if (!session || !session.user?.id)
    return NextResponse.redirect(new URL("/auth/signin", request.url));

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) return new NextResponse("No Job Found", { status: 404 });

    const existingJob = await prisma.application.findFirst({
      where: { jobId: jobId, userId: session.user.id },
    });

    if (existingJob) {
      return new NextResponse("You already have applied for this job", {
        status: 404,
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId: jobId,
        userId: session?.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error applying for job:", error);
    return new NextResponse("Something went wrong on the server", {
      status: 500,
    });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const jobId = (await params).jobId;
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ applied: false }, { status: 200 });
  }

  const existingApp = await prisma.application.findFirst({
    where: { jobId, userId: session.user.id },
  });

  return NextResponse.json({ applied: !!existingApp });
}

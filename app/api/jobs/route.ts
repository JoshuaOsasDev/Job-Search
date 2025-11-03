import { prisma } from "@/app/_libs/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  console.log(session?.user, "request");
  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  try {
    const data = await request.json();
    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session?.user.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("soemthing wrong with your POST SERVER", error);
    return NextResponse.json("Internal server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  console.log(request);
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { postedAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("soemthing wrong with your GET SERVER", error);
    return NextResponse.json("Internal server Error", { status: 500 });
  }
}

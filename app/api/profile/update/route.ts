// import { prisma } from "@/app/_libs/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const {
//     userId,
//     resumeUrl,
//     bio,
//     location,
//     phone,
//     website,
//     skills,
//     linkedinUrl,
//   } = await req.json();

//   const profile = await prisma.profile.upsert({
//     where: { userId },
//     update: { resumeUrl, bio, phone, website, linkedinUrl, location, skills },
//     create: {
//       userId,
//       resumeUrl,
//       bio,
//       phone,
//       website,
//       linkedinUrl,
//       location,
//       skills,
//     },
//   });

//   return NextResponse.json(profile);
// }

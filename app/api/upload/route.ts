import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// export async function POST(req: Request) {
//   const data = await req.formData();
//   const file = data.get("file") as File;
//   if (!file)
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const upload = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: "auto", folder: "resumes" },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       },
//     );
//     stream.end(buffer);
//   });

//   return NextResponse.json(upload);
// }

export function POST() {}

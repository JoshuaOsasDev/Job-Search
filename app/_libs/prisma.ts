// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     datasourceUrl: process.env.DATABASE_URL,
//   }).$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

// This file initializes a singleton Prisma client configured for the Edge Runtime (Accelerate).

// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// // Use a separate environment variable for the Edge client
// const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;

// if (!accelerateUrl) {
//   // Throws an error if you forget to set the new variable
//   throw new Error(
//     "Missing PRISMA_ACCELERATE_URL environment variable. Please check your .env file.",
//   );
// }

// // CRITICAL FIX: Delete the DATABASE_URL environment variable before initialization.
// // This prevents the Edge client (which runs in the same environment as `prisma migrate`)
// // from incorrectly picking up the `postgresql://` URL instead of the explicit `prisma://` URL
// // provided in the `datasources` object below.
// delete process.env.DATABASE_URL;

// // 1. Initialize the client using the Edge-compatible import.
// // 2. Explicitly pass the Accelerate URL via `datasources`.
// const edgePrismaClient = new PrismaClient({
//   datasources: {
//     db: {
//       url: accelerateUrl,
//     },
//   },
//   log: ["query", "error", "warn"],
// }).$extends(withAccelerate());

// // Standard Next.js singleton pattern for the Edge client
// let prisma: typeof edgePrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = edgePrismaClient;
// } else {
//   // Ensure we use a global object to prevent creating new instances in hot-reloading
//   if (!(global as any).prisma) {
//     (global as any).prisma = edgePrismaClient;
//   }
//   prisma = (global as any).prisma;
// }

// export default prisma;

// prisma.ts
import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };

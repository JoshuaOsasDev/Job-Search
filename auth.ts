import NextAuth from "next-auth";
import authConfig from "./auth.config";
// import { prisma } from "./app/_libs/prisma";
import { PrismaClient } from "./app/generated/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

"use client";
import { SessionProvider as Providers } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return <Providers session={session}>{children}</Providers>;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import SessionProvider from "./_components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Job Board ",
    default: "Welcome | Job Board",
  },
  description:
    "CraftConnect is a job board that connects skilled craftsmen and artisans in Benin City with people seeking their services. Discover, hire, or showcase your craftsmanship with ease — from electricians to carpenters, plumbers, and more.",
  keywords: [
    "craftsmen jobs",
    "artisan marketplace",
    "handyman services",
    "job board in Benin City",
    "hire local craftsmen",
    "find artisans near me",
    "plumber in Benin City",
    "carpenter in Benin City",
    "electrician services",
    "mechanic jobs",
    "local service connection",
    "skilled trade jobs Nigeria",
    "craftconnect",
    "hire artisans Nigeria",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <div className="min-h-screen bg-gray-50">
            {/* <Navbar /> */}
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

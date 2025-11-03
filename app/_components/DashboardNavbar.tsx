"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  LogOut,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/job", label: "Browse Jobs", icon: <Briefcase size={18} /> },
    {
      href: "/job/post",
      label: "Post a Job",
      icon: <Briefcase size={18} />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    // { href: "/saved-jobs", label: "Saved Jobs", icon: <Bookmark size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 mb-10 border-gray-200 shadow-sm md:mb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- Navbar container --- */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Job logo"
              height={40}
              width={40}
              quality={80}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-semibold text-white">
              Job Board
            </span>
          </Link>
          {/* Desktop Links */}
          <div className="hidden items-center space-x-6 sm:flex">
            {navLinks
              .filter((link) => {
                if (
                  !session?.user &&
                  (link.href === "/job/post" || link.href === "/dashboard")
                )
                  return false;
                return true;
              })
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 rounded-2xl bg-cyan-900 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-cyan-600"
                      : "text-white hover:text-cyan-600"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="flex items-center space-x-5">
            {session?.user?.image && (
              <div className="relative hidden md:block">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  className="h-10 w-10 rounded-full border border-gray-700 object-cover"
                  width={40}
                  height={40}
                />
              </div>
            )}

            {session?.user ? (
              <button
                onClick={() => signOut()}
                className="hidden items-center gap-1 text-sm font-medium text-gray-50 transition hover:text-gray-400 md:flex"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="hidden items-center gap-1 text-sm font-medium text-gray-50 transition hover:text-gray-400 md:flex"
              >
                <LogOut size={18} />
                Sign In
              </Link>
            )}
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-gray-200 hover:text-cyan-600 sm:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-200 bg-white shadow-inner sm:hidden"
          >
            <div className="flex flex-col py-2">
              {navLinks
                .filter((link) => {
                  if (
                    !session?.user &&
                    (link.href === "/job/post" || link.href === "/dashboard")
                  )
                    return false;
                  return true;
                })
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      pathname === link.href
                        ? "bg-cyan-50 text-cyan-600"
                        : "text-gray-700 hover:text-cyan-600"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

              <div className="mt-2 border-t border-gray-100">
                {session?.user ? (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-gray-700 transition hover:text-red-500"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition hover:text-cyan-600"
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

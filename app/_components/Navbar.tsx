"use client";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, PlusSquare, LayoutDashboard, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavLinkProps } from "../_types/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks: NavLinkProps[] = [
  { field: "/job", value: "Browse Jobs", icon: <Briefcase size={18} /> },
  { field: "/job/post", value: "Post a Job", icon: <PlusSquare size={18} /> },
  {
    field: "/dashboard",
    value: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Job logo"
            height={40}
            width={40}
            quality={80}
            className="h-8 w-auto"
          />
          <span className="ml-2 text-lg font-semibold text-gray-900">
            Job Board
          </span>
        </Link>

        {/* Desktop Middle NavLinks */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {navLinks
            .filter((link) => {
              if (
                !session?.user &&
                (link.field === "/job/post" || link.field === "/dashboard")
              )
                return false;
              return true;
            })
            .map((link) => {
              const isActive = pathname === link.field;
              return (
                <motion.div
                  key={link.value}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.field}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.icon}
                    <span>{link.value}</span>
                  </Link>
                </motion.div>
              );
            })}
        </div>

        {/* Right Side — Auth/Profile */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {session?.user ? (
            <>
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-300">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    className="h-full w-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                    <span className="text-sm font-medium">
                      {session?.user?.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-200 hover:text-gray-300"
                onClick={() =>
                  signOut({
                    callbackUrl: "/auth/signin",
                  })
                }
              >
                Sign Out
              </motion.button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-200 hover:text-gray-300"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 bg-white shadow-sm md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks
                .filter((link) => {
                  if (
                    !session?.user &&
                    (link.field === "/job/post" || link.field === "/dashboard")
                  )
                    return false;
                  return true;
                })
                .map((link) => {
                  const isActive = pathname === link.field;
                  return (
                    <motion.div
                      key={link.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href={link.field}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.icon}
                        <span>{link.value}</span>
                      </Link>
                    </motion.div>
                  );
                })}

              {session?.user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    signOut({
                      callbackUrl: "/auth/signin",
                    })
                  }
                  className="mt-2 w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-200 hover:text-gray-300"
                >
                  Sign Out
                </motion.button>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block w-full rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-medium text-gray-200 hover:text-gray-300"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

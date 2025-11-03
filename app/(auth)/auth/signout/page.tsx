"use client";
import { logout } from "@/app/_libs/auth";

export default function signOut() {
  return <button onClick={logout}>Sign Out</button>;
}

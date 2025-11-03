"use server";
import { signIn, signOut } from "@/auth";

export const login = async function (provider: "github" | "google") {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async function () {
  await signOut({ redirectTo: "/auth/signin" });
};

// export async function signInAction(provider: "github") {
//   await signIn(provider, { redirectTo: "/" });
// }

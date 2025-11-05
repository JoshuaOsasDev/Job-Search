"use server";
import { signIn, signOut } from "@/auth";

export const login = async function (provider: "github" | "google") {
  await signIn(provider, {
    redirectTo: "https://job-search-five-nu.vercel.app/",
    //redirectTo: "http://localhost:3000",
  });
};

export const logout = async function () {
  await signOut({ redirectTo: "https://job-search-five-nu.vercel.app/" });
};

// export async function signInAction(provider: "github") {
//   await signIn(provider, { redirectTo: "/" });
// }

"use server";

import { deleteCookie } from "@/src/utils/cookie";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("better-auth.session_token");
    
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

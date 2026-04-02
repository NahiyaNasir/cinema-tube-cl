/* eslint-disable @typescript-eslint/no-explicit-any */

import { ILoginResponse } from "@/src/types/auth.types";

import { IRegisterProps, registerZodSchema } from "@/src/zod/auth.validation";
import { redirect } from "next/navigation";
import { httpClient } from "@/src/lib/axios/httpClient";
import { setTokenInCookies } from "@/src/utils/token";

export const registerAction = async (
  payload: IRegisterProps,
) => {
  const parsedPayload = registerZodSchema.safeParse(payload);
  
  if (!parsedPayload.success) {
    const firstError =
    parsedPayload.error.issues[0].message || "invalid credentials";
    return {
      success: false,
      message: firstError,
    };
  }
  
  try {
    
    const res = await httpClient.post<ILoginResponse>(
        "/auth/register",
        parsedPayload.data,
      );
      console.log("Register 000 Payload:", res);
      
    const { accessToken, refreshToken, token, user } = res.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    redirect(`/verify-email?email=${user.email}`);
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return {
      success: false,
      message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
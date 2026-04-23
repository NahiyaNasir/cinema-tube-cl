/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { httpClient } from "@/src/lib/axios/httpClient";

import { ApiErrorResponse } from "@/src/types/api.types";
import { ILoginResponse } from "@/src/types/auth.types";
import { getDefaultRoute, isValidRedirectForRole, Role } from "@/src/utils/auth-client";
import { setTokenInCookie } from "@/src/utils/token";

import { ILoginProps, loginZodSchema } from "@/src/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload:ILoginProps,
    redirectPath?: string,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

 try {
    const res = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    // console.log("Login action response---------------------: ", res);

    const { accessToken, refreshToken, token, user } = res?.data;

    const { role, emailVerified, needPasswordChange, email } = user;

    await setTokenInCookie("accessToken", accessToken);
    await setTokenInCookie("refreshToken", refreshToken);
    await setTokenInCookie(
      "better-auth.session_token",
      token,
      24 * 60 * 60 * 1000,
    ); // 1 day

    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}&redirectPath=${redirectPath}`);
    } else {
      const targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as Role)
          ? redirectPath
          : getDefaultRoute(role as Role);

      redirect(targetPath);
    }
  } catch (error: any) {
    // console.log(`Login action error----------:`, error.message);
    if (
      (error && error.message === "Email not verified") ||
      error.message === "User not verified. Again send verification email."
    ) {
      return redirect(`/verify-email?email=${parsedPayload.data.email}`);
    }
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
      message: `Login failed: ${error.message}`,
    };
  }
};

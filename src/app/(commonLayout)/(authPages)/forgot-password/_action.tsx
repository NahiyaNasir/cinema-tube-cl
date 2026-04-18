/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { forgotPasswordZodSchema, IForgotPasswordProps } from "@/src/zod/auth.validation";
import { ApiError } from "next/dist/server/api-utils";




export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const forgotPasswordAction = async (
  payload: IForgotPasswordProps,
): Promise<IForgotPasswordResponse | ApiError> => {
  const parsedPayload = forgotPasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid field values.";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const res = await httpClient.post<IForgotPasswordResponse>(
      "/auth/forgot-password",
      parsedPayload.data,
    );

    return {
      success: true,
      message: res.data.message || "Password reset link sent successfully.",
    };
  } catch (error: unknown) {
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
      message: (error as any)?.response?.data?.message || (error as any)?.message || "Failed to send reset link. Please try again.",
    };
  }
};
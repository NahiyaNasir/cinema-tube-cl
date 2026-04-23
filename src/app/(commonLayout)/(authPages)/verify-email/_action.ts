/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { httpClient } from "@/src/lib/axios/httpClient";
import { setTokenInCookie } from "@/src/utils/token";

import { ISendVerifyOtpProps, IVerifyEmailProps, verifyEmailZodSchema } from "@/src/zod/auth.validation";


export const verifyEmailAction = async (payload: IVerifyEmailProps) => {
  const parsedPayload = verifyEmailZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid field values.";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const res = await httpClient.post("/auth/verify-email", payload);
    console.log("verify Email Action", res.data);

    const { token } = res.data as any;
    await setTokenInCookie("better-auth.session_token", token);

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to verify email.",
    };
  }
};

export const resendOtpAction = async (payload: ISendVerifyOtpProps) => {
 

  try {
    const res = await httpClient.post("/auth/send-verify-otp", payload);
    // console.log("resend Otp Action", res.data);
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to resend OTP.",
    };
  }
};
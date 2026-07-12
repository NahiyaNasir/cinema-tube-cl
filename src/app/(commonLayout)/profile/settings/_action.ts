/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { revalidatePath } from "next/cache";
import { httpClient } from "@/src/lib/axios/httpClient";
import { IPasswordProps, passwordSchema } from "@/src/zod/auth.validation";

export interface IActionResponse {
  success: boolean;
  message: string;
}

export const updateProfileAction = async (payload: {
  name: string;
  image?: string;
}): Promise<IActionResponse> => {
  try {
    const res = await httpClient.patch<any>("/profile", payload);
    revalidatePath("/profile/settings");
    revalidatePath("/profile");
    return {
      success: true,
      message: res.data.message || "Profile updated successfully.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        "Failed to update profile.",
    };
  }
};

export const changePasswordAction = async (
  payload: IPasswordProps,
): Promise<IActionResponse> => {
  const parsed = passwordSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input.",
    };
  }

  try {
    await httpClient.post("/auth/change-password", {
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    });
    return {
      success: true,
      message: "Password changed successfully.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        "Failed to change password. Check your current password.",
    };
  }
};

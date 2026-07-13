

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { contactZodSchema, IContactProps } from "@/src/zod/contact.validation";

export interface IContactResponse {
  success: boolean;
  message: string;
}

export const submitContactMessage = async (
  payload: IContactProps,
): Promise<IContactResponse> => {
  const parsedPayload = contactZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid field values.";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const res = await httpClient.post<IContactResponse>(
      "/contact",
      parsedPayload.data,
    );

    return {
      success: true,
      message: res.message || "Your message has been sent successfully.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        "Failed to send your message. Please try again.",
    };
  }
};
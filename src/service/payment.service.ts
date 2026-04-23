/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'


import { revalidateTag } from "next/cache";
import { httpClient } from "../lib/axios/httpClient";
import { Payment } from "../types/payment.types";

// ─── Checkout ────────────────────────────────────────────────
export const createMediaCheckoutSession = async (payload: {
  mediaId: string;
  type: "RENTAL" | "BUY";
}) => {
  const res = await httpClient.post("/payment/media-checkout", payload);

  revalidateTag("purchases", "");
  revalidateTag("payments", "");
  
  return res;
};

// ─── Purchases ────────────────────────────────────────────────
export const getMyMediaPurchases = async () => {
  try {
    const res = await httpClient.get("/payment/my-media-purchases");
    console.log(res,"payment purchases");
    return res
  } catch (err: any) {
    console.error("Error fetching purchases:", err);
    throw err; 
  }
};

// ─── Payment History ──────────────────────────────────────────
export const getMyPayments = async () => {
  try {
    const res = await httpClient.get<Payment[]>("/payment/my-payments");
    console.log(res,"payment history");
    return res;
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};


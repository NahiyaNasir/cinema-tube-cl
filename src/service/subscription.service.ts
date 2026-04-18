/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { revalidateTag } from "next/cache";
import { httpClient } from "../lib/axios/httpClient";
import { SubscriptionPlan } from "../types/enum.types";

export const getSubscriptionPlans = async () => {
  try {
    const res = await httpClient.get<SubscriptionPlan[]>("/subscriptions/plans");
    return res;
  } catch (err) {
    console.error("Backend unreachable:", err);
    return {
      data: [],
      success: false,
      message: "Server is currently offline.",
    };
  }
};


export const getSubscriptionStatus = async () => {
  const res = await httpClient.get("/subscriptions/status");
  return res;
};

export const getPaymentHistory = async () => {
  const res = await httpClient.get("/subscriptions/history");
  return res;
};


export const createCheckoutSession = async (payload: any) => {
  const res = await httpClient.post("/subscriptions/checkout", payload);
  
 
  revalidateTag("subscriptions", "");
  return res;
};

export const cancelSubscription = async () => {
  const res = await httpClient.delete("/subscriptions/cancel");
  
  revalidateTag("subscriptions", "");
  revalidateTag("payments", "");
  
  return res;
};
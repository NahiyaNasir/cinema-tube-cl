/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";



import { revalidateTag } from "next/cache";
import { httpClient } from "../lib/axios/httpClient";
import { Media, MediaPurchase } from "../types/media.types";


// ─── Media Fetching ───────────────────────────────────────────
export const getAllMedia = async (params?: any) => {
  const res = await httpClient.get<Media[]>("/media", { params });
  return res;
};

export const getMediaBySlug = async (slug: string) => {
  const res = await httpClient.get<Media>(`/media/slug/${slug}`);
  return res;
};

export const getMediaById = async (id: string) => {
  const res = await httpClient.get<Media>(`/media/${id}`);
  console.log(res);
  return res;
};

// ─── Purchases ────────────────────────────────────────────────
export const purchaseMedia = async (payload: any) => {
  const res = await httpClient.post("/payment/purchase-media", payload);
  // Revalidate media and purchases since ownership state has changed
  revalidateTag("media", "");
  revalidateTag("purchases", "");
  return res;
};

export const getMyMediaPurchases = async () => {
  const res = await httpClient.get<MediaPurchase[]>("/payment/my-media-purchases");
  console.log(res.data, "my media purchases");
  return res;
};

// ─── Reviews ──────────────────────────────────────────────────
export const getMediaReviews = async (mediaId: string) => {
  const res = await httpClient.get(`/reviews/media/${mediaId}`);
  return res;
};

export const createReview = async (payload: any) => {
  const res = await httpClient.post("/reviews", payload);
  revalidateTag("reviews", "");
  return res;
};

export const updateReview = async (id: string, payload: any) => {
  const res = await httpClient.patch(`/reviews/${id}`, payload);
  revalidateTag("reviews", "");
  return res;
};

export const deleteReview = async (id: string) => {
  const res = await httpClient.delete(`/reviews/${id}`);
  revalidateTag("reviews", "");
  return res;
};
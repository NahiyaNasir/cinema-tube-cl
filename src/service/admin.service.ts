/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { httpClient } from "../lib/axios/httpClient";
import { Genre } from "../types/media.types";
import { ApiResponse } from "../types/api.types";


// ─── Bulk Operations ──────────────────────────────────────────


export const adminCreateGenreBulk = async (payload: any) => {
  const res = await httpClient.post("/genres/bulk", payload);
  revalidateTag("genres", "");
  return res;
};

export const adminCreatePlatformBulk = async (payload: any) => {
  const res = await httpClient.post("/platforms/bulk", payload);
  revalidateTag("platforms", "");
  return res;
};

// ─── Media CRUD ────────────────────────────────────────────────
export const adminGetAllMedia = async (params?: any) => {
   const res = await httpClient.get<any[]>("/media", { params });
   return res.data;

};

export const adminGetMediaById = async (id: string) => {
  return await httpClient.get(`/media/${id}`);
};

export const adminCreateMedia = async (payload: any) => {
  try {
     const res = await httpClient.post("/media", payload);
  revalidateTag("media", "");
  return res;
  } catch (error:any) {
     console.error("Status:", error.response?.status);
    console.error("Error body:", error.response?.data);
    throw error;
  }
 
 

};

export const adminUpdateMedia = async (id: string, payload: any) => {
  const res = await httpClient.patch(`/media/${id}`, payload);
  revalidateTag("media", "");
  return res;
};

export const adminDeleteMedia = async (id: string) => {
  const res = await httpClient.delete(`/media/${id}`);
  revalidateTag("media", "");
  return res;
};

export const adminToggleMediaPublish = async (
  id: string,
  isPublished: boolean,
) => {
  const res = await httpClient.patch(`/media/${id}`, { isPublished });
  revalidateTag("media", "");
  return res;
};

// ─── Review Moderation ─────────────────────────────────────────
export const adminGetAllReviews = async (params?: any) => {
  return await httpClient.get<any[]>("/reviews/admin", { params });
};

export const adminUpdateReviewStatus = async (
  id: string,
  status: "APPROVED" | "UNPUBLISHED" | "PENDING",
) => {
  const res = await httpClient.patch(`/reviews/admin/status/${id}`, {
    status,
  });
  revalidateTag("reviews", "");
  return res;
};

export const adminDeleteReview = async (id: string) => {

  const res = await httpClient.delete(`/reviews/admin/delete/${id}`);
  revalidateTag("reviews", "");
  return res;
};

// ─── User Management ──────────────────────────────────────────
export const adminGetAllUsers = async (params?: any) => {
  return await httpClient.get<any[]>("/users", { params });
};

export const adminUpdateUserStatus = async (
  id: string,
  status: "ACTIVE" | "BLOCKED",
) => {
  const res = await httpClient.patch(`/users/${id}/status`, { status });
  revalidateTag("users", "");
  return res;
};

// ─── Analytics / Dashboard ────────────────────────────────────
export const adminGetDashboardStats = async () => {
  return await httpClient.get("/admin/analytics/stats");
};

export const adminGetSalesAnalytics = async (params?: any) => {
  return await httpClient.get("/admin/analytics/sales", { params });
};

export const adminGetReviewAnalytics = async () => {
  return await httpClient.get("/admin/analytics/reviews");
};

// ─── Genre Management ─────────────────────────────────────────
export const getAllGenres = async (params?: any) => {
  const res=await httpClient.get<ApiResponse<Genre[]>>("/genres", { params });
  return res.data;
};


export const adminCreateGenre = async (payload: any) => {
  try {
    const res = await httpClient.post("/genres", payload);
    console.log(res.data);
    revalidateTag("genres", "");
    return res;
  } catch (error: any) {
    console.error("Status:", error.response?.status);
    console.error("Error body:", error.response?.data); // ← this will tell you exactly why
    throw error;
  }
};
export const adminUpdateGenre = async (id: string, payload: any) => {
  const res = await httpClient.patch(`/genres/${id}`, payload);
  revalidateTag("genres", "");
  return res;
};

export const adminDeleteGenre = async (id: string) => {
  const res = await httpClient.delete(`/genres/${id}`);
  revalidateTag("genres", "");
  return res;
};



export const adminDeletePlatform = async (id: string) => {
  const res = await httpClient.delete(`/platforms/${id}`);
  revalidateTag("platforms", "");
  return res;
};

export const adminGetAllPayments = async (params: Record<string, any>) => {
  const res = await httpClient.get("/payment/all-payments", { params });
  return res.data;
};

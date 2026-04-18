"use server";


import { revalidateTag } from "next/cache";
import { httpClient } from "../lib/axios/httpClient";

// ─── Watchlist ────────────────────────────────────────────────
export const getMyWatchlist = async () => {
  const res = await httpClient.get("/watchlist");
  return res;
};

export const addToWatchlist = async (mediaId: string) => {
  const res = await httpClient.post(`/watchlist/${mediaId}`, {});

  revalidateTag("watchlist", ""); 
  return res;
};

export const removeFromWatchlist = async (mediaId: string) => {
  const res = await httpClient.delete(`/watchlist/${mediaId}`);
  revalidateTag("watchlist", "");
  return res;
};

// ─── Bookmarks ────────────────────────────────────────────────
export const getBookmarked = async () => {
  const res = await httpClient.get("/bookmarks");
  return res;
};

export const addToBookmark = async (reviewId: string) => {
  const res = await httpClient.post(`/bookmarks/${reviewId}`, {});
  revalidateTag("bookmarks", "");
  return res;
};

export const removeFromBookmark = async (reviewId: string) => {
  const res = await httpClient.delete(`/bookmarks/${reviewId}`);
  revalidateTag("bookmarks", "");
  return res;
};

// ─── Favorites ────────────────────────────────────────────────
export const getMyFavorites = async () => {
  const res = await httpClient.get("/favorites");
  return res;
};

export const addToFavorite = async (mediaId: string) => {
  const res = await httpClient.post(`/favorites/${mediaId}`, {});
  revalidateTag("favorites", "");
  return res;
};

export const removeFromFavorite = async (mediaId: string) => {
  const res = await httpClient.delete(`/favorites/${mediaId}`);
  revalidateTag("favorites", "");
  return res;
};
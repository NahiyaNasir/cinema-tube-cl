import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Admin-entered image URLs (poster/backdrop/gallery) are plain text inputs
 * with no format enforcement. next/image requires either a relative path
 * starting with "/" or a fully-qualified absolute URL with a protocol —
 * it throws a hard runtime error otherwise. This normalizes common mistakes
 * (missing "https://") instead of crashing the page.
 */
export function normalizeImageUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

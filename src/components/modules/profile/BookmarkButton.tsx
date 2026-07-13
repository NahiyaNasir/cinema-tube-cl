/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IProfileResponse } from "@/src/types/profile.types";
import { addToBookmark, removeFromBookmark } from "@/src/service/collection.service";

interface BookmarkButtonProps {
  mediaId: string;
  initialIsBookmarked?: boolean;
  user?: IProfileResponse | null;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  className?: string;
}

export default function BookmarkButton({
  mediaId,
  initialIsBookmarked,
  user,
  size = "icon-lg",
  className,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(!!initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to bookmark this title");
      return;
    }

    try {
      setIsLoading(true);
      if (isBookmarked) {
        await removeFromBookmark(mediaId);
        setIsBookmarked(false);
        toast.success("Removed from bookmarks");
      } else {
        await addToBookmark(mediaId);
        setIsBookmarked(true);
        toast.success("Bookmarked");
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(className)}
      onClick={handleToggleBookmark}
      disabled={isLoading}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      aria-pressed={isBookmarked}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : isBookmarked ? (
        <BookmarkCheck className="size-5 text-primary fill-primary" />
      ) : (
        <Bookmark className="size-5" />
      )}
    </Button>
  );
}
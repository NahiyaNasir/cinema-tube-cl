/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  BookmarkPlus,
  BookmarkCheck,
  Trash2,
  Loader2,

} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IProfileResponse } from "@/src/types/profile.types";
import { addToWatchlist, removeFromWatchlist } from "@/src/service/collection.service";


interface WatchlistButtonProps {
  mediaId: string;
  initialIsWatchlisted?: boolean;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
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
  showText?: boolean;
  user?: IProfileResponse;
  removeOnly?: boolean;
}

export default function WatchlistButton({
  mediaId,
  initialIsWatchlisted,
  variant = "secondary",
  size = "lg",
  className,
  showText = true,
  user,
  removeOnly = false,
}: WatchlistButtonProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(initialIsWatchlisted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const watchlist = user?.watchlists?.find((w) => w.mediaId === mediaId);

  console.log(watchlist)

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to manage your watch list");
      return;
    }

    try {
      setIsLoading(true);
      if (isWatchlisted || removeOnly) {
        await removeFromWatchlist(watchlist?.mediaId);
        setIsWatchlisted(false);
        toast.success("Removed from watch list");
      } else {
        await addToWatchlist(mediaId);
        setIsWatchlisted(true);
        toast.success("Added to watch list");
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update watch list");
    } finally {
      setIsLoading(false);
    }
  };

  if (removeOnly) {
    return (
      <Button
        variant="destructive"
        size="lg"
        className={cn("w-fit gap-2 px-5", className)}
        onClick={handleToggleWatchlist}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
        Remove
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-3 px-5", className)}
      onClick={handleToggleWatchlist}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2
          className={cn(
            "animate-spin",
            size.includes("icon") ? "size-5" : "w-5 h-5",
          )}
        />
      ) : isWatchlisted ? (
        <BookmarkCheck
          className={cn(
            "text-primary fill-primary",
            size.includes("icon") ? "size-5" : "w-5 h-5",
          )}
        />
      ) : (
        <BookmarkPlus
          className={size.includes("icon") ? "size-5" : "w-5 h-5"}
        />
      )}

      {showText && !size.includes("icon") && (
        <span>{isWatchlisted ? "In Watchlist" : "Add to Watchlist"}</span>
      )}
    </Button>
  );
}
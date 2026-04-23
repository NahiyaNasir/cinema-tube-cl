/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Loader2, Tag, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview, updateReview } from "@/src/service/media.service";
import { Review } from "@/src/types/media.types";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ReviewFormProps {
  mediaId: string;
  user: any;
  isEdit?: boolean;
  initialReview:Review
}

export default function ReviewForm({ mediaId, user, isEdit,initialReview }: ReviewFormProps) {
  const queryClient = useQueryClient();
   const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);
  const isEditMode = !!initialReview;
  const { mutateAsync, isPending } = useMutation({
     mutationFn: (payload: any) =>
      isEditMode
        ? updateReview(initialReview.id, payload)
        : createReview(payload),
    
    onSuccess: () => {
      toast.success(isEdit ? "Review updated!" : "Review posted!");
      queryClient.invalidateQueries({ queryKey: ["media-reviews", mediaId] });
      if (!isEdit) form.reset();
    },
    onError: (err: any) => toast.error(err.message),
  });

  // 2. TanStack Form: Manual Validation Logic
  const form = useForm({
    defaultValues: {
      content: initialReview?.content || "",
      rating: initialReview?.rating || 0,
      hasSpoiler: initialReview?.hasSpoiler || false,
      tags: initialReview?.tags?.join(", ") || "", // Join tags array back to string
    },
    onSubmit: async ({ value }) => {
         try {
        const payload = {
          mediaId,
          content: value.content,
          rating: value.rating,
          hasSpoiler: value.hasSpoiler,
          tags: value.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          userId: user?.id,
          
        };

        await mutateAsync(payload);
        if (!isEditMode) form.reset();
        router.refresh();
      } catch (error: any) {
        console.log(error);
      }
    },
  });


  return (
<div className="rounded-3xl border border-white/5 bg-[#111]/50 p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-white">
          {isEditMode ? "Update Review" : "Write a Review"}
        </h3>
        {!user && (
          
          <span className="flex items-center gap-1 text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20">
            <h3 className="text-muted-foreground mb-1">To Write a Review</h3>
            <ShieldAlert className="size-3" /> Login Required
                <Link href="/login">
              <Button size={"lg"} variant={"secondary"}>
                Login
              </Button>
            </Link>

          </span>

        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Rating Section */}
        <form.Field name="rating">
          {(field) => (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-400">Your overall rating</label>
                {field.state.value > 0 && (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {field.state.value}/5 Stars
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => field.handleChange(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-all hover:scale-110 active:scale-95 outline-none"
                  >
                    <Star
                      className={`size-8 transition-colors ${
                        star <= (hoveredStar || field.state.value)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        {/* Content Section */}
        <form.Field name="content">
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Your detailed review</label>
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="What did you like or dislike? How was the cinematography?"
                className="min-h-30 bg-white/5 border-white/10 focus:border-primary/50 text-gray-200 rounded-2xl resize-none"
              />
            </div>
          )}
        </form.Field>

        {/* Tags Section */}
        <form.Field name="tags">
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                <Tag className="size-3.5" /> Tags (comma separated)
              </label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="masterpiece, must watch, emotional"
                className="bg-white/5 border-white/10 h-10 rounded-xl text-gray-300"
              />
            </div>
          )}
        </form.Field>

        {/* Spoiler Toggle */}
        <form.Field name="hasSpoiler">
          {(field) => (
            <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <Checkbox
                id="spoiler"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(!!checked)}
                className="border-gray-500"
              />
              <label
                htmlFor="spoiler"
                className="text-xs font-medium text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                This review contains spoilers
              </label>
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" /> Submitting...
            </div>
          ) : (
            isEditMode ? "Update Review" : "Post Review"
          )}
        </Button>
      </form>
    </div>
  );
}


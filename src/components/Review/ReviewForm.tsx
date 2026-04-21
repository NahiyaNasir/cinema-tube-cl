/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  mediaId: string;
  user: any;
  isEdit?: boolean;
  initialData?: { rating: number; comment: string; _id?: string };
}

export default function ReviewForm({ mediaId, user, isEdit, initialData }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [hoveredStar, setHoveredStar] = useState(0);

  // 1. TanStack Mutation: API call handle korar jonno
  const mutation = useMutation({
    mutationFn: async (values: { rating: number; comment: string }) => {
      const response = await fetch(`/api/media/${mediaId}/reviews`, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, reviewId: initialData?._id }),
      });
      if (!response.ok) throw new Error("Submission failed");
      return response.json();
    },
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
      rating: initialData?.rating || 0,
      comment: initialData?.comment || "",
    },
    onSubmit: async ({ value }) => {
      if (!user) return toast.error("Please login to review");
      mutation.mutate(value);
    },
  });

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-bold text-white">
        {isEdit ? "Update Review" : "Leave a Review"}
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* --- Rating Field --- */}
        <form.Field
          name="rating"
          validators={{
            onChange: ({ value }) => 
              value < 1 ? "Please select at least 1 star" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Rating</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => field.handleChange(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform active:scale-90 outline-none"
                  >
                    <Star
                      className={`size-7 ${
                        star <= (hoveredStar || field.state.value)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {field.state.meta.errors && (
                <p className="text-[10px] text-red-500 font-medium">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* --- Comment Field --- */}
        <form.Field
          name="comment"
          validators={{
            onChange: ({ value }) => 
              value.length < 10 ? "Review must be at least 10 characters" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Your thoughts</label>
              <Textarea
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="What did you think about the story or visuals?"
                className="min-h-25 bg-black/20 border-white/10 focus:border-primary/50 transition-all text-white"
              />
              {field.state.meta.errors && (
                <p className="text-[10px] text-red-500 font-medium">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* --- Submit Button --- */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit]) => (
            <Button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className="w-full font-bold md:w-auto md:px-10 h-11"
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : isEdit ? (
                "Update Review"
              ) : (
                "Post Review"
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
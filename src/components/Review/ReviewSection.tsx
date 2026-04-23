/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";
import { Review } from "@/src/types/media.types";
import { IProfileResponse } from "@/src/types/profile.types";

interface ReviewSectionProps {
  mediaId: string;
  initialReviews: Review[];
  user: IProfileResponse | null;
  onEditReview?: (review: Review) => void;
}

export default function ReviewSection({
  mediaId,
  initialReviews,
  user,
  onEditReview,
}: ReviewSectionProps) {
  const [reviews] = useState<Review[]>(initialReviews);

  if (reviews.length === 0) {
    return (
      <div className="space-y-8">
        <div className="py-12 flex items-center justify-center bg-neutral-900/20 rounded-3xl border border-white/5">
          <div className="text-center">
            <MessageSquare className="size-10 text-gray-700 mx-auto mb-4" />
            <h1 className="text-lg font-semibold">No Reviews Yet</h1>
            <p className="text-neutral-500">Be the first to share your thoughts!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg">See All Reviews</h2>
          <p className="text-sm text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-5">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isOwn={review.userId === user?.id}
            currentUser={user}
            mediaId={mediaId}
            onEdit={onEditReview}
          />
        ))}
      </div>

    </div>
  );
}

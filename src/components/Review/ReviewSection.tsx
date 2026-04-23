
"use client";


import { MessageSquare } from "lucide-react";
import { Review } from "@/src/types/media.types";
import { IProfileResponse } from "@/src/types/profile.types";
import ReviewCard from "./ReviewCard";



export default function ReviewSection({
 initialReviews,
  user,
}: {
  initialReviews?: Review[];
  user?: IProfileResponse | null;
}) {


  if (initialReviews?.length === 0) {
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
            {initialReviews?.length} {initialReviews?.length === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-5">
        {initialReviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isOwn={review.userId === user?.id}
            currentUser={user}
       
        
          />
        ))}
      </div>

    </div>
  );
}

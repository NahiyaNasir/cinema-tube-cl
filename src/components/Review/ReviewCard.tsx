
"use client";

import { Star,  AlertCircle } from "lucide-react";

import { Review } from "@/src/types/media.types";

import { formatDistanceToNow } from "date-fns";


import EditReviewModal from "./EditReview";
import DeleteReviewDialog from "./deleteReview";
import { IProfileResponse } from "@/src/types/profile.types";


export default function ReviewCard({
    review,
  isOwn,
  currentUser,
}: {
  review: Review;
  isOwn: boolean;
  currentUser?: IProfileResponse|null;
})  {

  const isSpoiler = review.hasSpoiler;


  return (
    <div className="rounded-2xl border border-white/5 bg-[#111]/30 hover:bg-[#111]/50 p-5 backdrop-blur-sm transition-all group">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Author & Time */}
          <div className="flex items-center gap-3 mb-3">
           
            <div>
              <p className="text-sm font-semibold text-white">{review.user?.name}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-4 ${
                  star <= review.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions - Only show for owner */}
        {isOwn && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           
          <EditReviewModal  
            initialReview={review}
            user={currentUser}></EditReviewModal>
            <DeleteReviewDialog review={review}></DeleteReviewDialog>
          </div>
        )}
      </div>

      {/* Spoiler Badge */}
      {isSpoiler && (
        <div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/20 w-fit">
          <AlertCircle className="size-3.5" />
          Contains Spoilers
        </div>
      )}

      {/* Review Content */}
      <p
        className={`text-sm text-gray-300 leading-relaxed mb-4 ${
          isSpoiler ? "blur-sm hover:blur-none transition-all" : ""
        }`}
      >
        {review.content}
      </p>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Helpful Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs text-gray-500">
        <button className="hover:text-primary transition-colors">
          👍 Helpful ()
        </button>
        <span>•</span>
        <button className="hover:text-red-500 transition-colors">👎 Not helpful</button>
      </div>
    </div>
  );
}

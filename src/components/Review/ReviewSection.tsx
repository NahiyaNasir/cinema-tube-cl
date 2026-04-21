"use client";

import { useQuery } from "@tanstack/react-query";
import ReviewForm from "./ReviewForm"; 
import { Star, User } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { IProfileResponse } from "@/src/types/profile.types";
import { Review } from "@/src/types/media.types";



interface ReviewSectionProps {
  mediaId: string;
  initialReviews: Review[];
  user: IProfileResponse;
}

export default function ReviewSection({ mediaId, initialReviews, user }: ReviewSectionProps) {
  // 1. TanStack Query for Reviews List
  const { data: reviews } = useQuery({
    queryKey: ["media-reviews", mediaId],
    queryFn: async () => {
      const res = await fetch(`/media/${mediaId}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    initialData: initialReviews, 
  });

  return (
    <section className="mt-12 space-y-10">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-2xl font-bold text-white">User Reviews</h2>
        <p className="text-gray-400 text-sm mt-1">
          {reviews?.length || 0} people have shared their thoughts
        </p>
      </div>
{/* if user logged in */}
      <div className="max-w-2xl">
        <ReviewForm mediaId={mediaId} user={user} isEdit={false} />
      </div>

      {/* 3. Reviews List */}
      <div className="space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review: Review) => (
            <div 
              key={review.id} 
              className="group relative bg-white/5 border border-white/5 p-5 rounded-2xl transition-all hover:bg-white/[0.07]"
            >
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  {review.user?.image ? (
                    <Image src={review.user.image} alt="" className="rounded-full" />
                  ) : (
                    <User className="size-5 text-primary" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-200">{review.user?.name || "Anonymous"}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                      {format(new Date(review.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${
                          i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  {/* <p className="text-sm text-gray-400 leading-relaxed italic">
                    &quot;{review.comments}&quot;
                  </p> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500">No reviews yet. Be the first to share yours!</p>
          </div>
        )}
      </div>
    </section>
  );
}
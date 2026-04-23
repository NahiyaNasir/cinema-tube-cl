import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select at least 1 star").max(5),
  content: z.string().min(10, "Review must be at least 10 characters"),
  hasSpoiler: z.boolean().default(false),
  tags: z.string().optional(),
});

export type IReviewFormInput = z.infer<typeof reviewSchema>;
import ReviewsClient from "@/src/components/modules/Admin/review/review.client";

export const dynamic = "force-dynamic";

export type TabStatus = "PENDING" | "APPROVED" | "UNPUBLISHED";

export const metadata = {
  title: "Review Moderation | CT Admin",
  description: "Moderating user reviews.",
};

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  const status = (await searchParams).status;

  return <ReviewsClient initialStatus={status as TabStatus} />;
}
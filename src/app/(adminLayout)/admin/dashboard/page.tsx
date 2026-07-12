/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'



import {
  Film,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Eye,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminGetAllMedia, adminGetAllReviews, adminGetAllUsers, adminGetDashboardStats, adminGetSalesAnalytics, adminGetReviewAnalytics } from "@/src/service/admin.service";
import { StatsCard } from "@/src/components/modules/Admin/StatsCard";
import { AdminReviewActionButtons } from "@/src/components/modules/Admin/AdminReviewActionButtons";
import RevenueLineChart from "@/src/components/modules/Admin/charts/LineChart";
import RevenueBreakdownPieChart from "@/src/components/modules/Admin/charts/PieChart";
import ReviewRatingBarChart from "@/src/components/modules/Admin/charts/BarChart";


export const metadata = {
  title: "Admin Dashboard | Cinema Tube",
  description: "Overview of media, reviews, users and analytics.",
};

async function getDashboardData() {
  const results = await Promise.allSettled([
    adminGetAllMedia({ limit: 5, sortBy: "reviewCount", sortOrder: "desc" }),
    adminGetAllReviews({ status: "UNPUBLISHED", limit: 8 }),
    adminGetAllUsers({ limit: 1 }),
    adminGetDashboardStats(),
    adminGetSalesAnalytics(),
    adminGetReviewAnalytics(),
  ]);
// console.log(results);
  const mediaRes =
    results[0].status === "fulfilled" ? (results[0].value as any) : null;
  const reviewsRes =
    results[1].status === "fulfilled" ? (results[1].value as any) : null;
  const usersRes =
    results[2].status === "fulfilled" ? (results[2].value as any) : null;
  const statsRes =
    results[3].status === "fulfilled" ? (results[3].value as any) : null;
  const salesRes =
    results[4].status === "fulfilled" ? (results[4].value as any) : null;
  const reviewAnalyticsRes =
    results[5].status === "fulfilled" ? (results[5].value as any) : null;

  // log this if still broken:
  // console.log("reviewsRes", JSON.stringify(reviewsRes?.data, null, 2));

  const salesData = salesRes?.data?.data ?? salesRes?.data ?? null;

  return {
    topMedia: Array.isArray(mediaRes?.data?.data) ? mediaRes.data.data : [],
    pendingReviews: Array.isArray(reviewsRes?.data?.data)
      ? reviewsRes.data.data
      : [],
    stats: statsRes?.data?.data ?? statsRes?.data ?? null,
    totalUsers: usersRes?.data?.meta?.total ?? 0,
    totalMedia: mediaRes?.data?.meta?.total ?? 0,
    totalPending: reviewsRes?.data?.meta?.total ?? 0,
    salesOverTime: salesData?.salesOverTime ?? [],
    subscriptionRevenue: salesData?.subscriptionRevenue ?? 0,
    purchaseRevenue: salesData?.purchaseRevenue ?? 0,
    rentalRevenue: salesData?.rentalRevenue ?? 0,
    ratingDistribution:
      (reviewAnalyticsRes?.data?.data ?? reviewAnalyticsRes?.data)?.byRating ??
      [],
  };
}

export default async function AdminDashboardPage() {
  const {
    topMedia,
    pendingReviews,
    stats,
    totalUsers,
    totalMedia,
    totalPending,
    salesOverTime,
    subscriptionRevenue,
    purchaseRevenue,
    rentalRevenue,
    ratingDistribution,
  } = await getDashboardData();

  const cards = [
    {
      title: "Total Media",
      value: stats?.totalMedia ?? totalMedia ?? "—",
      icon: Film,
      variant: "info" as const,
      trend: { value: 12, label: "this month" },
    },
    {
      title: "Pending Reviews",
      value: stats?.pendingReviews ?? totalPending ?? "—",
      icon: Clock,
      variant: "warning" as const,
      subtitle: "Awaiting your approval",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? totalUsers ?? "—",
      icon: Users,
      variant: "success" as const,
      trend: { value: 8, label: "this week" },
    },
    {
      title: "Total Revenue",
      value: stats?.totalRevenue
        ? `$${Number(stats.totalRevenue).toLocaleString()}`
        : "—",
      icon: DollarSign,
      variant: "default" as const,
      trend: { value: 5, label: "vs last month" },
    },
  ];

  return (
    <div className="space-y-8 h-full">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening with  Cinema Tube today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards?.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 p-5 rounded-xl border border-border bg-card">
          <h2 className="font-semibold text-sm mb-4">Revenue Over Time</h2>
          <RevenueLineChart data={salesOverTime} />
        </div>
        <div className="p-5 rounded-xl border border-border bg-card">
          <h2 className="font-semibold text-sm mb-4">Revenue Breakdown</h2>
          <RevenueBreakdownPieChart
            subscriptionRevenue={subscriptionRevenue}
            purchaseRevenue={purchaseRevenue}
            rentalRevenue={rentalRevenue}
          />
        </div>
        <div className="xl:col-span-3 p-5 rounded-xl border border-border bg-card">
          <h2 className="font-semibold text-sm mb-4">
            Review Rating Distribution
          </h2>
          <ReviewRatingBarChart data={ratingDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 h-full">
        {/* Pending Reviews */}
        <section className="xl:col-span-3 space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 text-amber-500" />
              <h2 className="font-semibold text-sm">Pending Reviews</h2>
              {totalPending > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {totalPending}
                </Badge>
              )}
            </div>
            <Link href="/admin/reviews">
              <Button variant="ghost" size={"lg"} className="text-xs">
                View all →
              </Button>
            </Link>
          </div>

          {pendingReviews?.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 min-h-8/12 rounded-xl border border-dashed border-border text-center">
              <CheckCircle2 className="size-8 text-emerald-500" />
              <p className="font-medium text-sm">All caught up!</p>
              <p className="text-xs text-muted-foreground">
                No pending reviews right now.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReviews?.map((review: any) => (
                <div
                  key={review.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium truncate">
                        {review.user?.name || "Unknown User"}
                      </span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        <Star className="size-2.5 fill-amber-500 text-amber-500 mr-1" />
                        {review.rating}/10
                      </Badge>
                      {review.hasSpoiler && (
                        <Badge className="text-xs shrink-0 bg-red-500/10 text-red-500 border-red-500/20">
                          Spoiler
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {review.content}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <AdminReviewActionButtons reviewId={review.id} compact />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top Reviewed Media */}
        <section className="xl:col-span-2 space-y-3 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-blue-500" />
              <h2 className="font-semibold text-sm">Most Reviewed</h2>
            </div>
            <Link href="/admin/media">
              <Button variant="ghost" size="lg" className="text-xs">
                Manage →
              </Button>
            </Link>
          </div>

          {topMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 min-h-8/12 rounded-xl border border-dashed border-border text-center">
              <Film className="size-8 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">No media found.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {topMedia.map((item: any, idx: number) => (
                <Link
                  key={item.id}
                  href={`/admin/media/${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="size-3" />
                        {item.reviewCount || 0}
                      </span>
                      <span className="text-xs text-amber-500 flex items-center gap-1">
                        <Star className="size-3 fill-amber-500" />
                        {item.avgRating?.toFixed(1) || "—"}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={
                      item.isPublished
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs"
                        : "bg-red-500/10 text-red-500 border-red-500/20 text-xs"
                    }
                  >
                    {item.isPublished ? "Live" : "Draft"}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
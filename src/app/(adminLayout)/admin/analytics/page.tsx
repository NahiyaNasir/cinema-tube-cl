import AnalyticsClient from "@/src/components/modules/Admin/analyticsClient";

export const dynamic = "force-dynamic";



export const metadata = {
  title: "Analytics | CTAdmin",
  description: "View sales, ratings, and content analytics.",
};

export default function AdminAnalyticsPage() {
  return <AnalyticsClient />;
}
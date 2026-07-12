"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface RatingGroup {
  rating: number;
  _count: { id: number };
}

export default function ReviewRatingBarChart({
  data,
}: {
  data: RatingGroup[];
}) {
  // Ensure all ratings 1-10 are represented, even with zero reviews
  const byRating = new Map(data?.map((d) => [d.rating, d._count.id]) ?? []);
  const chartData = Array.from({ length: 10 }, (_, i) => {
    const rating = i + 1;
    return { rating: `${rating}★`, count: byRating.get(rating) || 0 };
  });

  const hasData = chartData.some((d) => d.count > 0);

  if (!hasData) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
        No reviews yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="rating"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          width={30}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

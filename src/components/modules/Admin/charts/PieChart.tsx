"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface RevenueBreakdownProps {
  subscriptionRevenue: number;
  purchaseRevenue: number;
  rentalRevenue: number;
}

const COLORS = ["var(--primary)", "#22c55e", "#f59e0b"];

export default function RevenueBreakdownPieChart({
  subscriptionRevenue,
  purchaseRevenue,
  rentalRevenue,
}: RevenueBreakdownProps) {
  const data = [
    { name: "Subscriptions", value: subscriptionRevenue || 0 },
    { name: "Purchases", value: purchaseRevenue || 0 },
    { name: "Rentals", value: rentalRevenue || 0 },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
        No revenue data yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => {
            const numericValue =
              typeof value === "number"
                ? value
                : typeof value === "string"
                  ? Number(value)
                  : 0;

            return `$${numericValue.toLocaleString()}`;
          }}
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

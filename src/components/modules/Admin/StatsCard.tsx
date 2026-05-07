import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard Shadcn utility

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "info" | "success" | "warning";
  trend?: {
    value: number;
    label: string;
  };
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  variant = "default",
  trend,
  subtitle,
}: StatsCardProps) {
  const variants = {
    default: "text-primary bg-primary/10",
    info: "text-blue-500 bg-blue-500/10",
    success: "text-emerald-500 bg-emerald-500/10",
    warning: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          </div>
        </div>
        <div className={cn("p-2 rounded-lg", variants[variant])}>
          <Icon className="size-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {trend ? (
          <div className="flex items-center gap-1">
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend.value >= 0 ? "text-emerald-500" : "text-red-500"
              )}
            >
              {trend.value >= 0 ? (
                <TrendingUp className="size-3 mr-0.5" />
              ) : (
                <TrendingDown className="size-3 mr-0.5" />
              )}
              {Math.abs(trend.value)}%
            </div>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        ) : (
          subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )
        )}
      </div>
    </div>
  );
}
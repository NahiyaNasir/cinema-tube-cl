import { Film, Layers, Star, Tv } from "lucide-react";

interface StatsSectionProps {
  totalTitles: number;
  totalGenres: number;
  topRating: number;
  totalSeries: number;
}

export default function StatsSection({
  totalTitles,
  totalGenres,
  topRating,
  totalSeries,
}: StatsSectionProps) {
  const stats = [
    {
      icon: Film,
      value: totalTitles.toLocaleString(),
      label: "Titles Available",
    },
    {
      icon: Tv,
      value: totalSeries.toLocaleString(),
      label: "TV Series",
    },
    {
      icon: Layers,
      value: totalGenres.toLocaleString(),
      label: "Genres",
    },
    {
      icon: Star,
      value: topRating > 0 ? topRating.toFixed(1) : "—",
      label: "Highest Rated",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center text-center gap-2"
          >
            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <stat.icon className="size-5" />
            </div>
            <span className="text-2xl md:text-3xl font-bold">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
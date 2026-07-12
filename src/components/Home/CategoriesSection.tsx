/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Flame,
  Drama,
  Rocket,
  Laugh,
  Camera,
  Ghost,
  Heart,
  Swords,
  Sparkles,
  Baby,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { getAllGenres } from "@/src/service/admin.service";

const PALETTE = [
  { icon: Flame, color: "bg-red-500/10 text-red-500" },
  { icon: Drama, color: "bg-blue-500/10 text-blue-500" },
  { icon: Rocket, color: "bg-purple-500/10 text-purple-500" },
  { icon: Laugh, color: "bg-yellow-500/10 text-yellow-500" },
  { icon: Camera, color: "bg-green-500/10 text-green-500" },
  { icon: Ghost, color: "bg-orange-500/10 text-orange-500" },
  { icon: Heart, color: "bg-pink-500/10 text-pink-500" },
  { icon: Swords, color: "bg-cyan-500/10 text-cyan-500" },
  { icon: Sparkles, color: "bg-indigo-500/10 text-indigo-500" },
  { icon: Baby, color: "bg-teal-500/10 text-teal-500" },
];

export default function CategoriesSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["genres", "homepage-categories"],
    queryFn: () => getAllGenres({ limit: 6 }),
  });

  const genres = (data as any)?.data ?? [];

  if (!isLoading && genres.length === 0) return null;

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3 text-sm md:text-base font-bold">
            Discover your next favorite movie or series by browsing curated genres.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 rounded-2xl bg-muted/40 animate-pulse"
                />
              ))
            : genres.map((genre: any, index: number) => {
                const { icon: Icon, color } = PALETTE[index % PALETTE.length];
                return (
                  <Link key={genre.id} href={`/explore?genre=${genre.slug}`}>
                    <Card
                      className="group relative p-6 text-center cursor-pointer
                      border border-border/50
                      bg-linear-to-br from-background to-muted/30
                      hover:from-muted/40 hover:to-muted/10
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl
                      dark:bg-card/40 dark:backdrop-blur-xl overflow-hidden"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className={`absolute inset-0 ${color} opacity-10 blur-2xl`} />
                      </div>

                      {/* CONTENT */}
                      <div className="relative z-10 flex flex-col items-center">
                        {/* ICON BOX */}
                        <div
                          className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="size-6" />
                        </div>

                        {/* TITLE */}
                        <h3 className="font-semibold text-sm md:text-base">
                          {genre.name}
                        </h3>

                        {/* SUBTEXT */}
                        <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition">
                          Browse {genre.name}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
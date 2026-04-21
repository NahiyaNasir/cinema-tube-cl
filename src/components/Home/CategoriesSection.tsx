/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Film,  Gamepad2, Mic2, Music, Theater, Tv } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";


const categories = [
  { name: "Action", icon: Film, color: "bg-red-500/10 text-red-500", slug: "action" },
  { name: "Drama", icon: Theater, color: "bg-blue-500/10 text-blue-500", slug: "drama" },
  { name: "Sci-Fi", icon: Gamepad2, color: "bg-purple-500/10 text-purple-500", slug: "sci-fi" },
  { name: "Comedy", icon: Mic2, color: "bg-yellow-500/10 text-yellow-500", slug: "comedy" },
  { name: "Documentary", icon: Tv, color: "bg-green-500/10 text-green-500", slug: "documentary" },
  { name: "Horror", icon: Music, color: "bg-orange-500/10 text-orange-500", slug: "horror" },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Discover your next favorite movie or series by browsing curated genres.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((cat: any) => (
            <Link key={cat.slug} href={`/media?genre=${cat.slug}`}>

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
                  <div className={`absolute inset-0 ${cat.color} opacity-10 blur-2xl`} />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center">

                  {/* ICON BOX */}
                    <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="size-6" />
                </div>

                  {/* TITLE */}
                  <h3 className="font-semibold text-sm md:text-base">
                    {cat.name}
                  </h3>

                  {/* SUBTEXT (optional but pro touch) */}
                  <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition">
                    Browse {cat.name}
                  </p>

                </div>

              </Card>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
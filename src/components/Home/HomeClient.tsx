/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getAllMedia } from "@/src/service/media.service";
import { getAllGenres } from "@/src/service/admin.service";
import { IProfileResponse } from "@/src/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "./HeroSection";
import SearchBar from "./searchBar";
import PricingSection from "./PricingSection";
import CategoriesSection from "./CategoriesSection";
import MediaStrip from "./MediaStripe";
import CinemaCTA from "./CTA.section";
import StatsSection from "./StatsSection";
import HowItWorksSection from "./HowItWorksSection";
import { Loader2Icon } from "lucide-react";

export default function HomeClient({ user }: { user: IProfileResponse }) {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["media"],
    queryFn: () => getAllMedia(),
  });

  const { data: genresData } = useQuery({
    queryKey: ["genres", "homepage-stats"],
    queryFn: () => getAllGenres({ limit: 50 }),
  });

  const { data: seriesData } = useQuery({
    queryKey: ["media", "series-count"],
    queryFn: () => getAllMedia({ type: "SERIES", limit: 1 }),
  });

  // if (isLoading || isPending) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loader2Icon className="animate-spin h-10 w-10 text-primary" />
  //     </div>
  //   );
  // }
  const mediaList = data?.data || ([] as any);

  //  Top Rated
  const topRated = [...mediaList]
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 10);
  //  Newly Added
  const newlyAdded = [...mediaList].slice(0, 10);

  //  Editor Picks (adminSelected = true)
  const editorsPicks = [...mediaList].reverse().slice(0, 10);

  // Hero carousel uses the top rated titles as featured slides
  const heroSlides = topRated.slice(0, 5);

  // Real, dynamic stats
  const totalTitles = (data as any)?.meta?.total ?? mediaList.length;
  const totalGenres =
    (genresData as any)?.data?.length ?? (genresData as any)?.meta?.total ?? 0;
  const totalSeries = (seriesData as any)?.meta?.total ?? 0;
  const topRating = topRated[0]?.avgRating ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* HERO */}
      <HeroSection mediaList={heroSlides} isLoading={isLoading} />

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <SearchBar />
      </div>

      {/* STATS */}
      <div className="mt-10">
        <StatsSection
          totalTitles={totalTitles}
          totalGenres={totalGenres}
          totalSeries={totalSeries}
          topRating={topRating}
        />
      </div>

      <div className="mt-10">
        <CategoriesSection />
      </div>

      {/* MEDIA SECTIONS */}
      <div className="space-y-10 mt-10">
        <MediaStrip
          user={user}
          title="Top Rated This Week"
          mediaList={topRated}
          isLoading={isLoading}
        />

        <MediaStrip
          user={user}
          title=" Newly Added"
          mediaList={newlyAdded}
          isLoading={isLoading}
        />

        <MediaStrip
          user={user}
          title="Editor’s Picks"
          mediaList={editorsPicks}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-20">
        <HowItWorksSection />
      </div>

      <div className="mt-20">
        <CinemaCTA></CinemaCTA>
      </div>
      {/* PRICING */}
      <div className="mt-20">
        <PricingSection user={user} />
      </div>
    </div>
  );
}
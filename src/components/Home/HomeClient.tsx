/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getAllMedia } from "@/src/service/media.service";
import { IProfileResponse } from "@/src/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "./HeroSection";
import SearchBar from "./searchBar";
import PricingSection from "./PricingSection";
import CategoriesSection from "./CategoriesSection";
import MediaStrip from "./MediaStripe";
import CinemaCTA from "./CTA.section";
import { Loader2Icon } from "lucide-react";

export default function HomeClient({ user }: { user: IProfileResponse }) {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["media"],
    queryFn: () => getAllMedia(),
  });
  // if (isLoading || isPending) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loader2Icon className="animate-spin h-10 w-10 text-primary" />
  //     </div>
  //   );
  // }
  const mediaList = data?.data || ([] as any);

  const featuredMedia = mediaList?.length > 0 ? mediaList[0] : null;

  //  Top Rated
  const topRated = [...mediaList]
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 10);
  //  Newly Added
  const newlyAdded = [...mediaList].slice(0, 10);

  //  Editor Picks (adminSelected = true)
  const editorsPicks = [...mediaList].reverse().slice(0, 10);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* HERO */}
      <HeroSection media={featuredMedia} isLoading={isLoading} />

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <SearchBar />
      </div>

      <CategoriesSection />

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
        <CinemaCTA></CinemaCTA>
      </div>
      {/* PRICING */}
      <div className="mt-20">
        <PricingSection user={user} />
      </div>
    </div>
  );
}

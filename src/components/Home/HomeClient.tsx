/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { getAllMedia } from "@/src/service/media.service";
import { IProfileResponse } from "@/src/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "./HeroSection";
import SearchBar from "./searchBar";
import PricingSection from "./PricingSection";
import CategoriesSection from "./CategoriesSection";
import MediaStrip from "./MediaStripe";
import ReviewCard from "../Review/ReviewCard";




export default function HomeClient({ user }: { user: IProfileResponse}) {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["media"],
    queryFn: () => getAllMedia(),
  });

  const mediaList = data?.data||[];
  // console.log(mediaList,"home");

  // 🎬 Featured
  const featuredMedia = mediaList[0];

  //  Top Rated
  const topRated = [...mediaList]
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 10);

  //  Newly Added
  const newlyAdded = [...mediaList]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

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

<div>
  
</div>
      {/* PRICING */}
      <div className="mt-20">
        <PricingSection user={user} />
      </div>
    </div>
  );
}
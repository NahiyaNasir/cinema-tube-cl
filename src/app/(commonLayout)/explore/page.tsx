/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

import Link from "next/link";
import { getAllMedia } from "@/src/service/media.service";
import { Input } from "@/components/ui/input";
import MediaCard from "@/src/components/Home/MediaCard";
import MediaSkeleton from "@/src/components/Home/MediaSkeleton";

interface ExploreProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

const CATEGORIES = ["All", "Movies", "TV Shows", "Action", "Drama", "Sci-Fi", "Comedy"];

export default async function ExplorePage({ searchParams }: ExploreProps) {
  const query = searchParams.q || "";
  const category = searchParams.category || "All";
  
  
  const{data:  mediaList } = await getAllMedia({ 
    search: query, 
    category: category === "All" ? "" : category 
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* --- Search & Header Section --- */}
      <div className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Explore
              </h1>
              <p className="text-gray-500 text-sm mt-1">Discover your next favorite story</p>
            </div>
            
            {/* Search Input (Client Component for instant typing) */}
            <form action="/explore" method="GET" className="relative w-full md:w-112.5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Search movies, actors, or genres..."
                className="pl-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-14 rounded-2xl text-lg transition-all"
              />
            </form>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mt-8">
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-primary">
              <SlidersHorizontal className="size-5" />
            </div>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/explore?category=${cat}${query ? `&q=${query}` : ""}`}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                  category === cat
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- Grid Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-300">
            {query ? `Results for "${query}"` : `Popular in ${category}`}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/5">
            <Filter className="size-4" />
            <span>Latest Release</span>
          </div>
        </div>

        <Suspense fallback={<ExploreSkeleton />}>
          {mediaList?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 gap-x-6">
              {mediaList.map((media: any) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 opacity-50">
               <div className="p-6 bg-white/5 rounded-full mb-4">
                 <Search className="size-12 text-gray-400" />
               </div>
               <p className="text-xl font-medium">No media found</p>
               <p className="text-sm">Try searching for something else</p>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}

// Skeleton Loader for better UX
function ExploreSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <MediaSkeleton key={i} />
      ))}
    </div>
  );
}
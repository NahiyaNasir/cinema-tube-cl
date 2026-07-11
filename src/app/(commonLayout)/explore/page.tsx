/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import Link from "next/link";
import { getAllMedia } from "@/src/service/media.service";
import { getAllGenres } from "@/src/service/admin.service";
import { Input } from "@/components/ui/input";
import MediaCard from "@/src/components/Home/MediaCard";
import MediaSkeleton from "@/src/components/Home/MediaSkeleton";

import { Genre } from "@/src/types/media.types";

import Pagination from "@/src/components/modules/explore/Pagination";
import SortSelect from "@/src/components/modules/explore/sortSelect";

interface ExploreProps {
  searchParams: Promise<{
    q?: string;
    genre?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
}

const TYPES = [
  { label: "All", value: "" },
  { label: "Movies", value: "MOVIE" },
  { label: "TV Series", value: "SERIES" },
];

export default async function ExplorePage({ searchParams }: ExploreProps) {
  const params = await searchParams;

  const query = params.q || "";
  const activeGenre = params.genre || "";
  const activeType = params.type || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const page = Number(params.page) || 1;
  const limit = 12;

  const [{ data: mediaList, meta }, { data: genres }] = await Promise.all([
    getAllMedia({
      searchTerm: query || undefined,
      genre: activeGenre || undefined,
      type: activeType || undefined,
      sortBy,
      sortOrder,
      page,
      limit,
    }),
    getAllGenres({ limit: 30 }),
  ]);

  const buildHref = (overrides: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (activeGenre) p.set("genre", activeGenre);
    if (activeType) p.set("type", activeType);
    if (sortBy) p.set("sortBy", sortBy);
    if (sortOrder) p.set("sortOrder", sortOrder);
    p.set("page", String(page));

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        p.delete(key);
      } else {
        p.set(key, String(value));
      }
    });

    return `/explore?${p.toString()}`;
  };

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
              <p className="text-gray-500 text-sm mt-1">
                Discover your next favorite story
              </p>
            </div>

            {/* Search Input */}
            <form action="/explore" method="GET" className="relative w-full md:w-112.5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Search movies, actors, or genres..."
                className="pl-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-14 rounded-2xl text-lg transition-all"
              />
              {activeGenre && <input type="hidden" name="genre" value={activeGenre} />}
              {activeType && <input type="hidden" name="type" value={activeType} />}
            </form>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mt-8">
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-primary">
              <SlidersHorizontal className="size-5" />
            </div>
            {TYPES.map((t) => (
              <Link
                key={t.label}
                href={buildHref({ type: t.value || undefined, page: 1 })}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                  activeType === t.value
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          {/* Genre Filter */}
          {genres?.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mt-3">
              <Link
                href={buildHref({ genre: undefined, page: 1 })}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  !activeGenre
                    ? "bg-primary/20 border-primary/40 text-primary"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20"
                }`}
              >
                All Genres
              </Link>
              {genres.map((g: Genre) => (
                <Link
                  key={g.id}
                  href={buildHref({ genre: g.slug, page: 1 })}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                    activeGenre === g.slug
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20"
                  }`}
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- Grid Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-300">
            {query ? `Results for "${query}"` : "Browse"}
            {meta?.total !== undefined && (
              <span className="text-gray-500 text-sm font-normal ml-2">
                ({meta.total} {meta.total === 1 ? "result" : "results"})
              </span>
            )}
          </h2>
          <SortSelect />
        </div>

        <Suspense fallback={<ExploreSkeleton />}>
          {mediaList?.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 gap-x-6">
                {mediaList.map((media: any) => (
                  <MediaCard key={media.id} media={media} />
                ))}
              </div>
              <Pagination
                page={meta?.page || page}
                totalPages={meta?.totalPages || 1}
                buildHref={(p) => buildHref({ page: p })}
              />
            </>
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
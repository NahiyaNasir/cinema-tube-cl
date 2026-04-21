/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";


import { Button } from "@/components/ui/button";
import CollectionsTabs from "@/src/components/modules/profile/CollectionsTabs";
import { getUserInfo } from "@/src/service/auth.service";
import { getBookmarked, getMyFavorites, getMyWatchlist } from "@/src/service/collection.service";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CollectionsPage() {
  const [watchlistRes, bookmarksRes, favoritesRes, user] = await Promise.all([
    getMyWatchlist(),
    getBookmarked(),
    getMyFavorites(),
    getUserInfo(),
  ]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-5 mb-3">
        <Link href={"/profile"}>
          <Button size={"icon-lg"} variant={"ghost"}>
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-white">My Collections</h1>
      </div>
      <CollectionsTabs
        watchlist={(watchlistRes as any).data}
        bookmarks={(bookmarksRes as any).data}
        favorites={(favoritesRes as any).data}
        user={user}
      />
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  Calendar,
  Film,
  Share2,
  BookmarkPlus,
  Users2,
} from "lucide-react";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  getMediaBySlug,
  getMyMediaPurchases,
} from "@/src/service/media.service";
import { getUserInfo } from "@/src/service/auth.service";
import MediaActions from "@/src/components/Home/MediaActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cast } from "@/src/types/media.types";
import ReviewForm from "@/src/components/Review/ReviewForm";
import ReviewSection from "@/src/components/Review/ReviewSection";
import { getAllMedia } from "@/src/service/media.service";
import MediaCard from "@/src/components/Home/MediaCard";

import { Media } from "@/src/types/media.types";
import MediaGallery from "@/src/components/modules/media/mediaGallery";
import BookmarkButton from "@/src/components/modules/profile/BookmarkButton";

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: media } = await getMediaBySlug(slug);
  // console.log(media, "medi8a");

  const user = await getUserInfo();
  const reviews = media.reviews;
  //  console.log(reviews,"slug");
  let hasPurchased = false;
  if (user && media.pricing !== "FREE") {
    try {
      const res = (await getMyMediaPurchases()) as any;
      const purchases = res?.data || [];
      hasPurchased = purchases.some((p: any) => p.mediaId === media.id);
    } catch (e) {}
  }

  const initialIsWatchlisted =
    user?.watchlists?.some((b: any) => b.mediaId === media.id) || false;

  const initialIBookmarks =
    user?.bookmarks?.some((b: any) => b.mediaId === media.id) || false;
// console.log(initialIBookmarks);

  let relatedMedia: Media[] = [];
  const primaryGenreSlug = media.genres?.[0]?.slug;
  if (primaryGenreSlug) {
    try {
      const relatedRes = await getAllMedia({
        genre: primaryGenreSlug,
        limit: 9,
      });
      relatedMedia = (relatedRes?.data || []).filter(
        (m: Media) => m.id !== media.id
      ).slice(0, 8);
    } catch (e) {}
  }
  return (
    <div className="min-h-screen bg-black text-white mt-10">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src={
              media.backdropUrl ||
              media.posterUrl ||
              "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM"
            }
            alt={media.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative container mx-auto h-full flex flex-col justify-end pb-12 px-4">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="hidden md:block w-lg h-95 rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
              <Image
                width={900}
                height={1200}
                // Add a fallback URL instead of empty string
                src={
                  media.posterUrl ||
                  "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM"
                }
                alt={media.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/20 text-primary text-sm px-4 py-4 font-bold uppercase tracking-wider">
                    {media.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    {media.avgRating?.toFixed(1) || "N/A"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size={"icon-lg"} variant={"ghost"}>
                    <Share2 />
                  </Button>
                  <Button size={"icon-lg"} variant={"ghost"}>
                    <BookmarkButton
                    mediaId={media.id}
                    initialIsBookmarked={initialIBookmarks}
                    user={user}
                  />
                  </Button>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">{media.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-neutral-300 text-sm">
                <Badge className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {media.releaseYear}
                </Badge>
                {media.runtimeMinutes && (
                  <Badge
                    variant={"secondary"}
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    {media.runtimeMinutes} min
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  {media.director}
                </div>
              </div>
              {media.genres?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {media.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="outline"
                      className="text-xs border-neutral-700 text-neutral-300"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
              {/* <p className="max-w-2xl text-md text-neutral-300 line-clamp-3">
                {media.description}
              </p> */}

              <MediaActions
                media={media}
                hasPurchasedInitial={hasPurchased}
                user={user}
                initialIsWatchlisted={initialIsWatchlisted}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details & Cast */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">description</h2>
              <p className="text-neutral-400 leading-relaxed text-md">
                {media.description}
              </p>
            </section>

            <div className="w-full h-full">
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="flex flex-col h-full">
                {media.cast?.length === 0 ? (
                  <div className=" h-60 rounded-xl flex flex-col items-center justify-center py-10 bg-secondary/35">
                    <Users2 className="size-7 text-muted-foreground mb-2" />
                    <h3 className="text-xl">No Cast</h3>
                    <p className="text-muted-foreground">
                      {" "}
                      No cast members found.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {media.cast?.map((Cast: Cast) => (
                      <div
                        key={Cast.id}
                        className="p-5 rounded-xl bg-secondary/15 hover:bg-secondary/55 flex flex-col"
                      >
                        <Avatar className="size-25 mx-auto">
                          <AvatarImage src={Cast.image} />
                          <AvatarFallback>
                            {Cast.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="mt-3 flex flex-col gap-2 items-center justify-between">
                          <p className="font-medium text-neutral-200">
                            {Cast.name}
                          </p>
                          <Badge className="text-xs uppercase tracking-tighter px-3 py-3">
                            {Cast.role}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-8">
            <section className="bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50">
              <h3 className="text-lg mb-4 italic text-primary/80">
                Reviews Summary
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Average Rating</span>
                  <span className="text-2xl font-bold text-yellow-500">
                    {media.avgRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Total Reviews</span>
                  <span className="font-medium">
                    {media.reviewCount || "00"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Total Views</span>
                  <span className="font-medium">{media.viewCount || "00"}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Available On</h3>
            </section>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="pt-8">
          <h3 className="text-lg">Write Your Review Here</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Share your thoughts and help others decide
          </p>
          <ReviewForm mediaId={media.id} user={user} isEdit={false} />
        </section>
        {media.images && media.images.length > 0 && (
          <MediaGallery images={media.images} title={media.title} />
        )}

        <ReviewSection initialReviews={reviews} user={user} />

        {relatedMedia.length > 0 && (
          <section className="pt-8">
            <h2 className="text-2xl font-bold mb-6">More Like This</h2>
            <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth items-stretch">
              {relatedMedia.map((item) => (
                <MediaCard key={item.id} media={item} user={user} />
              ))}
              <div
                className="min-w-5 md:min-w-10 shrink-0 invisible"
                aria-hidden="true"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
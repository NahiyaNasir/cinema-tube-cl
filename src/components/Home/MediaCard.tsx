/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserMediaAccess } from "@/src/lib/access";
import { Media } from "@/src/types/media.types";
import { IProfileResponse } from "@/src/types/profile.types";
import { Lock, Play, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MediaCard({
  media,
  user,
}: {
  media: Media;
  user?: IProfileResponse | null;
}) {
  // Access Control Logic
  const { hasAccess } = getUserMediaAccess(
    media,
    user?.subscription || null,
    user?.purchases || null
  );

  const hasPurchased = user?.purchases?.some(
    (p) => p.mediaId === media.id && p.type === "BUY" && p.status === "ACTIVE"
  );

  const isFree = media.pricing?.toUpperCase() === "FREE";

  return (
    <div className="min-w-40 md:min-w-52 group">
      <Link href={`/media/${media.slug}`} className="block">
        {/* --- Card Image Area --- */}
        <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-muted shadow-md ring-1 ring-white/10">
          <Image
            src={media.posterUrl || "/placeholder-poster.jpg"} 
            alt={media.title}
            fill
            sizes="(max-width: 768px) 160px, 200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay Icon */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {hasAccess ? (
              <div className="bg-primary p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
                <Play className="text-white fill-current w-5 h-5" />
              </div>
            ) : (
              <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm">
                <Lock className="text-yellow-500 w-5 h-5" />
              </div>
            )}
          </div>

          {/* Top Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {isFree ? (
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                FREE
              </span>
            ) : !hasAccess && (
              <span className="bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                PREMIUM
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* --- Content Info Area --- */}
      <div className="mt-3 px-1 space-y-2">
        {/* Title & Rating Row */}
        <div>
          <h3 className="text-sm font-bold text-gray-100 line-clamp-1 group-hover:text-primary transition-colors">
            {media.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-medium text-gray-400">
              {media.avgRating || "4.8"} • {media.releaseYear || "2024"}
            </span>
          </div>
        </div>

        {/* Genres: Compact badges */}
        {media.genres && media.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {media.genres.slice(0, 2).map((genre: any) => (
              <Badge 
                key={genre.id} 
                variant="secondary" 
                className="text-[9px] px-1.5 py-0 uppercase bg-white/5 hover:bg-white/10 text-gray-300 border-none"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Pricing & CTA Action */}
        <div className="pt-1">
          {hasAccess ? (
            <Button size="sm" asChild className="h-8 w-full rounded-lg text-[11px] font-bold bg-primary hover:bg-primary/90">
              <Link href={`/watch/${media.slug}`}>
                <Play className="mr-1.5 size-3 fill-current" /> WATCH NOW
              </Link>
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              {media.pricing === "RENTAL" && !hasPurchased && (
                <Button size="sm" variant="outline" className="h-8 w-full rounded-lg text-[11px] border-white/20 bg-white/5 hover:bg-white/10" asChild>
                  <Link href={`/payment/media-checkout?mediaId=${media.id}&type=RENTAL`}>
                    <ShoppingCart className="mr-1.5 size-3" /> RENT ${media.rentalPrice || "3.99"}
                  </Link>
                </Button>
              )}

              {media.pricing === "BUY" && !hasPurchased && (
                <Button size="sm" className="h-8 w-full rounded-lg text-[11px] font-bold bg-yellow-500 text-black hover:bg-yellow-600" asChild>
                  <Link href={`/payment/media-checkout?mediaId=${media.id}&type=BUY`}>
                    BUY ${media.buyPrice || "9.99"}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
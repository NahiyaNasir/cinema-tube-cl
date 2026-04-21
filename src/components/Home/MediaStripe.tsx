/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProfileResponse } from "@/src/types/profile.types";

import MediaCard from "./MediaCard";
import Link from "next/link";
import MediaSkeleton from "./MediaSkeleton";

interface MediaStripProps {
  title: string;
  mediaList: any[];
  exploreLink?: string;
  className?: string;
  user: IProfileResponse;
  isLoading: boolean;
}

export default function MediaStrip( { title,
  mediaList,
  exploreLink,
  className = "",
  user,
  isLoading,
}: MediaStripProps) {
  return (
   <div className={`max-w-7xl mx-auto py-6 ${className}`}>
  <div className="flex justify-between items-end mb-6 px-4">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    {exploreLink && (
      <Link 
        href={exploreLink} 
        className="text-sm font-medium text-primary hover:underline transition-all"
      >
        See all
      </Link>
    )}
  </div>
  <div className="flex gap-5 overflow-x-auto pb-8 px-4 no-scrollbar scroll-smooth select-none items-stretch">
    {isLoading
      ? Array.from({ length: 6 }).map((_, i) => <MediaSkeleton key={i} />)
      : mediaList?.map((media) => (
          <MediaCard key={media.id} media={media} user={user} />
        ))
    }

    <div className="min-w-5 md:min-w-10 shrink-0 invisible" aria-hidden="true" />
  </div>
</div>
  );
}
  
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default function HeroSection({ media, isLoading }: any) {
    // console.log(media);
  if (isLoading) {
    return <div className="h-[60vh] bg-muted animate-pulse" />;
  }

  if (!media) return null;

  return (
    <div className="relative h-[70vh] w-full">

      <Image
        src={media.posterUrl}
        alt={media.title}
        fill
        loading="eager"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-10">
        <h1 className="text-4xl font-bold">{media.title}</h1>
        <p className="max-w-xl mt-2 text-muted-foreground">
          {media.description}
        </p>

        <div className="mt-4 flex gap-3">
          <button className="bg-white text-black px-6 py-2 rounded-lg">
            ▶ Watch Now
          </button>
          <button className="bg-gray-700 px-6 py-2 rounded-lg">
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
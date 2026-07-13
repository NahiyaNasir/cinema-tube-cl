"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { normalizeImageUrl } from "@/src/lib/utils";
import { cn } from "@/lib/utils";


export default function MediaGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const safeImages = (images || [])
    .map((src) => normalizeImageUrl(src))
    .filter((src): src is string => !!src);

  if (safeImages.length === 0) return null;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">Gallery</h2>

      {/* Main viewer */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900">
        <Image
          src={safeImages[activeIndex]}
          alt={`${title} gallery image ${activeIndex + 1}`}
          fill
          className="object-cover cursor-zoom-in"
          onClick={() => setIsOpen(true)}
        />
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative shrink-0 w-24 aspect-video rounded-md overflow-hidden border-2 transition-colors",
                i === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-7 h-7" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={safeImages[activeIndex]}
              alt={`${title} gallery image ${activeIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Info, Play, Star } from "lucide-react";

const AUTOPLAY_MS = 6000;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  exit: {},
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export default function HeroSection({
  mediaList,
  isLoading,
}: {
  mediaList: any[];
  isLoading?: boolean;
}) {
  const slides = (mediaList || []).slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (isLoading) {
    return <div className="h-[70vh] bg-muted animate-pulse" />;
  }

  if (slides.length === 0) return null;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i + 1) % slides.length);

  const activeMedia = slides[activeIndex];

  return (
    <div
      className="relative h-[70vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image crossfade */}
      {slides.map((media, index) => (
        <div
          key={media.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={media.backdropUrl || media.posterUrl}
            alt={media.title}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/10 to-transparent" />
        </div>
      ))}

      {/* Animated foreground content, keyed per slide */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-10 max-w-2xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-3"
            >
              <span className="bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {activeMedia.type}
              </span>
              {activeMedia.avgRating > 0 && (
                <span className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                  <Star className="size-4 fill-yellow-500" />
                  {activeMedia.avgRating.toFixed(1)}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-white"
            >
              {activeMedia.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl mt-3 text-neutral-300 line-clamp-3 text-sm md:text-base"
            >
              {activeMedia.description}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex gap-3">
              <Link
                href={`/watch/${activeMedia.slug}`}
                className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
              >
                <Play className="size-4 fill-black" />
                Watch Now
              </Link>
              <Link
                href={`/media/${activeMedia.slug}`}
                className="flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-2.5 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <Info className="size-4" />
                More Info
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { Play, Info, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
          alt="Hero Banner"
          width={1920}
          height={1080}
          loading='eager'
          className="h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary text-primary-foreground hover:bg-primary font-bold px-3 py-1 uppercase tracking-wider">
              New Release
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none"
          >
            The Dark <br /> <span className="text-primary">Chronicles</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 text-sm font-medium"
          >
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span>8.9 Rating</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>2024</span>
            </div>
            <Badge
              variant="outline"
              className="border-muted-foreground/30 text-muted-foreground uppercase"
            >
              Sci-Fi / Action
            </Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none"
          >
            In a dystopian future, a rogue detective must navigate a city of
            secrets and shadows to uncover the truth behind a series of
            mysterious disappearances. With stunning visuals and a gripping
            storyline, &quot;The Dark Chronicles&quot; is a cinematic experience
            that will keep you on the edge of your seat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              size="lg"
              className="px-8 gap-2 font-bold text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              <Play className="h-5 w-5 fill-current" /> Play Trailer
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 gap-2 font-bold text-base hover:bg-accent/80"
            >
              <Info className="h-5 w-5" /> More Details
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-64 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3"
      >
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
          alt="Poster Preview"
          width={400}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;

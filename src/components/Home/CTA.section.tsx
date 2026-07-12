"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CinemaCTA() {
  return (
    <section className="relative overflow-hidden bg-card border border-border py-20 px-6 rounded-3xl mx-4 my-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/25 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--foreground)_1px,transparent_0)] bg-size-[24px_24px] opacity-5" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-6"
        >
          <Sparkles className="size-3.5" />
          Unlimited Streaming
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
        >
          Your Front Row Seat <br />{" "}
          <span className="text-primary">Is Waiting.</span>
        </motion.h2>

        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Stream the latest blockbusters or rent your favorite classics.
          Start your cinematic journey today with instant access.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
          >
            <Link href="/register">
              Get Started Now
              <ArrowRight className="ml-1 size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent px-8 py-6 text-lg rounded-full"
          >
            <Link href="/explore">
              <Play className="mr-1 size-5" />
              Browse Library
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Search, Play, Star } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Discover",
    description:
      "Explore thousands of movies and shows, filter by genre, or search for something specific.",
  },
  {
    icon: Play,
    step: "02",
    title: "Watch Instantly",
    description:
      "Stream free titles right away, or unlock premium content with a subscription or one-time purchase.",
  },
  {
    icon: Star,
    step: "03",
    title: "Rate & Review",
    description:
      "Share your thoughts after watching and help other movie lovers decide what to watch next.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary">
          How It Works
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          Three steps to your next watch
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative rounded-2xl border border-border bg-card p-6"
          >
            <span className="text-4xl font-bold text-primary/15 absolute top-4 right-5">
              {step.step}
            </span>
            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <step.icon className="size-5" />
            </div>
            <h3 className="font-semibold text-lg mb-1.5">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
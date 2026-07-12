"use client";

import Link from "next/link";
import {
  Film,
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-neutral-600" />
              <span className="text-xl font-bold tracking-tight text-primary">Cinema Tube</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination to explore, rate, and review your
              favorite movies and series. Join our community of cinema lovers.
            </p>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:support@cinematube.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                support@cinematube.com
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +1 (555) 123-4567
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                123 Studio Lane, Los Angeles, CA
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cinema Tube on Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:text-primary"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cinema Tube on Instagram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:text-primary"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cinema Tube on YouTube"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:text-primary"
              >
                <Play className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/explore?type=MOVIE"
                  className="hover:text-primary transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?type=SERIES"
                  className="hover:text-primary transition-colors"
                >
                  TV Series
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?sortBy=avgRating&sortOrder=desc"
                  className="hover:text-primary transition-colors"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?sortBy=createdAt&sortOrder=desc"
                  className="hover:text-primary transition-colors"
                >
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Subscribe
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest updates on new releases, reviews, and exclusive
              content delivered straight to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/subscription">
                <Button className="w-full">Subscribe</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Cinema Tube Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

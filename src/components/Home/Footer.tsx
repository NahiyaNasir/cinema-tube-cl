"use client";
import Link from "next/link";
import { Film, Mail, Send, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">
             Cinema Tube
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination to explore, rate, and review your
              favorite movies and series. Join our community of cinema lovers.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-colors hover:text-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-colors hover:text-primary"
              >
                <GitBranch className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/movies"
                  className="hover:text-primary transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="hover:text-primary transition-colors"
                >
                  TV Series
                </Link>
              </li>
              <li>
                <Link
                  href="/top-rated"
                  className="hover:text-primary transition-colors"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming"
                  className="hover:text-primary transition-colors"
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
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

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Subscribe
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest updates on new releases, reviews, and exclusive
              content delivered straight to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button className="w-full">Subscribe</Button>
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

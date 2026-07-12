import { Film, Heart, Sparkles, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Cinema Tube",
  description: "Learn about Cinema Tube's mission and story.",
};

const VALUES = [
  {
    icon: Film,
    title: "Curated Catalog",
    description:
      "From blockbuster hits to hidden indie gems, every title on Cinema Tube is picked to give you something worth watching.",
  },
  {
    icon: Sparkles,
    title: "Built for Discovery",
    description:
      "Smart genre filters, ratings, and recommendations help you find your next favorite movie or series in seconds.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Reviews and ratings come from real viewers like you, not studios — so you always know what people actually think.",
  },
  {
    icon: Heart,
    title: "Made for Movie Lovers",
    description:
      "We're a small team obsessed with film, building the streaming experience we always wanted for ourselves.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary">
          About Us
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">
          Movies and shows, without the noise.
        </h1>
        <p className="text-muted-foreground mt-4 md:text-lg">
          Cinema Tube started with a simple idea: streaming should feel like
          browsing a great video store, not scrolling through an endless,
          impersonal catalog. We built a platform focused on discovery,
          honest ratings, and a genuinely good watching experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="p-6 rounded-2xl border bg-card flex flex-col gap-3"
          >
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <value.icon className="size-5" />
            </div>
            <h2 className="font-semibold text-lg">{value.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Have questions?</h2>
        <p className="text-muted-foreground">
          We'd love to hear from you. Reach out through our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>{" "}
          any time.
        </p>
      </div>
    </div>
  );
}
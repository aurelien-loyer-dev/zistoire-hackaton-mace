import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard } from "./StoryCard";
import type { Story } from "../data/stories";

interface HorizontalStoryCarouselProps {
  stories: Story[];
  title: string;
  subtitle?: string;
}

export function HorizontalStoryCarousel({ stories, title, subtitle }: HorizontalStoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl mb-2" style={{ fontWeight: "600" }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ color: "var(--ocean-blue)" }}
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ color: "var(--ocean-blue)" }}
            aria-label="Défiler vers la droite"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {stories.map((story, index) => (
              <div key={story.slug} className="flex-shrink-0 w-80 snap-start">
                <StoryCard story={story} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { HorizontalStoryCarousel } from "../components/HorizontalStoryCarousel";
import { StoryCard } from "../components/StoryCard";
import { Footer } from "../components/Footer";
import { useStories } from "../../hooks/useStories";

export function Home() {
  const { stories, loading, error } = useStories();

  const currentEventStories = stories.filter((s) => s.isCurrentEvent);
  const sponsoredStories = stories.filter((s) => s.isSponsored);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main id="stories" className="py-16">

        {!loading && !error && (
          <>
            {/* Current Events Section */}
            {currentEventStories.length > 0 && (
              <HorizontalStoryCarousel
                stories={currentEventStories}
                title="Histoires liées à l'actualité"
                subtitle="Découvrez les récits en lien avec les événements du moment"
              />
            )}
            {/* Sponsored Stories Section */}
            {sponsoredStories.length > 0 && (
              <div className="py-12" style={{ background: "linear-gradient(to bottom, rgba(212, 196, 168, 0.1), transparent)" }}>
                <HorizontalStoryCarousel
                  stories={sponsoredStories}
                  title="Nos activités favorites"
                  subtitle="Explorez ces récits avec nos partenaires culturels"
                />
              </div>
            )}

            {/* All Stories Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h2 className="text-4xl mb-2" style={{ fontWeight: "600" }}>
                    Toutes les histoires à découvrir
                  </h2>
                  <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
                    Explorez la richesse du patrimoine réunionnais
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {stories.map((story, index) => (
                    <StoryCard key={story.slug} story={story} index={index} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

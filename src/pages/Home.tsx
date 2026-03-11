import HeroSection from '../components/HeroSection';
import HorizontalStoryCarousel from '../components/HorizontalStoryCarousel';
import StoryCard from '../components/StoryCard';
import { getCurrentEventStories, getSponsoredStories, getPermanentStories } from '../data/stories';
import { Calendar, Star, BookOpen } from 'lucide-react';

export default function Home() {
  const currentEventStories = getCurrentEventStories();
  const sponsoredStories    = getSponsoredStories();
  const allStories          = getPermanentStories();

  return (
    <div className="min-h-screen bg-reunion-cream creole-pattern">
      <HeroSection />

      <div id="histoires" className="container mx-auto px-4 py-16">

        {/* Histoires liées à l'actualité */}
        {currentEventStories.length > 0 && (
          <section className="mb-20">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-reunion-lava to-reunion-sun flex items-center justify-center shadow-lava">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-reunion-dark title-underline">
                  Histoires liées à l'actualité
                </h2>
                <p className="font-body text-reunion-dark/60 mt-2 text-sm">
                  Les récits en lien avec les événements du moment
                </p>
              </div>
            </div>
            <HorizontalStoryCarousel stories={currentEventStories} />
          </section>
        )}

        {/* Histoires partenaires */}
        {sponsoredStories.length > 0 && (
          <section className="mb-20">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-reunion-green to-reunion-turquoise flex items-center justify-center shadow-tropical">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-reunion-dark title-underline">
                  Mis en avant par nos partenaires
                </h2>
                <p className="font-body text-reunion-dark/60 mt-2 text-sm">
                  Expériences culturelles et sites exceptionnels à découvrir
                </p>
              </div>
            </div>
            <HorizontalStoryCarousel stories={sponsoredStories} sponsored />
          </section>
        )}

        {/* Toutes les histoires */}
        <section>
          <div className="flex items-start gap-4 mb-10">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-reunion-dark to-reunion-dark-mid flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-reunion-sun" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-reunion-dark title-underline">
                Tout' zistoir' à dékouvrir
              </h2>
              <p className="font-body text-reunion-dark/60 mt-2 text-sm">
                Explorez le patrimoine culturel et historique de La Réunion
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStories.map((story) => (
              <StoryCard key={story.slug} story={story} sponsored={story.isSponsored} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import HeroSection from '../components/HeroSection';
import HorizontalStoryCarousel from '../components/HorizontalStoryCarousel';
import StoryCard from '../components/StoryCard';
import { getCurrentEventStories, getSponsoredStories, getPermanentStories } from '../data/stories';
import { Calendar, Star, BookOpen } from 'lucide-react';

export default function Home() {
  const currentEventStories = getCurrentEventStories();
  const sponsoredStories = getSponsoredStories();
  const allStories = getPermanentStories();

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />

      <div id="histoires" className="container mx-auto px-4 py-16">
        {currentEventStories.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Histoires liées à l'actualité réunionnaise
                </h2>
                <p className="text-slate-600 mt-1">
                  Découvrez les récits en lien avec les événements du moment
                </p>
              </div>
            </div>
            <HorizontalStoryCarousel stories={currentEventStories} />
          </section>
        )}

        {sponsoredStories.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Histoires mises en avant par nos partenaires
                </h2>
                <p className="text-slate-600 mt-1">
                  Expériences culturelles et sites exceptionnels à découvrir
                </p>
              </div>
            </div>
            <HorizontalStoryCarousel stories={sponsoredStories} sponsored />
          </section>
        )}

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-3 rounded-xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Toutes les histoires à découvrir
              </h2>
              <p className="text-slate-600 mt-1">
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

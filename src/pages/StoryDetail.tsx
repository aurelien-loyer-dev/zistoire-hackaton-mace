import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PartnerCTAButton from '../components/PartnerCTAButton';
import StorySlider from '../components/StorySlider';
import { getStoryBySlug } from '../data/stories';

// Couleurs et emojis par catégorie
const categoryMeta: Record<string, { gradient: string; emoji: string }> = {
  'Personnalités':        { gradient: 'from-reunion-lava to-reunion-sun',        emoji: '🧑‍🌾' },
  'Lieux':                 { gradient: 'from-reunion-green to-reunion-turquoise',  emoji: '🌋' },
  'Nature':                { gradient: 'from-reunion-turquoise to-reunion-green',  emoji: '🌿' },
  'Sport & Culture':       { gradient: 'from-reunion-sun to-reunion-lava',         emoji: '🏅' },
  'Culture & Patrimoine':  { gradient: 'from-reunion-dark to-reunion-green',       emoji: '🏛️' },
};

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? getStoryBySlug(slug) : null;

  if (!story) return <Navigate to="/" replace />;

  const meta = categoryMeta[story.category] ?? { gradient: 'from-reunion-lava to-reunion-sun', emoji: '🌴' };

  return (
    <div className="min-h-screen bg-reunion-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Hero image */}
        <div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-card-hover">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          {/* Dégradé fort en bas */}
          <div className="absolute inset-0 bg-gradient-to-t from-reunion-dark/90 via-reunion-dark/40 to-transparent" />

          {/* Bande couleur en bas */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-reunion-lava via-reunion-sun to-reunion-turquoise" />

          {/* Contenu */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${meta.gradient} text-white font-body text-sm font-bold px-4 py-2 rounded-full shadow`}>
                <span>{meta.emoji}</span>
                {story.category}
              </span>
              {story.isCurrentEvent && (
                <span className="bg-reunion-sun text-reunion-dark font-body text-xs font-bold px-3 py-1 rounded-full">
                  🗓️ Actualité
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-3 leading-tight text-shadow">
              {story.title}
            </h1>
            <p className="font-body text-lg text-white/80 max-w-3xl leading-relaxed text-shadow-sm">
              {story.subtitle}
            </p>
          </div>
        </div>

        {/* CTA Partenaire */}
        {story.partnerUrl && story.partnerName && (
          <div className="flex justify-center mb-14">
            <PartnerCTAButton url={story.partnerUrl} partnerName={story.partnerName} />
          </div>
        )}

        {/* Slider */}
        <div className="max-w-4xl mx-auto mb-14">
          <StorySlider slides={story.storySlides} />
        </div>

        {/* Texte complet */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-card">
            {/* En-tête avec dégradé */}
            <div className={`bg-gradient-to-r ${meta.gradient} p-8 md:p-10`}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                {meta.emoji} L’histoire complète
              </h2>
            </div>
            {/* Corps */}
            <div className="p-8 md:p-12">
              <p className="font-body text-reunion-dark/80 leading-relaxed text-lg whitespace-pre-line">
                {story.fullText}
              </p>
            </div>
          </div>
        </div>

        {/* Espacement bas */}
        <div className="h-16" />
      </div>
    </div>
  );
}

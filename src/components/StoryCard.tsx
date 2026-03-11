import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Story } from '../data/stories';

interface StoryCardProps {
  story: Story;
  sponsored?: boolean;
}

export default function StoryCard({ story, sponsored }: StoryCardProps) {
  // Couleur par catégorie
  const categoryColor: Record<string, string> = {
    'Personnalités':       'bg-reunion-lava text-white',
    'Lieux':               'bg-reunion-green text-white',
    'Nature':              'bg-reunion-turquoise text-white',
    'Sport & Culture':     'bg-reunion-sun text-reunion-dark',
    'Culture & Patrimoine':'bg-reunion-dark-mid text-white',
  };
  const catStyle = categoryColor[story.category] ?? 'bg-reunion-lava text-white';

  return (
    <Link
      to={`/histoires/${story.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`font-body text-xs font-bold px-3 py-1 rounded-full ${catStyle}`}>
            {story.category}
          </span>
          {sponsored && (
            <span className="font-body bg-reunion-sun text-reunion-dark text-xs px-3 py-1 rounded-full font-bold shadow">
              ⭐ Partenaire
            </span>
          )}
        </div>
      </div>

      {/* Corps */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-reunion-dark mb-2 group-hover:text-reunion-lava transition-colors leading-tight">
          {story.title}
        </h3>
        <p className="font-body text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {story.shortDescription}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="font-body flex items-center gap-1 text-reunion-lava font-bold text-sm group-hover:gap-2 transition-all">
            Lir' l'histoir'
            <ArrowRight className="w-4 h-4" />
          </span>
          {/* Trait créole */}
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-reunion-lava to-reunion-sun" />
        </div>
      </div>
    </Link>
  );
}

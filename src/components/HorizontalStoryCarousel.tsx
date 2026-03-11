import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Story } from '../data/stories';

interface HorizontalStoryCarouselProps {
  stories: Story[];
  sponsored?: boolean;
}

export default function HorizontalStoryCarousel({ stories, sponsored }: HorizontalStoryCarouselProps) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-2 px-2">
      {stories.map((story) => (
        <Link
          key={story.slug}
          to={`/histoires/${story.slug}`}
          className="group flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 snap-start"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-reunion-dark/80 via-black/30 to-transparent" />

            {/* Titre sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-xs font-bold text-reunion-sun uppercase tracking-widest">
                  {story.category}
                </span>
                {sponsored && (
                  <span className="font-body bg-reunion-sun text-reunion-dark text-xs px-2 py-0.5 rounded-full font-bold">
                    ⭐ Mis en avant
                  </span>
                )}
              </div>
              <h3 className="font-display text-white font-bold text-base leading-snug">{story.title}</h3>
            </div>
          </div>

          {/* Corps */}
          <div className="p-4">
            <p className="font-body text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
              {story.shortDescription}
            </p>
            <div className="flex items-center gap-1 text-reunion-lava font-body font-bold text-sm group-hover:gap-2 transition-all">
              <span>Dékouvr'</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

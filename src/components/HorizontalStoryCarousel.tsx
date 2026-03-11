import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Story } from '../data/stories';

interface HorizontalStoryCarouselProps {
  stories: Story[];
  sponsored?: boolean;
}

export default function HorizontalStoryCarousel({ stories, sponsored }: HorizontalStoryCarouselProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
      {stories.map((story) => (
        <Link
          key={story.slug}
          to={`/histoires/${story.slug}`}
          className="group flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 snap-start"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  {story.category}
                </span>
                {sponsored && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    Mis en avant
                  </span>
                )}
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{story.title}</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {story.shortDescription}
            </p>
            <div className="flex items-center text-orange-600 font-semibold text-sm">
              <span>Découvrir</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

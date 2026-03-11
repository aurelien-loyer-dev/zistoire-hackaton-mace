import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Story } from '../data/stories';

interface StoryCardProps {
  story: Story;
  sponsored?: boolean;
}

export default function StoryCard({ story, sponsored }: StoryCardProps) {
  return (
    <Link
      to={`/histoires/${story.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              {story.category}
            </span>
            {sponsored && (
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Partenaire
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
          {story.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {story.shortDescription}
        </p>
        <div className="flex items-center text-orange-600 font-semibold text-sm">
          <span>Découvrir l'histoire</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

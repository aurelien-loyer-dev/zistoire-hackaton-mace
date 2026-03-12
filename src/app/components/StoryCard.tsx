import { motion } from "motion/react";
import { Link } from "react-router";
import { SponsoredBadge } from "./SponsoredBadge";
import type { Story } from "../data/stories";

interface StoryCardProps {
  story: Story;
  index?: number;
}

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  return (
    <Link to={`/histoires/${story.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Badge */}
          {story.isSponsored && (
            <div className="absolute top-4 right-4">
              <SponsoredBadge />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2">
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: "rgba(255, 255, 255, 0.2)", fontWeight: "500" }}
            >
              {story.category}
            </span>
          </div>
          <h3 className="text-2xl mb-2" style={{ fontWeight: "600" }}>
            {story.title}
          </h3>
          <p className="text-sm opacity-90 line-clamp-2">{story.shortDescription}</p>
        </div>
      </motion.div>
    </Link>
  );
}

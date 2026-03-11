import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PartnerCTAButton from '../components/PartnerCTAButton';
import StorySlider from '../components/StorySlider';
import { getStoryBySlug } from '../data/stories';

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? getStoryBySlug(slug) : null;

  if (!story) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="inline-block bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {story.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {story.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl leading-relaxed">
              {story.subtitle}
            </p>
          </div>
        </div>

        {story.partnerUrl && story.partnerName && (
          <div className="flex justify-center mb-16">
            <PartnerCTAButton url={story.partnerUrl} partnerName={story.partnerName} />
          </div>
        )}

        <div className="max-w-4xl mx-auto mb-16">
          <StorySlider slides={story.storySlides} />
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-4 border-orange-500 inline-block pb-2">
            L'histoire complète
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
              {story.fullText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

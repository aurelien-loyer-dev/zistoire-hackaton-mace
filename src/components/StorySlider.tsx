import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StorySliderProps {
  slides: string[];
}

export default function StorySlider({ slides }: StorySliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1));
  const goToNext    = () => setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-card">
      {/* Bande de couleur en haut */}
      <div className="h-1.5 bg-gradient-to-r from-reunion-lava via-reunion-sun to-reunion-turquoise" />

      <div className="p-8 md:p-12">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-reunion-dark">
            En savoir plus
          </h2>
          <div className="flex items-center gap-2 bg-reunion-sand rounded-full px-4 py-2">
            <span className="font-body text-sm font-bold text-reunion-dark">
              {currentSlide + 1}
            </span>
            <span className="text-reunion-dark/30">/</span>
            <span className="font-body text-sm text-reunion-dark/60">
              {slides.length}
            </span>
          </div>
        </div>

        {/* Contenu slide */}
        <div className="relative min-h-[140px] md:min-h-[100px] mb-8">
          {/* Guillemet décoratif */}
          <span className="absolute -top-2 -left-2 text-6xl font-display text-reunion-turquoise/20 leading-none select-none">“</span>
          <p className="font-body text-lg text-reunion-dark/80 leading-relaxed pl-6">
            {slides[currentSlide]}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentSlide === 0}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-reunion-sand-dark hover:border-reunion-lava hover:bg-reunion-lava hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Points de navigation */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-8 h-3 bg-gradient-to-r from-reunion-lava to-reunion-sun'
                    : 'w-3 h-3 bg-reunion-sand-dark hover:bg-reunion-turquoise'
                }`}
                aria-label={`Aller au slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-reunion-sand-dark hover:border-reunion-lava hover:bg-reunion-lava hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

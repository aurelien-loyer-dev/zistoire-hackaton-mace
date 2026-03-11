import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StorySliderProps {
  slides: string[];
}

export default function StorySlider({ slides }: StorySliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">En savoir plus</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-600">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg text-slate-700 leading-relaxed min-h-[120px] md:min-h-[80px]">
          {slides[currentSlide]}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goToPrevious}
          disabled={currentSlide === 0}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-orange-600" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-600 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
          aria-label="Slide suivant"
        >
          <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-orange-600" />
        </button>
      </div>
    </div>
  );
}

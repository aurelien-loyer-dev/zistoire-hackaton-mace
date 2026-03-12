import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StorySliderProps {
  slides: string[];
}

export function StorySlider({ slides }: StorySliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-card rounded-2xl shadow-lg p-8 md:p-12 min-h-[300px] flex flex-col transition-colors duration-300">
        {/* Slide Content */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg md:text-xl leading-relaxed text-center"
              style={{ color: "var(--foreground)" }}
            >
              {slides[currentSlide]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            style={{
              background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
              color: "white",
            }}
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: index === currentSlide ? "var(--ocean-blue)" : "var(--muted)",
                  width: index === currentSlide ? "24px" : "8px",
                }}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            style={{
              background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
              color: "white",
            }}
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const handleScroll = () => {
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="public/images/bc-hotel.jpg"
          alt="La Réunion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{ fontWeight: "700" }}
          >
            Découvrez La Réunion à travers ses histoires
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ fontWeight: "300" }}
          >
            Explorez les récits historiques et culturels qui font l'âme de notre île intense
          </motion.p>
        </div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1, duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
        whileHover={{ scale: 1.3, color: "#ffffff" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 cursor-pointer"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown className="w-12 h-12" strokeWidth={1.2} />
      </motion.button>
    </section>
  );
}

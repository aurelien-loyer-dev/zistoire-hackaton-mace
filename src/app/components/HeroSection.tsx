import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1772984752279-0fe1af354f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVuaW9uJTIwaXNsYW5kJTIwdHJvcGljYWwlMjBsYW5kc2NhcGUlMjBvY2VhbnxlbnwxfHx8fDE3NzMyOTM5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            style={{ fontWeight: "300" }}
          >
            Explorez les récits historiques et culturels qui font l'âme de notre île intense
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="#stories"
            className="inline-block px-8 py-4 rounded-full text-lg transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
              color: "white",
              fontWeight: "500",
            }}
          >
            Découvrir les histoires
          </motion.a>
        </div>
      </div>
    </section>
  );
}

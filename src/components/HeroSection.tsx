export default function HeroSection() {
  return (
    <section className="relative h-[480px] md:h-[600px] overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="La Réunion"
          className="w-full h-full object-cover scale-105"
        />
        {/* Dégradé tropical multicouche */}
        <div className="absolute inset-0 bg-gradient-to-br from-reunion-dark/85 via-reunion-dark/60 to-reunion-green/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-reunion-dark/70 via-transparent to-transparent" />
      </div>

      {/* Motif décoratif créole overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 10% 20%, #009fb7 0%, transparent 40%), radial-gradient(ellipse at 90% 80%, #1a5c38 0%, transparent 40%)',
        }}
      />

      {/* Contenu */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up">
          {/* Badge créole */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-body font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            <span>🌴</span> Patrimoine de La Réunion
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight text-shadow">
            Tout' Zistoir'
            <span className="block text-reunion-sun italic font-bold">Réyoné</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Explorez les récits fascinants qui ont façonné notre île : personnalités emblématiques,
            lieux mythiques, traditions créoles et patrimoine exceptionnel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#histoires"
              className="font-body inline-flex items-center gap-2 bg-gradient-to-r from-reunion-lava to-reunion-sun hover:from-reunion-lava-light hover:to-reunion-sun text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lava text-lg"
            >
              <span>Commencer l'exploration</span>
              <span>→</span>
            </a>
            <a
              href="#histoires"
              className="font-body inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#fdf8f2"/>
        </svg>
      </div>
    </section>
  );
}

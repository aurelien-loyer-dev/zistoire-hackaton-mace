export default function Footer() {
  return (
    <footer className="bg-reunion-dark text-white mt-0 relative overflow-hidden">
      {/* Vague décorative en haut */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 5C120 10 240 20 360 22C480 24 600 20 720 16C840 12 960 8 1080 10C1200 12 1320 22 1380 27L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="#fdf8f2"/>
        </svg>
      </div>

      {/* Bande couleur créole */}
      <div className="h-1 bg-gradient-to-r from-reunion-lava via-reunion-sun to-reunion-turquoise" />

      <div className="container mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-reunion-lava to-reunion-sun flex items-center justify-center text-2xl">
                🌋
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">Zistoire</h3>
                <p className="text-reunion-turquoise-light text-xs tracking-widest uppercase font-body">Histoir' Réyoné</p>
              </div>
            </div>
            <p className="text-reunion-sand-dark/70 font-body text-sm leading-relaxed">
              Découvrez l'histoire fascinante de La Réunion à travers des récits immersifs
              et des expériences culturelles uniques.
            </p>
          </div>

          {/* À propos */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4 text-reunion-sun">À propos</h4>
            <p className="text-reunion-sand-dark/70 font-body text-sm leading-relaxed">
              Zistoire est une initiative culturelle qui met en lumière le patrimoine
              exceptionnel de La Réunion à travers des histoires interactives accessibles
              depuis l'hôtel.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4 text-reunion-sun">Kontakt</h4>
            <p className="text-reunion-sand-dark/70 font-body text-sm leading-relaxed">
              Pour toute question sur les histoires ou les partenariats, n'hésitez pas
              à nous contacter à la réception de l'hôtel.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-2xl">🌴</span>
              <span className="text-2xl">🌊</span>
              <span className="text-2xl">🌺</span>
            </div>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-reunion-sand-dark/50 text-sm">
            &copy; {new Date().getFullYear()} Zistoire — Tout' zistoir' Réyoné
          </p>
          <p className="font-body text-reunion-sand-dark/40 text-xs">
            🌋 Made with ❤️ à La Réunion
          </p>
        </div>
      </div>
    </footer>
  );
}

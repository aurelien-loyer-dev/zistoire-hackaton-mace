import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-xl">
      {/* Bande couleur créole en haut */}
      <div className="h-1 bg-gradient-to-r from-reunion-lava via-reunion-sun to-reunion-turquoise" />
      <div className="bg-reunion-dark text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            {/* Logo volcanique */}
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reunion-lava to-reunion-sun opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center w-full h-full text-2xl">🌋</span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wide leading-none">
                Zistoir
              </h1>
              <p className="text-xs font-body text-reunion-turquoise-light tracking-widest uppercase">
                Découvrir l'histoire de La Réunion
              </p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 font-body text-sm font-semibold">
            <Link
              to="/"
              className="text-reunion-sand-dark hover:text-reunion-sun transition-colors tracking-wide"
            >
              Accueil
            </Link>
            <a
              href="#histoires"
              className="bg-reunion-lava hover:bg-reunion-lava-light text-white px-5 py-2 rounded-full transition-all duration-200 tracking-wide"
            >
              Explorer
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

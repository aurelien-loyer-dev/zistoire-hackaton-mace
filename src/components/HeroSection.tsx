export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="La Réunion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Découvrez La Réunion à travers ses histoires
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
            Explorez les récits fascinants qui ont façonné notre île : personnalités emblématiques,
            lieux mythiques, traditions vivantes et patrimoine culturel exceptionnel
          </p>
          <a
            href="#histoires"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Commencer l'exploration
          </a>
        </div>
      </div>
    </section>
  );
}

import { Mountain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="w-8 h-8 text-orange-500" />
              <h3 className="text-xl font-bold">Zistoire</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Découvrez l'histoire fascinante de La Réunion à travers des récits immersifs
              et des expériences culturelles uniques.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">À propos</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Zistoire est une initiative culturelle qui met en lumière le patrimoine
              exceptionnel de La Réunion à travers des histoires interactives accessibles
              depuis l'hôtel.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-slate-300 text-sm">
              Pour toute question sur les histoires ou les partenariats, n'hésitez pas
              à nous contacter à la réception de l'hôtel.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Zistoire. Une expérience culturelle réunionnaise.</p>
        </div>
      </div>
    </footer>
  );
}

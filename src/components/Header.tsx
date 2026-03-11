import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Mountain className="w-8 h-8 text-orange-500" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Zistoire</h1>
            <p className="text-sm text-slate-300">Découvrez La Réunion</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600 font-semibold transition-colors group"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>Retour à l'accueil</span>
    </Link>
  );
}

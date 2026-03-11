import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 font-body font-semibold text-reunion-dark/70 hover:text-reunion-lava transition-colors group"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-reunion-sand-dark group-hover:border-reunion-lava group-hover:bg-reunion-lava group-hover:text-white transition-all duration-200">
        <ArrowLeft className="w-4 h-4" />
      </span>
      <span>Retour</span>
    </Link>
  );
}

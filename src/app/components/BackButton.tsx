import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function BackButton() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-current transition-all hover:opacity-80 hover:scale-105"
      style={{ color: "var(--terracotta)", fontWeight: "500" }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Retour à l'accueil</span>
    </Link>
  );
}

import { Sparkles } from "lucide-react";

export function SponsoredBadge() {
  return (
    <div
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs"
      style={{
        background: "linear-gradient(135deg, var(--volcano-orange) 0%, var(--coral-red) 100%)",
        color: "white",
        fontWeight: "500",
      }}
    >
      <Sparkles className="w-3 h-3" />
      <span>Partenaire</span>
    </div>
  );
}

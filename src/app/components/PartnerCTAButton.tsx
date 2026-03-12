import { ExternalLink } from "lucide-react";

interface PartnerCTAButtonProps {
  partnerName: string;
  partnerUrl: string;
}

export function PartnerCTAButton({ partnerName, partnerUrl }: PartnerCTAButtonProps) {
  return (
    <a
      href={partnerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
      style={{
        background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
        color: "white",
        fontWeight: "500",
      }}
    >
      <span>Découvrir {partnerName}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}

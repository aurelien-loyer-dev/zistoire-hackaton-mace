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
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all hover:opacity-90 hover:scale-105"
      style={{
        background: "var(--terracotta)",
        color: "white",
        fontWeight: "500",
        letterSpacing: "0.04em",
      }}
    >
      <span>Découvrir {partnerName}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}

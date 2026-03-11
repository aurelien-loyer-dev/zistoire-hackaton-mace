import { ExternalLink } from 'lucide-react';

interface PartnerCTAButtonProps {
  url: string;
  partnerName: string;
}

export default function PartnerCTAButton({ url, partnerName }: PartnerCTAButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      <span>Découvrir l'expérience avec {partnerName}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}

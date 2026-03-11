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
      className="inline-flex items-center gap-3 bg-gradient-to-r from-reunion-green to-reunion-turquoise hover:from-reunion-green-light hover:to-reunion-turquoise-light text-white font-body font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-tropical"
    >
      <span className="text-lg">🌴</span>
      <span>Dékouvr' l'expérience avék {partnerName}</span>
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}

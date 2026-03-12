export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  isCurrentEvent: boolean;
  isSponsored: boolean;
  partnerName?: string;
  partnerUrl?: string;
  shortDescription: string;
  storySlides: string[];
  fullText: string;
  intro?: string;
}


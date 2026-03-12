import { useParams } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";
import { PartnerCTAButton } from "../components/PartnerCTAButton";
import { StorySlider } from "../components/StorySlider";
import { Footer } from "../components/Footer";
import { useStory } from "../../hooks/useStories";

export function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { story, loading, error } = useStory(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl mb-4">Histoire non trouvée</h1>
          <BackButton />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>

        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-4xl"
            >
              <div className="mb-4">
                <span
                  className="text-sm px-4 py-2 rounded-full"
                  style={{ background: "rgba(255, 255, 255, 0.2)", fontWeight: "500" }}
                >
                  {story.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl mb-4" style={{ fontWeight: "700" }}>
                {story.title}
              </h1>
              <p className="text-2xl" style={{ fontWeight: "300" }}>
                {story.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      {story.partnerName && story.partnerUrl && (
        <section className="container mx-auto px-4 mb-16 text-center">
          <PartnerCTAButton partnerName={story.partnerName} partnerUrl={story.partnerUrl} />
        </section>
      )}

      {/* Story Slider Section */}
      {story.storySlides.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl mb-8 text-center" style={{ fontWeight: "600" }}>
              En savoir plus
            </h2>
            <StorySlider slides={story.storySlides} />
          </motion.div>
        </section>
      )}

      {/* Full Text Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl mb-6" style={{ fontWeight: "600" }}>
              L'histoire complète
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed" style={{ color: "var(--foreground)" }}>
                {story.fullText}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Back to Home */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <BackButton />
      </section>

      <Footer />
    </div>
  );
}

import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";
import { Footer } from "../components/Footer";

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl mb-4" style={{ fontWeight: "700", color: "var(--ocean-blue)" }}>
            404
          </h1>
          <h2 className="text-3xl mb-6">Page non trouvée</h2>
          <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
            Désolé, la page que vous recherchez n'existe pas.
          </p>
          <BackButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 py-12 transition-colors duration-300" style={{ background: "var(--sand-beige)" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-24" />
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Découvrez l'histoire de La Réunion
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <p>© 2026 Zistoir' - Tous droits réservés</p>
            <p>Une expérience immersive de l'histoire réunionnaise</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

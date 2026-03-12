import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="w-full border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="large" />
        </div>
        <p className="text-sm hidden sm:block" style={{ color: "var(--muted-foreground)" }}>
          Découvrez l'histoire de La Réunion
        </p>
      </div>
    </header>
  );
}

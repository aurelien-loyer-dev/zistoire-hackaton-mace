export function Header() {
  return (
    <header className="w-full border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo2.png" alt="Logo" className="h-24 mr-4 mix-blend-multiply" />
        </div>
      </div>
    </header>
  );
}

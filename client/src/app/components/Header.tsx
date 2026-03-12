import { useEffect, useState } from "react";

export function Header() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Fade in over the first 120px of scroll
      const p = Math.min(window.scrollY / 120, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="w-full fixed top-0 z-50"
      style={{
        background: `rgba(255,255,255,${0.88 * progress})`,
        backdropFilter: `blur(${8 * progress}px)`,
        borderBottom: progress > 0.5 ? `1px solid rgba(0,0,0,${0.08 * progress})` : "none",
        opacity: progress,
        pointerEvents: progress > 0.05 ? "auto" : "none",
        transition: "border-bottom 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <img
          src="/images/logo2.png"
          alt="Logo"
          className="mix-blend-multiply"
          style={{ height: `${5 + 1.5 * (1 - progress)}rem`, transition: "height 0.3s ease" }}
        />
      </div>
    </header>
  );
}

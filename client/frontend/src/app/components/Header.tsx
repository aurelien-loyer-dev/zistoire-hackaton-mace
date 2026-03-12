import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export function Header() {
  const [progress, setProgress] = useState(0);
  const { darkMode, toggle } = useTheme();

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
        background: darkMode
          ? `rgba(15,15,23,${0.92 * progress})`
          : `rgba(255,255,255,${0.88 * progress})`,
        backdropFilter: `blur(${8 * progress}px)`,
        borderBottom: progress > 0.5
          ? `1px solid ${darkMode ? `rgba(42,42,58,${progress})` : `rgba(0,0,0,${0.08 * progress})`}`
          : "none",
        opacity: progress,
        pointerEvents: progress > 0.05 ? "auto" : "none",
        transition: "border-bottom 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="w-10" />
        <img
          src="/images/logo2.png"
          alt="Logo"
          className={darkMode ? "mix-blend-screen" : "mix-blend-multiply"}
          style={{ height: `${5 + 1.5 * (1 - progress)}rem`, transition: "height 0.3s ease" }}
        />
        <button
          onClick={toggle}
          aria-label={darkMode ? "Mode clair" : "Mode sombre"}
          title={darkMode ? "Mode clair" : "Mode sombre"}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            border: `1.5px solid ${darkMode ? "rgba(42,42,58,0.8)" : "rgba(0,0,0,0.1)"}`,
            background: darkMode ? "rgba(34,34,50,0.6)" : "rgba(255,255,255,0.6)",
            color: darkMode ? "#8888a0" : "var(--muted-foreground)",
          }}
        >
          {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
}

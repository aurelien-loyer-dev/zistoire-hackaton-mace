interface LogoProps {
  variant?: "small" | "large";
  className?: string;
}

export function Logo({ variant = "large", className = "" }: LogoProps) {
  if (variant === "small") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <span
          className="text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Z
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="text-4xl font-bold"
        style={{
          background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--tropical-green) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Zistoir
      </span>
    </div>
  );
}

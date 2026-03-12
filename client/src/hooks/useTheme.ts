import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "zistoir-dark";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, String(darkMode));
  }, [darkMode]);

  const toggle = useCallback(() => setDarkMode((d) => !d), []);

  return { darkMode, toggle } as const;
}

import { useState, useEffect } from "react";
import type { Story } from "../app/data/stories";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/stories`)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les histoires");
        return res.json();
      })
      .then((data: Story[]) => setStories(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stories, loading, error };
}

export function useStory(slug: string | undefined) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_URL}/api/stories/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Histoire non trouvée");
        return res.json();
      })
      .then((data: Story) => setStory(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { story, loading, error };
}

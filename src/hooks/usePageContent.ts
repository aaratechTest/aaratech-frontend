import { useState, useEffect } from "react";
import { getContent } from "../services/contentService";
import { defaultContent } from "../constants/defaultContent";

export function usePageContent(slug: string) {
  const [content, setContent] = useState<Record<string, any>>(
    defaultContent[slug]?.sections || {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      try {
        setLoading(true);
        const data = await getContent(slug);
        if (!cancelled) {
          setContent(data.sections as Record<string, any>);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          // Use defaults on error
          setContent(defaultContent[slug]?.sections || {});
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { content, loading, error };
}

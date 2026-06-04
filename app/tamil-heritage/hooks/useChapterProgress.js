"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHAPTER_IDS = [
  "chapter-1",
  "chapter-2",
  "chapter-3",
  "chapter-4",
  "chapter-5",
  "chapter-6",
];

/**
 * Tracks which chapter the user is currently viewing and overall scroll progress.
 * Returns: { currentChapter (0-5), totalProgress (0-1), chapterRefs (callback ref setter) }
 */
export function useChapterProgress() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    // Track overall scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setTotalProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track current chapter via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = CHAPTER_IDS.indexOf(entry.target.id);
            if (idx !== -1) setCurrentChapter(idx);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    observerRef.current = observer;

    // Observe all chapter elements
    CHAPTER_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToChapter = useCallback((index) => {
    const el = document.getElementById(CHAPTER_IDS[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return {
    currentChapter,
    totalProgress,
    chapterCount: CHAPTER_IDS.length,
    scrollToChapter,
    chapterIds: CHAPTER_IDS,
  };
}

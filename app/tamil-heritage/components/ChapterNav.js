"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAPTER_LABELS = [
  "The Lost Civilization",
  "Olai Suvadi",
  "Thanjavur Temple",
  "Knowledge Vault",
  "Blockchain",
  "Digital Museum",
];

/**
 * Floating chapter navigation component.
 * Shows dots on the right (desktop) or bottom (mobile).
 * Labels appear on hover on desktop.
 */
export default function ChapterNav({ currentChapter, scrollToChapter, chapterCount }) {
  return (
    <nav
      className="fixed z-30 flex gap-3 transition-opacity"
      style={{
        // Mobile: bottom center
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "row",
      }}
      aria-label="Chapter navigation"
    >
      {Array.from({ length: chapterCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToChapter(i)}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 relative ${
            i === currentChapter
              ? "border-yellow-400 bg-yellow-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
              : "border-white/30 bg-transparent hover:border-yellow-300 hover:scale-125"
          }`}
          aria-label={`Go to ${CHAPTER_LABELS[i] || `Chapter ${i + 1}`}`}
          title={CHAPTER_LABELS[i]}
        />
      ))}
    </nav>
  );
}

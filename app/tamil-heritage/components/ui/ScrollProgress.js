"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Chapter-aware scroll progress bar + floating chapter navigation dots.
 */
export default function ScrollProgress({ totalProgress, currentChapter, chapterCount, scrollToChapter }) {
  const chapterLabels = [
    "The Lost Civilization",
    "Olai Suvadi",
    "Thanjavur Temple",
    "Knowledge Vault",
    "Blockchain",
    "Digital Museum",
  ];

  return (
    <>
      {/* Progress Bar */}
      <div
        className="th-progress-bar"
        style={{ transform: `scaleX(${totalProgress})` }}
      />

      {/* Chapter Navigation Dots */}
      <nav className="th-chapter-nav" aria-label="Chapter navigation">
        {Array.from({ length: chapterCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToChapter(i)}
            className={`th-chapter-dot ${i === currentChapter ? "active" : ""}`}
            aria-label={`Go to ${chapterLabels[i] || `Chapter ${i + 1}`}`}
            title={chapterLabels[i]}
          >
            {/* Tooltip on desktop — only for active */}
            {i === currentChapter && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-yellow-400/80 tracking-wider uppercase"
              >
                {chapterLabels[i]}
              </motion.span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
}

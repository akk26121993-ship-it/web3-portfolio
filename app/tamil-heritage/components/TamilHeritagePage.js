"use client";

import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import "../styles/tamil-heritage.css";

import { useDeviceCapability } from "../hooks/useDeviceCapability";
import { useChapterProgress } from "../hooks/useChapterProgress";

import ScrollProgress from "./ui/ScrollProgress";
import ChapterNav from "./ChapterNav";
import Chapter1Hero from "./Chapter1Hero";
import Chapter2OlaiSuvadi from "./Chapter2OlaiSuvadi";
import Chapter3Temple from "./Chapter3Temple";
import Chapter4Vault from "./Chapter4Vault";
import Chapter5Blockchain from "./Chapter5Blockchain";
import Chapter6Museum from "./Chapter6Museum";

// Register GSAP plugin on client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Performance: Reduced motion check
const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export default function TamilHeritagePage() {
  const { tier: deviceTier } = useDeviceCapability();
  const { currentChapter, totalProgress, chapterCount, scrollToChapter } = useChapterProgress();
  const [isMounted, setIsMounted] = useState(false);

  // Performance: Hydration fix - prevent layout shift
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Cleanup GSAP ScrollTrigger instances on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Anti-gravity cinematic feel: Global parallax and fog effects
  const { scrollY } = useScroll();
  const fogY = useTransform(scrollY, [0, 1000], [0, 100]);
  const fogOpacity = useTransform(scrollY, [0, 500], [0, 0.3]);

  // Performance: Disable heavy animations on reduced motion or low-tier devices
  const shouldReduceMotion = prefersReducedMotion() || deviceTier === "low";

  if (!isMounted) {
    return (
      <div className="th-root relative min-h-screen bg-[#050508]">
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        duration: shouldReduceMotion ? 0.8 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: !shouldReduceMotion,
      }}
    >
      <div className="th-root relative">
        {/* Anti-gravity cinematic feel: Volumetric fog overlay */}
        {!shouldReduceMotion && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              y: fogY,
              opacity: fogOpacity,
              background: "radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.02) 0%, transparent 50%)",
            }}
          />
        )}

        {/* Progress bar */}
        <div
          className="th-progress-bar"
          style={{ transform: `scaleX(${totalProgress})` }}
        />

        {/* Navigation — Back to Portfolio */}
        <nav className="fixed top-6 left-6 z-50">
          <Link href="/">
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-yellow-400">←</span>
              <span className="text-sm font-medium">Back to Portfolio</span>
            </motion.div>
          </Link>
        </nav>

        {/* Chapter navigation dots */}
        <ChapterNav
          currentChapter={currentChapter}
          scrollToChapter={scrollToChapter}
          chapterCount={chapterCount}
        />

        {/* ── Chapter 1: The Lost Civilization ── */}
        <Chapter1Hero deviceTier={deviceTier} />

        {/* ── Chapter 2: Olai Suvadi ── */}
        <Chapter2OlaiSuvadi />

        {/* ── Chapter 3: Thanjavur Temple ── */}
        <Chapter3Temple deviceTier={deviceTier} />

        {/* ── Chapter 4: Ancient Knowledge Vault ── */}
        <Chapter4Vault />

        {/* ── Chapter 5: The Blockchain Transformation ── */}
        <Chapter5Blockchain />

        {/* ── Chapter 6: Digital Museum ── */}
        <Chapter6Museum />
      </div>
    </ReactLenis>
  );
}

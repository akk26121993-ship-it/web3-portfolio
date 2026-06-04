"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ============================================================
   CHAPTER 3: THE STONE THAT DEFEATED TIME
   Complete cinematic scrollytelling component
   ============================================================ */

export default function Chapter3Temple() {
  return (
    <section id="chapter-3" className="relative bg-black overflow-hidden">
      {/* Persistent Chapter Label - z-30 for navigation */}
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-30 pointer-events-none">
        <span className="text-yellow-500/60 text-[10px] md:text-xs uppercase tracking-[0.3em] bg-black/70 md:bg-black/50 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm border border-yellow-500/20 font-mono">
          Chapter III
        </span>
      </div>

      <Section1_Hero />
      <Section2_Vision />
      <Section3_TempleReveal />
      <Section3_Scale />
      <Section4_Architecture />
      <Section5_Engineering />
      <Section6_Gallery />
      <Section7_Inscriptions />
      <Section8_Blockchain />
      <Section9_Final />
    </section>
  );
}

/* ============================================================
   SECTION 1: HERO — Rajaraja Chola Introduction
   ============================================================ */
function Section1_Hero() {
  return (
    <div className="relative min-h-[100svh] flex items-center justify-center bg-black overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background Sunrise & River Kaveri Atmosphere - z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-amber-900/20 to-yellow-600/10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-yellow-500/20 rounded-full blur-[40px] md:blur-[60px] lg:blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0 z-10 flex items-center justify-center mix-blend-luminosity pointer-events-none"
      >
        <img
          src="/tamil-heritage/rajaraja-chola.png"
          alt="Rajaraja Chola"
          className="h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto object-contain opacity-60 blur-[1px]"
        />
      </motion.div>

      <div className="relative z-20 text-center max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 font-light tracking-wide leading-relaxed mb-6 md:mb-8 lg:mb-12"
        >
          &ldquo;In an age when empires rose and fell,
          <br />
          one vision would outlive them all.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-yellow-500 tracking-widest uppercase font-serif">
            Rajaraja Chola I
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 2: VISION — The Monumental Imagination
   ============================================================ */
function Section2_Vision() {
  return (
    <div className="relative min-h-[100svh] flex items-center justify-center bg-[#050508] overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px md:60px 60px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]">
          <motion.div
            className="absolute inset-0 border border-yellow-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-4 md:inset-6 border border-cyan-500/20 rotate-45" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-500/30" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-yellow-500/30" />
          <motion.div
            className="absolute inset-8 md:inset-12 border border-yellow-300/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      <div className="relative z-20 text-center max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-light tracking-wide leading-relaxed"
        >
          &ldquo;He imagined a monument that would
          <br />
          speak for a thousand years.&rdquo;
        </motion.p>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 3: TEMPLE REVEAL — Cinematic Emergence from Darkness
   FIXED: Removed dead scroll zones, proper timing 0-100% reveal
   ============================================================ */
function Section3_TempleReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Optimized timing: temple appears within first 20% of scroll
  const revealProgress = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.3, 0.7, 1]);
  const sunProgress = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.5, 1]);
  const fogProgress = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [1, 0.6, 0]);
  const zoomProgress = useTransform(scrollYProgress, [0.2, 0.6, 1], [1.2, 1.05, 1]);

  const sunY = useTransform(sunProgress, [0, 1], ["50%", "15%"]);
  const sunOpacity = useTransform(sunProgress, [0, 0.3, 1], [0, 0.7, 0.4]);
  const templeOpacity = useTransform(revealProgress, [0, 0.2, 0.5, 1], [0.1, 0.4, 0.8, 1]);
  const templeY = useTransform(revealProgress, [0, 0.3, 1], ["10%", "5%", "0%"]);
  const vignetteOpacity = useTransform(revealProgress, [0, 0.3, 0.7], [0.9, 0.6, 0.2]);
  const rimLightIntensity = useTransform(revealProgress, [0.2, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[100svh] md:min-h-[120vh] bg-black">
      <div className="sticky top-0 min-h-[100svh] w-full overflow-hidden will-change-transform">
        {/* Layer 1: Deep Space with subtle gradient - z-0 */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black to-black" />

        {/* Layer 2: Rising Sun - appears early - z-10 */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ top: sunY, opacity: sunOpacity }}
        >
          <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-gradient-to-t from-yellow-600 via-orange-500 to-transparent blur-[30px] md:blur-[40px] lg:blur-[50px] opacity-80" />
          <div className="absolute inset-0 w-full h-full rounded-full bg-yellow-400/30 blur-[10px] md:blur-[15px]" />
        </motion.div>

        {/* Layer 3: Atmospheric Fog - dissipates gradually - z-20 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[40vh] md:h-[50vh] lg:h-[60vh] z-20 pointer-events-none"
          style={{ opacity: fogProgress }}
        >
          <div className="w-full h-full bg-gradient-to-t from-amber-900/50 via-yellow-900/30 to-transparent blur-[30px] md:blur-[40px]" />
        </motion.div>

        {/* Layer 4: Temple with Parallax Zoom - silhouette visible early - z-30 */}
        <motion.div
          className="absolute inset-0 z-30 flex items-end justify-center pb-0 md:pb-12"
          style={{
            scale: zoomProgress,
            y: templeY,
            opacity: templeOpacity,
          }}
        >
          <img
            src="/tamil-heritage/temple.png"
            alt="Thanjavur Brihadisvara Temple"
            className="max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] w-auto object-contain"
          />
          {/* Golden rim light around temple */}
          <motion.div
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[70vw] md:w-[80vw] h-[35vh] md:h-[45vh] bg-gradient-to-t from-yellow-500/20 via-amber-500/10 to-transparent blur-[30px] md:blur-[40px] rounded-full pointer-events-none"
            style={{ opacity: rimLightIntensity }}
          />
        </motion.div>

        {/* Layer 5: Foreground Fog - reduced - z-40 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[15vh] md:h-[20vh] z-40 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent"
          style={{ opacity: fogProgress }}
        />

        {/* Layer 6: Cinematic Vignette - reduced - z-50 */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{ opacity: vignetteOpacity }}
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)]" />
        </motion.div>

        {/* Layer 7: Scroll Indicator - fades faster - z-50 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-yellow-500/50 text-[10px] uppercase tracking-[0.3em] mb-2">
            Scroll to reveal
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-yellow-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}

function ScaleBar({ item, i, progress }) {
  const barHeight = useTransform(progress, [0.35, 0.75], ["0%", item.pct]);

  return (
    <motion.div
      className="flex flex-col items-center flex-1"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15 }}
      viewport={{ once: true }}
    >
      <div
        className="relative w-full flex items-end justify-center"
        style={{ height: "25vh" }}
      >
        <motion.div
          className={`w-3 sm:w-4 md:w-6 lg:w-12 rounded-t-sm relative ${
            item.highlight
              ? "bg-gradient-to-t from-yellow-600 to-yellow-400"
              : "bg-white/10"
          }`}
          style={{
            height: barHeight,
          }}
        >
          {item.highlight && (
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-500/20 blur-xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      <span className="text-base sm:text-lg md:text-xl lg:text-3xl mt-2 sm:mt-3 md:mt-4">{item.icon}</span>
      <span
        className={`text-[9px] sm:text-[10px] md:text-xs lg:text-sm mt-1 sm:mt-2 uppercase tracking-wider ${
          item.highlight ? "text-yellow-400" : "text-gray-500"
        }`}
      >
        {item.label}
      </span>
      <span
        className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs ${
          item.highlight ? "text-yellow-500/80" : "text-gray-600"
        }`}
      >
        {item.height}
      </span>
    </motion.div>
  );
}

/* ============================================================
   SECTION 3.5: SCALE OF GREATNESS — Height Comparison
   FIXED: Vertical centering, reduced excessive vh, mobile optimized
   ============================================================ */
function Section3_Scale() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const comparisonOpacity = useTransform(progress, [0.25, 0.45, 0.85], [0, 1, 1]);
  const finalOpacity = useTransform(progress, [0.65, 0.85], [0, 1]);
  const textOpacity = useTransform(progress, [0, 0.15, 0.35, 0.55], [0, 1, 1, 0]);

  const comparisons = [
    { label: "Human", height: "6 ft", pct: "3%", icon: "👤" },
    { label: "Elephant", height: "11 ft", pct: "5%", icon: "🐘" },
    { label: "Gopuram", height: "100 ft", pct: "46%", icon: "⛩️" },
    { label: "Brihadisvara", height: "216 ft", pct: "100%", icon: "🛕", highlight: true },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[100svh] md:min-h-[120vh] bg-black">
      <div className="sticky top-0 min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 lg:px-8 will-change-transform">
        {/* Phase 1: Title - centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            <p className="text-yellow-500/60 text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4">
              Height of the Vimana
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-serif">
              216<span className="text-base md:text-lg lg:text-xl xl:text-2xl align-top ml-1 md:ml-2">ft</span>
            </h2>
            <p className="text-gray-500 mt-2 md:mt-4 text-sm md:text-base lg:text-lg">
              66 meters of stone reaching for the sky
            </p>
          </div>
        </motion.div>

        {/* Phase 2: Comparison Bars - vertically centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: comparisonOpacity }}
        >
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-[35vh] md:h-[40vh] lg:h-[45vh] flex items-end justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-12 px-4 md:px-6 lg:px-8">
            {comparisons.map((item, i) => (
              <ScaleBar key={i} item={item} i={i} progress={progress} />
            ))}
          </div>
        </motion.div>

        {/* Phase 3: Realization - centered */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 md:px-6 lg:px-8 z-10"
          style={{ opacity: finalOpacity }}
        >
          <div className="text-center max-w-4xl md:max-w-5xl mx-auto w-full">
            <p className="text-base md:text-lg lg:text-2xl xl:text-4xl text-white font-light leading-tight font-serif">
              &ldquo;In 1010 CE, this was the{" "}
              <span className="text-yellow-400">tallest stone temple</span> on
              Earth.&rdquo;
            </p>
            <p className="text-gray-500 mt-3 md:mt-4 lg:mt-6 text-xs md:text-sm lg:text-base">
              Built without cranes. Without steel. Without mortar.
            </p>
          </div>
        </motion.div>

        {/* Background Grid - z-0 */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "100% 10%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 4: ARCHITECTURE — Interactive Blueprint Cards
   ============================================================ */
function Section4_Architecture() {
  const cards = [
    {
      title: "Foundation",
      desc: "Massive solid granite base supporting 130,000 tons.",
      detail: "30m × 30m base",
    },
    {
      title: "Sanctum",
      desc: "Garbhagriha housing the colossal Shiva Lingam.",
      detail: "Square plan, 2 storeys",
    },
    {
      title: "Vimana",
      desc: "216-foot tower, built with hollow interlocking tiers.",
      detail: "13 diminishing tiers",
    },
    {
      title: "Kalasam",
      desc: "80-ton monolithic cupola resting perfectly at the peak.",
      detail: "Single granite block",
    },
  ];

  return (
    <div className="relative min-h-[100svh] flex flex-col bg-[#050508] py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center w-full mb-12 md:mb-16 lg:mb-20 z-10 max-w-7xl mx-auto"
      >
        <p className="text-yellow-500/50 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4">
          Structural Analysis
        </p>
        <h3 className="text-xl md:text-3xl lg:text-5xl font-bold text-white tracking-widest font-serif mb-4">
          ARCHITECTURAL MASTERPIECE
        </h3>
        <div className="w-12 md:w-16 lg:w-24 h-px bg-yellow-500/50 mx-auto" />
      </motion.div>

      <div
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 z-10"
        style={{ perspective: "1000px" }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateX: 15, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ rotateX: -5, rotateY: 5, scale: 1.02, z: 50 }}
            className="group relative h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative p-8 md:p-10 bg-black/80 backdrop-blur-md border border-yellow-500/20 h-full flex flex-col justify-center overflow-hidden transition-colors duration-500 group-hover:border-yellow-500/50">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(251,191,36,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(251,191,36,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-yellow-500/40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-yellow-500/40" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-yellow-500/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-yellow-500/40" />
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-yellow-600 to-yellow-300"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                viewport={{ once: true }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 group-hover:bg-yellow-500/20 transition-colors">
                    <span className="text-yellow-400 text-xs font-mono">
                      0{i + 1}
                    </span>
                  </div>
                  <span className="text-[10px] text-yellow-500/40 font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {card.detail}
                  </span>
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-serif group-hover:text-yellow-100 transition-colors">
                  {card.title}
                </h4>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {card.desc}
                </p>
              </div>

              <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConstructionStage({ stage, i, stagesCount, scrollYProgress }) {
  const stageStart = i / stagesCount;
  const stageEnd = (i + 1) / stagesCount;
  const stageProgress = useTransform(
    scrollYProgress,
    [stageStart, stageEnd],
    [0, 1]
  );
  // Sharp fade in/out - no overlap
  const stageOpacity = useTransform(
    stageProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const stageScale = useTransform(
    stageProgress,
    [0, 0.5, 1],
    [0.85, 1, 0.85]
  );
  const stageY = useTransform(
    stageProgress,
    [0, 0.5, 1],
    [20, 0, -20]
  );

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 flex flex-col items-center"
      style={{
        opacity: stageOpacity,
        scale: stageScale,
        y: stageY,
        pointerEvents: "none",
      }}
    >
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-24 rounded-full bg-gradient-to-br ${stage.color} border border-white/10 flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
      >
        {stage.icon}
      </div>
      <h4
        className={`text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-2 ${
          stage.highlight ? "text-yellow-400" : "text-white"
        } font-serif`}
      >
        {stage.label}
      </h4>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md text-center leading-relaxed px-4">
        {stage.desc}
      </p>

      {stage.highlight && (
        <motion.div
          className="mt-4 sm:mt-6 px-3 sm:px-4 py-2 border border-yellow-500/30 rounded-full bg-yellow-500/10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-yellow-400 text-[10px] sm:text-xs uppercase tracking-widest">
            Crowning Achievement
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ============================================================
   SECTION 5: ENGINEERING MIRACLE — Scroll-Driven Construction
   FIXED: Removed overlapping text, proper stage transitions, reduced dead zones
   ============================================================ */
function Section5_Engineering() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stages = [
    {
      label: "The Quarry",
      desc: "Granite extracted from 60km away. Each block: 2-3 tons.",
      icon: "⛏️",
      color: "from-stone-800 to-stone-900",
    },
    {
      label: "Transport",
      desc: "Rolled on wooden logs. 60 kilometers. Decades of movement.",
      icon: "🪵",
      color: "from-amber-900/40 to-stone-900",
    },
    {
      label: "Ramp Construction",
      desc: "An earthen ramp 6km long, rising gradually to 216 feet.",
      icon: "📐",
      color: "from-yellow-900/30 to-stone-900",
    },
    {
      label: "Elevation",
      desc: "Hollow interlocking tiers. Each stone locked into the next.",
      icon: "🏗️",
      color: "from-orange-900/30 to-stone-900",
    },
    {
      label: "The Kalasam",
      desc: "80-ton cupola. Hauled to the summit and placed by hand.",
      icon: "☀️",
      color: "from-yellow-600/20 to-stone-900",
      highlight: true,
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#050508] min-h-[100svh]">
      <div className="sticky top-0 min-h-[100svh] flex flex-col items-center justify-center overflow-hidden will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center z-20 px-4 md:px-6 mb-6 md:mb-8"
        >
          <p className="text-cyan-500/50 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4">
            Construction Timeline
          </p>
          <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-widest font-serif mb-4">
            THE ENGINEERING MIRACLE
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            No mortar. No metal. No modern machinery. Just stone, gravity, and
            human will.
          </p>
        </motion.div>

        <div className="w-full max-w-md h-px bg-white/10 relative mb-6 md:mb-8">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-yellow-500"
            style={{
              width: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
            }}
          />
        </div>

        {/* Stage display - only ONE stage visible at a time */}
        <div className="relative w-full max-w-4xl px-4 sm:px-6 md:px-8 h-40 sm:h-48 md:h-56">
          {stages.map((stage, i) => (
            <ConstructionStage
              key={i}
              stage={stage}
              i={i}
              stagesCount={stages.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[20vh] md:h-[30vh] pointer-events-none z-10"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.3]) }}
        >
          <svg viewBox="0 0 1200 400" className="w-full h-full opacity-20">
            <path
              d="M0,400 L600,0 L1200,400"
              fill="none"
              stroke="rgba(251,191,36,0.2)"
              strokeWidth="1"
            />
            <line
              x1="600"
              y1="0"
              x2="600"
              y2="400"
              stroke="rgba(251,191,36,0.1)"
              strokeDasharray="4 4"
            />
          </svg>
        </motion.div>
      </div>

      {/* Reduced from 400vh to 100vh - eliminate dead zones */}
      <div className="h-[100vh]" />
    </div>
  );
}

/* ============================================================
   SECTION 6: SCULPTURE GALLERY — Museum Experience
   FIXED: Added real image placeholders, mobile-friendly descriptions, Next.js Image ready
   ============================================================ */
function Section6_Gallery() {
  const items = [
    {
      title: "Nandi Monolith",
      type: "Carved from single stone",
      desc: "A 12-foot long, 8-foot high granite bull. Weighs 25 tons. Still sits before the shrine, watching over the temple for 1,000 years.",
      image: "/tamil-heritage/nandi.jpg",
      placeholderColor: "from-amber-900/40 to-stone-900",
    },
    {
      title: "Dvarapalas",
      type: "Guardian Deities",
      desc: "Colossal doorkeepers flanking the sanctum. Each figure stands 18 feet tall, carved in high relief with intricate jewelry and weaponry.",
      image: "/tamil-heritage/dvarapala.jpg",
      placeholderColor: "from-purple-900/40 to-stone-900",
    },
    {
      title: "Chola Frescoes",
      type: "Ancient Paintings",
      desc: "Natural pigment murals depicting the dance of Shiva. Hidden for centuries beneath later Nayak paintings, rediscovered in restoration.",
      image: "/tamil-heritage/frescoes.jpg",
      placeholderColor: "from-red-900/40 to-stone-900",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden flex flex-col items-center justify-center px-4 md:px-12 py-16 md:py-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl mb-12 md:mb-20 z-20 text-center md:text-left"
      >
        <p className="text-yellow-500/50 text-xs uppercase tracking-[0.3em] mb-4">
          Gallery
        </p>
        <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white font-serif mb-4 sm:mb-6 drop-shadow-lg leading-tight">
          SCULPTURE
          <br className="hidden md:block" /> GALLERY
        </h3>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed">
          Every stone breathes life. The carvings depict not just mythology, but
          the daily lives, dances, and heartbeat of the Chola empire.
        </p>
      </motion.div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 sm:gap-8 z-10">
        {items.map((item, i) => (
          <SculptureCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

// Individual sculpture card with mobile-friendly interactions
function SculptureCard({ item, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0[-10%] w-[120%] h-[120%]"
          whileHover={{ scale: 1.1, y: "-2%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Image placeholder with gradient - ready for Next.js Image */}
          <div className={`w-full h-full bg-gradient-to-br ${item.placeholderColor} relative`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-4xl sm:text-6xl opacity-20 font-serif">
              {item.title[0]}
            </div>
            {/* TODO: Replace with Next.js Image component when real images are available */}
            {/* <Image 
              src={item.image} 
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            /> */}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
        <div className="w-8 h-px sm:w-12 bg-white/30 mb-3 sm:mb-4 origin-left group-hover:w-16 sm:group-hover:w-24 group-hover:bg-yellow-500/50 transition-all duration-500" />

        <h4 className="text-white font-bold text-lg sm:text-xl md:text-2xl font-serif mb-2">
          {item.title}
        </h4>
        <p className="text-[10px] sm:text-xs text-yellow-500/70 font-mono uppercase tracking-widest mb-2 sm:mb-3">
          {item.type}
        </p>
        {/* Mobile: always visible, Desktop: hover to reveal */}
        <p className={`text-gray-400 text-xs sm:text-sm leading-relaxed transition-all duration-500 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-100 sm:opacity-0 sm:translate-y-4'
        }`}>
          {item.desc}
        </p>
      </div>

      <div className="absolute inset-0 border border-white/5 group-hover:border-yellow-500/30 transition-colors duration-500 z-30 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-yellow-500/5 transition-opacity duration-500 z-20 pointer-events-none" />
    </motion.div>
  );
}

/* ============================================================
   SECTION 7: INSCRIPTIONS — Stone to Digital Transition
   FIXED: Reduced blur, layered depth, proper timing, centered content
   ============================================================ */
function Section7_Inscriptions() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sharper transitions, reduced blur overlap
  const stoneOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.6, 0]);
  const digitalOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 0.6, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  const floatingTexts = [
    { text: "ஸ்வஸ்தி", x: "15%", y: "20%", size: "text-2xl sm:text-3xl", delay: 0 },
    { text: "ஸ்ரீ", x: "75%", y: "15%", size: "text-3xl sm:text-4xl", delay: 1 },
    { text: "சோழ", x: "60%", y: "60%", size: "text-4xl sm:text-6xl", delay: 2 },
    { text: "ராஜராஜ", x: "25%", y: "70%", size: "text-3xl sm:text-4xl", delay: 3 },
    { text: "திருமகள்", x: "80%", y: "45%", size: "text-xl sm:text-2xl", delay: 1.5 },
  ];

  const steps = [
    { label: "Stone Inscription", icon: "🗿", color: "text-stone-400" },
    { label: "Digitization", icon: "📸", color: "text-blue-400" },
    { label: "OCR Processing", icon: "⚙️", color: "text-purple-400" },
    { label: "Expert Validation", icon: "👁️", color: "text-green-400" },
    { label: "Blockchain Archive", icon: "⛓️", color: "text-cyan-400" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[100svh] md:min-h-[120vh] bg-[#050508]">
      <div className="sticky top-0 min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden will-change-transform">
        {/* Layer 1: Stone background - reduced blur - z-0 */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: stoneOpacity }}
        >
          {floatingTexts.map((item, i) => (
            <motion.div
              key={i}
              className={`absolute ${item.size} text-yellow-600/30 pointer-events-none select-none`}
              style={{ left: item.x, top: item.y }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              {item.text}
            </motion.div>
          ))}

          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23000'/%3E%3Crect width='1' height='1' fill='%23222'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Layer 2: Digital background - layered depth - z-10 */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: digitalOpacity }}
        >
          <div className="absolute inset-0 opacity-15">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "100%",
              }}
              animate={{ left: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Layer 3: Centered content - always visible, sharp transitions - z-20 */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl h-full flex flex-col items-center justify-center">
          <motion.div style={{ opacity: stoneOpacity }} className="absolute">
            <p className="text-stone-500 text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6">
              Epigraphy
            </p>
            <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-stone-300 tracking-widest font-serif mb-4 sm:mb-6">
              THE INSCRIPTIONS SPEAK
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
              Over 400 inscriptions carved into every surface. Names of donors,
              dancers, musicians, soldiers. A complete census of an empire.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: digitalOpacity }}
            className="absolute flex flex-col items-center justify-center"
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-24 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center mb-4 sm:mb-6"
              style={{
                boxShadow: useTransform(
                  glowIntensity,
                  (v) => `0 0 ${40 * v}px rgba(6,182,212,${0.2 * v})`
                ),
              }}
            >
              <span className="text-2xl sm:text-3xl">📜</span>
            </motion.div>
            <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-widest font-serif mb-4 sm:mb-6">
              TRANSCRIBED TO ETERNITY
            </h3>
            <p className="text-cyan-400/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
              Ancient Tamil transforming into immutable data. Every character
              verified. Every record permanent.
            </p>
          </motion.div>
        </div>

        {/* Layer 4: Process steps - mobile friendly - z-20 */}
        <motion.div
          className="absolute bottom-16 sm:bottom-24 left-0 right-0 z-20 px-4 sm:px-6"
          style={{ opacity: digitalOpacity }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-base sm:text-lg mb-2">
                    {step.icon}
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] md:text-xs font-mono text-center ${step.color}`}
                  >
                    {step.label}
                  </span>
                </motion.div>
                {i < 4 && (
                  <div className="hidden md:block w-6 sm:w-8 h-px bg-gradient-to-r from-white/20 to-white/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 8: BLOCKCHAIN ENDING — Flowing Data Pipeline
   ============================================================ */
function Section8_Blockchain() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const flowProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100svh] bg-black text-center flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          className="absolute w-[100vw] h-[100vw] md:w-[120vw] md:h-[120vw] border border-cyan-900/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[70vw] h-[70vw] md:w-[80vw] md:h-[80vw] border border-cyan-800/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-500/40"
            style={{
              top: `${50 + 35 * Math.sin((deg * Math.PI) / 180)}%`,
              left: `${50 + 35 * Math.cos((deg * Math.PI) / 180)}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-30">
          <motion.line
            x1="20%"
            y1="50%"
            x2="80%"
            y2="50%"
            stroke="rgba(6,182,212,0.3)"
            strokeWidth="1"
            strokeDasharray="5 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="100"
              dur="3s"
              repeatCount="indefinite"
            />
          </motion.line>
        </svg>
      </div>

      <div className="relative z-20 px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-xl md:text-3xl lg:text-5xl font-light text-gray-400 tracking-wide leading-tight mb-6 md:mb-8"
        >
          &ldquo;The Cholas carved history into stone.&rdquo;
        </motion.h2>

        <motion.div
          className="w-full max-w-2xl h-20 md:h-24 relative mb-6 md:mb-8 overflow-hidden rounded-lg border border-cyan-500/20 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center justify-around px-4 md:px-8">
            {["Stone", "Scan", "Verify", "Mint", "Chain"].map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-cyan-500/30 bg-cyan-900/20 flex items-center justify-center mb-1">
                  <div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </div>
                <span className="text-[9px] md:text-[10px] text-cyan-500/60 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <motion.div
            className="absolute top-1/2 left-[10%] w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
            style={{
              x: useTransform(flowProgress, [0, 1], [0, 300]),
            }}
          />
          <motion.div
            className="absolute top-1/2 left-[10%] w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{
              x: useTransform(flowProgress, [0.1, 1], [0, 280]),
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center text-2xl md:text-4xl lg:text-6xl font-bold text-cyan-400 font-serif tracking-widest leading-tight uppercase"
        >
          We preserve it in the blockchain.
          <div className="mt-6 md:mt-8 lg:mt-12 w-full max-w-md h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          <div className="mt-4 md:mt-6 text-[10px] md:text-xs lg:text-sm text-cyan-500/60 font-mono font-normal tracking-[0.3em] flex gap-3 md:gap-4">
            <span>IMMUTABLE</span>
            <span>·</span>
            <span>DECENTRALIZED</span>
            <span>·</span>
            <span>ETERNAL</span>
          </div>
        </motion.h2>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 9: FINAL SCENE — Emotional Closer
   FIXED: Centered sequential fade timing, reduced scroll height, mobile responsive
   ============================================================ */
function Section9_Final() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sequential fade in/out - each line fades in, holds, fades out partially before next
  const fade1 = useTransform(scrollYProgress, [0, 0.12, 0.25], [0, 1, 0.3]);
  const fade2 = useTransform(scrollYProgress, [0.12, 0.28, 0.42], [0, 1, 0.3]);
  const fade3 = useTransform(scrollYProgress, [0.28, 0.44, 0.58], [0, 1, 0.3]);
  const fade4 = useTransform(scrollYProgress, [0.44, 0.60, 0.74], [0, 1, 0.3]);
  const fade5 = useTransform(scrollYProgress, [0.60, 0.76, 0.88], [0, 1, 0.3]);
  const fade6 = useTransform(scrollYProgress, [0.76, 0.92, 1], [0, 1, 1]);

  const lines = [
    {
      text: "1010 CE",
      style: "text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl font-mono tracking-[0.2em]",
      fade: fade1,
    },
    {
      text: "A king built in stone.",
      style: "text-gray-400 text-base sm:text-lg md:text-2xl lg:text-3xl font-light font-serif",
      fade: fade2,
    },
    {
      text: "2026 CE",
      style: "text-cyan-600/60 text-sm sm:text-base md:text-lg lg:text-xl font-mono tracking-[0.2em] mt-4 sm:mt-6 md:mt-8 lg:mt-12",
      fade: fade3,
    },
    {
      text: "We preserve in code.",
      style: "text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-light font-serif",
      fade: fade4,
    },
    {
      text: "Time defeats empires.",
      style: "text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl italic mt-6 sm:mt-8 md:mt-12 lg:mt-16",
      fade: fade5,
    },
    {
      text: "Memory defeats time.",
      style: "text-yellow-400/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold font-serif mt-2 sm:mt-3 md:mt-4",
      fade: fade6,
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-[100svh] md:min-h-[120vh] bg-black">
      <div className="sticky top-0 min-h-[100svh] w-full flex items-center justify-center will-change-transform">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] sm:w-[250px] sm:h-[125px] md:w-[300px] md:h-[150px] bg-yellow-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none z-0"
          style={{ opacity: fade6 }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={line.style}
              style={{ opacity: line.fade }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
        >
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-gray-700 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
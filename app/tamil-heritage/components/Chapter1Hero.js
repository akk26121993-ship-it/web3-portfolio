"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import TextReveal from "./ui/TextReveal";
import ParticleField from "./three/ParticleField";
import FloatingLeaves from "./three/FloatingLeaves";

// Tamil characters scattered as atmospheric elements
const TAMIL_CHARS = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ", "க", "ங", "ச", "ஞ", "ட", "ண", "த", "ந", "ப", "ம"];

function TamilCharBG() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {TAMIL_CHARS.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.08 }}
          className="th-tamil-char th-animate-float"
          style={{
            left: `${5 + (i * 4.2) % 90}%`,
            top: `${10 + ((i * 17) % 75)}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: `clamp(0.8rem, ${2 + (i % 3)}vw, 2.5rem)`,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Chapter1Hero({ deviceTier }) {
  const showCanvas = deviceTier !== "low";

  return (
    <section
      id="chapter-1"
      className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-[#050508] min-h-[100svh]"
    >
      {/* 3D Background - z-0 */}
      {showCanvas && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 12], fov: 50 }}
              dpr={deviceTier === "high" ? [1, 2] : [1, 1]}
              gl={{ antialias: deviceTier === "high", alpha: true }}
            >
              <ambientLight intensity={0.15} />
              <directionalLight position={[10, 10, 5]} intensity={0.6} color="#fbbf24" />
              <Stars radius={100} depth={50} count={deviceTier === "high" ? 3000 : 1500} factor={4} saturation={0} fade speed={0.5} />
              <ParticleField count={deviceTier === "high" ? 200 : 100} color="#fbbf24" />
              <FloatingLeaves count={deviceTier === "high" ? 5 : 3} />
            </Canvas>
          </Suspense>
          {/* Gradient overlay - mobile darker */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/70 to-[#050508] md:via-[#050508]/40" />
        </div>
      )}

      {/* Tamil characters scattered background - z-0 */}
      <TamilCharBG />

      {/* Vignette - z-10 */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #050508 100%)" }} />

      {/* Content - z-20 */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-6 md:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400/80 text-[10px] md:text-xs th-font-mono tracking-widest uppercase">Chapter I</span>
        </motion.div>

        {/* Opening text sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mb-6 md:mb-8 text-center"
        >
          <p className="text-gray-500 text-sm md:text-base lg:text-xl th-font-mono italic leading-relaxed mb-2">
            Before servers existed...
          </p>
          <p className="th-text-shimmer text-base md:text-lg lg:text-2xl th-font-display font-bold">
            Knowledge lived on leaves.
          </p>
        </motion.div>

        {/* Main title - responsive typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="th-font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-4 md:mb-6 text-center"
        >
          THE LOST
          <br />
          <span className="th-text-shimmer">CIVILIZATION</span>
        </motion.h1>

        {/* Subtitle - responsive typography */}
        <TextReveal
          text="A journey through 2000+ years of Tamil civilization — preserved forever in the blockchain."
          className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed mb-10 md:mb-12 text-center"
          revealType="word"
          staggerDelay={0.04}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-gray-600 th-font-mono uppercase tracking-[0.3em]">Begin the journey</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 md:h-16 bg-gradient-to-b from-yellow-500/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

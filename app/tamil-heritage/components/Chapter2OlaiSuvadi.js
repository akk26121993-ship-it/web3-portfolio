"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TextReveal from "./ui/TextReveal";
import GlowCard from "./ui/GlowCard";
import Image from "next/image";

const MANUSCRIPTS = [
  {
    title: "Siddha Medicine",
    tamil: "சித்த மருத்துவம்",
    desc: "Ancient herbal remedies and healing practices passed down through 18 Siddhar lineages — treating body, mind, and spirit as one.",
    icon: "🌿",
    color: "rgba(34, 197, 94, 0.4)",
    gradient: "from-green-500/20 to-emerald-900/20",
  },
  {
    title: "Astronomy & Mathematics",
    tamil: "வானியல் & கணிதம்",
    desc: "Tamil astronomers tracked planetary movements, calculated eclipses, and developed zero-based number systems millennia ago.",
    icon: "🌙",
    color: "rgba(99, 102, 241, 0.4)",
    gradient: "from-indigo-500/20 to-blue-900/20",
  },
  {
    title: "Sangam Literature",
    tamil: "சங்க இலக்கியம்",
    desc: "2000-year-old poetry and prose that defined love, war, governance, and the human condition — in extraordinary detail.",
    icon: "📜",
    color: "rgba(251, 191, 36, 0.4)",
    gradient: "from-yellow-500/20 to-amber-900/20",
  },
  {
    title: "Temple Architecture",
    tamil: "கோயில் கட்டிடக்கலை",
    desc: "Engineering marvels — shadow-free temples, anti-gravity stones, and structures aligned with cosmic geometry.",
    icon: "🏛️",
    color: "rgba(236, 72, 153, 0.4)",
    gradient: "from-pink-500/20 to-rose-900/20",
  },
  {
    title: "Sacred Records",
    tamil: "புனித ஆவணங்கள்",
    desc: "Temple inscriptions documenting trade routes, tax records, land grants, and community governance across centuries.",
    icon: "⛩️",
    color: "rgba(168, 85, 247, 0.4)",
    gradient: "from-purple-500/20 to-violet-900/20",
  },
];

// Transformation sequence: Ancient → Digital
function TransformationSequence() {
  const ancientText = "தமிழ் நாகரிகம் 2000 ஆண்டுகள்";
  const hashText = "0x7a3f...e9b2c4d1a5f8";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-16 md:py-24 text-center"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
        <p className="text-gray-500 text-[10px] md:text-xs th-font-mono uppercase tracking-widest mb-6 md:mb-8">Transformation</p>

        {/* Ancient text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="th-font-tamil text-xl md:text-2xl lg:text-3xl xl:text-4xl text-yellow-400/80 mb-3 md:mb-4"
        >
          {ancientText}
        </motion.div>

        {/* Arrow / transform indicator */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-px h-12 md:h-16 bg-linear-to-b from-yellow-500 to-cyan-500 mx-auto my-4 md:my-6 origin-top"
        />

        {/* Particles becoming data */}
        <div className="flex justify-center gap-1 my-4 md:my-6 flex-wrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0.7], y: [-20, 0, 5], scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.05 * i }}
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
              style={{
                background: i < 10
                  ? `hsl(${40 + i * 3}, 80%, 50%)`
                  : `hsl(${180 + i * 3}, 80%, 50%)`,
              }}
            />
          ))}
        </div>

        {/* Hash text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="th-font-mono text-base md:text-lg lg:text-xl xl:text-2xl text-cyan-400/80"
        >
          {hashText}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-gray-500 text-xs md:text-sm mt-4 md:mt-6"
        >
          Ancient knowledge becomes immutable digital heritage
        </motion.p>
      </div>
    </motion.div>
  );
}

// Cinematic Palm Leaf Manuscript Reveal
function PalmLeafReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lampGlow = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const manuscriptScale = useTransform(scrollYProgress, [0.2, 0.6], [0.9, 1]);
  const textReveal = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[100svh] md:min-h-[120vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Oil Lamp Glow Effect - positioned absolutely for background effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          opacity: lampGlow,
        }}
      >
        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 200, 100, 0.3) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Palm Leaf Manuscript with Cinematic Zoom */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-16"
        style={{
          scale: manuscriptScale,
        }}
      >
        <div className="relative aspect-[3/2] md:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl shadow-amber-900/20">
          {/* Palm Leaf Texture Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 via-amber-900/60 to-amber-950/80" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='%23d97706' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Ancient Tamil Text - Sharp and Readable */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12"
            style={{ opacity: textReveal }}
          >
            <div className="text-center">
              <p className="th-font-tamil text-xl md:text-2xl lg:text-3xl xl:text-4xl text-amber-200/90 leading-relaxed tracking-wide" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                தமிழ் நாகரிகம்
              </p>
              <p className="th-font-tamil text-lg md:text-xl lg:text-2xl xl:text-3xl text-amber-300/80 mt-2 md:mt-4 leading-relaxed" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                இரண்டாயிரம் ஆண்டுகள்
              </p>
              <div className="mt-4 md:mt-6 flex justify-center gap-1 md:gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-5 md:h-6 lg:h-8 bg-gradient-to-b from-amber-400/60 to-amber-600/40 rounded-full"
                    animate={{
                      scaleY: [1, 0.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ink Engraving Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Vignette for Depth - darker on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 md:from-black/50 via-transparent to-black/50 md:to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 md:from-black/30 via-transparent to-black/50 md:to-black/30 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Chapter2OlaiSuvadi() {
  return (
    <section id="chapter-2" className="relative bg-[#050508] overflow-hidden">
      {/* Cinematic Palm Leaf Reveal */}
      <PalmLeafReveal />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        {/* Chapter header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-500/60 text-[10px] md:text-xs th-font-mono uppercase tracking-[0.3em] block mb-3 md:mb-4"
          >
            Chapter II
          </motion.span>
          <TextReveal
            text="ஓலைச்சுவடி"
            tag="h2"
            className="th-font-tamil text-2xl md:text-3xl lg:text-4xl text-amber-400/90 mb-2 md:mb-3"
            revealType="character"
            staggerDelay={0.08}
          />
          <TextReveal
            text="The Palm Leaf Manuscripts"
            tag="h3"
            className="th-font-display font-bold text-xl md:text-2xl lg:text-3xl text-white"
            revealType="word"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 max-w-3xl mx-auto mt-3 md:mt-4 text-sm md:text-base lg:text-lg leading-relaxed"
          >
            For millennia, Tamil knowledge was inscribed on dried palm leaves with iron styluses.
            These fragile manuscripts hold the keys to medicine, astronomy, engineering, and spiritual wisdom.
          </motion.p>
        </div>

        {/* Manuscript cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-12 md:mb-16">
          {MANUSCRIPTS.map((ms, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlowCard
                className="p-5 md:p-6 lg:p-8 h-full"
                glowColor={ms.color}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ms.gradient} rounded-3xl opacity-30`} />
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{ms.icon}</div>
                  <h4 className="th-font-display font-bold text-base md:text-lg text-white mb-1">{ms.title}</h4>
                  <p className="th-font-tamil text-yellow-400/60 text-xs md:text-sm mb-2 md:mb-3">{ms.tamil}</p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{ms.desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Ancient → Digital transformation */}
        <TransformationSequence />
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "./ui/TextReveal";
import GlowCard from "./ui/GlowCard";
import Link from "next/link";

// Museum artifact cards
const ARTIFACTS = [
  { title: "Thirukkural Manuscript", category: "Literature", period: "300 BCE", icon: "📜", color: "#fbbf24" },
  { title: "Siddhar Medical Texts", category: "Medicine", period: "200 BCE", icon: "🌿", color: "#22c55e" },
  { title: "Chola Bronze Inscriptions", category: "Historical", period: "900 CE", icon: "🏛️", color: "#a855f7" },
  { title: "Surya Siddhanta", category: "Astronomy", period: "400 CE", icon: "🌙", color: "#3b82f6" },
  { title: "Temple Engineering Records", category: "Engineering", period: "1000 CE", icon: "📐", color: "#22d3ee" },
  { title: "Maritime Trade Maps", category: "Navigation", period: "800 CE", icon: "🗺️", color: "#f97316" },
  { title: "Agastya's Chemistry", category: "Science", period: "100 BCE", icon: "⚗️", color: "#ef4444" },
  { title: "Sangam War Chronicles", category: "Military", period: "200 CE", icon: "🛡️", color: "#ec4899" },
];

// Roadmap phases
const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Smart Contracts & IPFS",
    status: "Completed",
    icon: "⛓️",
    desc: "Core blockchain infrastructure with Ethereum smart contracts and IPFS pinning services for immutable storage.",
  },
  {
    phase: "Phase 2",
    title: "OCR AI Integration",
    status: "In Progress",
    icon: "🤖",
    desc: "Advanced Tamil OCR powered by fine-tuned AI models for accurate palm leaf manuscript digitization.",
  },
  {
    phase: "Phase 3",
    title: "Validator Network Beta",
    status: "Upcoming",
    icon: "🌐",
    desc: "Decentralized expert validation network with staking and reputation scoring for quality assurance.",
  },
  {
    phase: "Phase 4",
    title: "Public Museum Launch",
    status: "Upcoming",
    icon: "🏛️",
    desc: "Global digital museum experience — free, borderless access to 2000+ years of Tamil heritage.",
  },
];

// Animated count-up stat
function CountUpStat({ value, label, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center flex flex-col items-center justify-start overflow-visible">
      <div 
        className="th-font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl th-text-shimmer mb-2 whitespace-nowrap overflow-visible"
        style={{ width: "fit-content", lineHeight: "1.1" }}
      >
        {prefix}{isInView ? count.toLocaleString() : "0"}{suffix}
      </div>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-tight wrap-break-word">{label}</p>
    </div>
  );
}

export default function Chapter6Museum() {
  return (
    <section id="chapter-6" className="th-chapter relative" style={{ minHeight: "auto" }}>
      <div className="absolute inset-0 bg-linear-to-b from-[#050508] via-[#08080f] to-[#050508]" />

      <div className="th-chapter-content relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-yellow-500/60 text-xs th-font-mono uppercase tracking-[0.3em] block mb-3"
          >
            Chapter VI
          </motion.span>
          <TextReveal
            text="The Digital Museum"
            tag="h2"
            className="th-font-display font-bold text-3xl md:text-5xl text-white mb-3"
            revealType="word"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            A living, breathing digital archive — open to the world, free forever,
            preserving the brilliance of Tamil civilization for every generation.
          </motion.p>
        </div>

        {/* Artifact gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
          {ARTIFACTS.map((artifact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GlowCard
                className="p-5 h-full group cursor-pointer"
                glowColor={`${artifact.color}66`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform inline-block">
                      {artifact.icon}
                    </span>
                    <span
                      className="text-[9px] th-font-mono px-2 py-0.5 rounded-full border"
                      style={{ color: artifact.color, borderColor: `${artifact.color}33` }}
                    >
                      {artifact.period}
                    </span>
                  </div>
                  <h4 className="th-font-display font-bold text-sm text-white mb-1 group-hover:text-yellow-400 transition-colors">
                    {artifact.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] th-font-mono uppercase tracking-wider">
                    {artifact.category}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h3 className="th-font-display font-black text-4xl md:text-7xl mb-8">
            <span className="th-text-gold">Permanent Memory.</span>
          </h3>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Democratizing 2000 years of knowledge. Allowing researchers, students, and descendants
            to explore their heritage globally — without borders or gatekeepers.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto w-full px-2 overflow-visible">
            <CountUpStat value="2000" suffix="+" label="Years of Heritage" />
            <CountUpStat value="5" label="Knowledge Domains" />
            <CountUpStat value="10000" suffix="+" label="Manuscripts Targeted" />
            <CountUpStat value="40" suffix="+" label="Languages Supported" />
          </div>
        </motion.div>

        {/* Roadmap */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-yellow-500/60 text-xs th-font-mono uppercase tracking-widest block mb-3"
            >
              Development Phases
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="th-font-display font-bold text-2xl md:text-3xl text-white"
            >
              Project Roadmap
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {ROADMAP.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-yellow-500/15 transition-all group"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="th-font-mono text-xs text-yellow-500">{item.phase}</span>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-500/15 text-green-400 border border-green-500/20"
                        : item.status === "In Progress"
                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                        : "bg-gray-500/15 text-gray-400 border border-gray-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="th-font-display font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-yellow-500 to-amber-600 rounded-2xl text-black font-bold text-base shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow"
            >
              <span>Explore The Vault</span>
              <span className="text-lg">→</span>
            </a>
          </motion.div>

          <div className="mt-8">
            <Link href="/">
              <motion.span
                whileHover={{ x: -5 }}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                <span>←</span>
                <span>Back to Portfolio</span>
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-8 mt-8 text-center">
          <p className="text-gray-600 text-xs th-font-mono">
            Tamil Heritage Archive — Preserving Civilization, Forever.
          </p>
        </div>
      </div>
    </section>
  );
}

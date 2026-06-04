"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "./ui/TextReveal";
import GlowCard from "./ui/GlowCard";

const CHAMBERS = [
  {
    title: "Siddha Medicine",
    tamil: "சித்த மருத்துவம்",
    icon: "🌿",
    color: "#22c55e",
    bgClass: "from-green-900/30 via-emerald-900/10 to-transparent",
    borderColor: "rgba(34, 197, 94, 0.3)",
    glowColor: "rgba(34, 197, 94, 0.4)",
    desc: "The 18 Siddhars developed a complete medical system treating body, mind, and spirit — encoded on palm leaves and passed through generations.",
    facts: [
      { label: "Medicinal Plants", value: "4,448+", detail: "Catalogued in ancient texts" },
      { label: "Siddhar Lineages", value: "18", detail: "Master practitioners" },
      { label: "Treatment Systems", value: "32", detail: "Including yoga & alchemy" },
    ],
    bgOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              background: `radial-gradient(circle, rgba(34, 197, 94, ${0.3 - i * 0.03}), transparent)`,
              left: `${10 + (i * 23) % 80}%`,
              top: `${15 + (i * 31) % 70}%`,
              animation: `th-float-slow ${6 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Science & Engineering",
    tamil: "அறிவியல் & பொறியியல்",
    icon: "📐",
    color: "#22d3ee",
    bgClass: "from-cyan-900/30 via-blue-900/10 to-transparent",
    borderColor: "rgba(34, 211, 238, 0.3)",
    glowColor: "rgba(34, 211, 238, 0.4)",
    desc: "From irrigation systems to astronomical observatories, Tamil engineers built wonders that defy modern explanation.",
    facts: [
      { label: "Astronomical Texts", value: "Surya Siddhanta", detail: "Calculated eclipses accurately" },
      { label: "Water Systems", value: "Grand Anicut", detail: "World's oldest functional dam" },
      { label: "Navigation", value: "Mariner's Compass", detail: "Ancient maritime technology" },
    ],
    bgOverlay: <div className="absolute inset-0 th-blueprint-grid opacity-30 pointer-events-none" />,
  },
  {
    title: "Psychology & Philosophy",
    tamil: "உளவியல் & தத்துவம்",
    icon: "🧘",
    color: "#a855f7",
    bgClass: "from-purple-900/30 via-violet-900/10 to-transparent",
    borderColor: "rgba(168, 85, 247, 0.3)",
    glowColor: "rgba(168, 85, 247, 0.4)",
    desc: "Thiruvalluvar's Thirukkural and Siddhar philosophies mapped the human psyche millennia before Western psychology.",
    facts: [
      { label: "Thirukkural", value: "1,330", detail: "Couplets on ethics & governance" },
      { label: "Translated Into", value: "40+", detail: "Languages worldwide" },
      { label: "Philosophical Schools", value: "Saiva Siddhanta", detail: "Complete spiritual framework" },
    ],
    bgOverlay: (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="relative w-64 h-64">
          {[100, 80, 60, 40].map((size, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border border-purple-400"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                transform: "translate(-50%, -50%)",
                animation: `th-ripple ${4 + i}s ease-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Chemistry & Materials",
    tamil: "வேதியியல் & பொருளியல்",
    icon: "⚗️",
    color: "#f59e0b",
    bgClass: "from-amber-900/30 via-yellow-900/10 to-transparent",
    borderColor: "rgba(245, 158, 11, 0.3)",
    glowColor: "rgba(245, 158, 11, 0.4)",
    desc: "Ancient Tamil alchemists mastered metal purification, natural dyes, and material transformations centuries before modern chemistry.",
    facts: [
      { label: "Wootz Steel", value: "300 BCE", detail: "World's first crucible steel" },
      { label: "Rust-Free Iron", value: "1600+ years", detail: "Iron pillar technology" },
      { label: "Natural Dyes", value: "200+", detail: "Documented plant-based pigments" },
    ],
    bgOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="th-molecule-node"
            style={{
              left: `${20 + (i * 17) % 60}%`,
              top: `${25 + (i * 23) % 50}%`,
              background: `hsl(${40 + i * 10}, 80%, 50%)`,
              boxShadow: `0 0 8px hsl(${40 + i * 10}, 80%, 50%)`,
              animation: `th-molecular-orbit ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Defense & Military",
    tamil: "பாதுகாப்பு & படை",
    icon: "🛡️",
    color: "#ef4444",
    bgClass: "from-red-900/30 via-rose-900/10 to-transparent",
    borderColor: "rgba(239, 68, 68, 0.3)",
    glowColor: "rgba(239, 68, 68, 0.4)",
    desc: "The Chola Navy dominated the Indian Ocean. Tamil military strategy, shipbuilding, and fortification were unrivaled in their era.",
    facts: [
      { label: "Chola Navy", value: "1000+ ships", detail: "Largest medieval navy" },
      { label: "Empire Span", value: "Southeast Asia", detail: "Maritime trade dominance" },
      { label: "Fort Architecture", value: "7 layers", detail: "Concentric defense design" },
    ],
    bgOverlay: <div className="absolute inset-0 th-tactical-grid opacity-20 pointer-events-none" />,
  },
];

function VaultChamber({ chamber, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative"
    >
      <GlowCard
        className="p-6 md:p-10 relative overflow-hidden"
        glowColor={chamber.glowColor}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-linear-to-br ${chamber.bgClass} rounded-3xl`} />

        {/* Atmospheric overlay */}
        {chamber.bgOverlay}

        {/* Vault door opening animation */}
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0%)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative z-10"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="text-4xl md:text-5xl p-3 rounded-2xl"
              style={{ background: `${chamber.color}15` }}
            >
              {chamber.icon}
            </div>
            <div>
              <h3 className="th-font-display font-bold text-xl md:text-2xl text-white">
                {chamber.title}
              </h3>
              <p className="th-font-tamil text-sm" style={{ color: `${chamber.color}99` }}>
                {chamber.tamil}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            {chamber.desc}
          </p>

          {/* Facts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {chamber.facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                className="p-4 rounded-xl bg-white/3 border border-white/5"
              >
                <p
                  className="th-font-display font-bold text-lg md:text-xl mb-1"
                  style={{ color: chamber.color }}
                >
                  {fact.value}
                </p>
                <p className="text-white text-xs font-semibold mb-0.5">{fact.label}</p>
                <p className="text-gray-500 text-[10px]">{fact.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-20"
          style={{
            background: `radial-gradient(circle at top right, ${chamber.color}, transparent 70%)`,
          }}
        />
      </GlowCard>
    </motion.div>
  );
}

export default function Chapter4Vault() {
  return (
    <section id="chapter-4" className="th-chapter relative" style={{ minHeight: "auto" }}>
      <div className="absolute inset-0 bg-linear-to-b from-[#050508] via-[#080810] to-[#050508]" />

      <div className="th-chapter-content relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-yellow-500/60 text-xs th-font-mono uppercase tracking-[0.3em] block mb-3"
          >
            Chapter IV
          </motion.span>
          <TextReveal
            text="The Ancient Knowledge Vault"
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
            Five chambers of knowledge. Each holds centuries of wisdom that shaped civilizations
            and advanced human understanding across every domain.
          </motion.p>
        </div>

        {/* Sacred geometry decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
          <div className="th-sacred-circle th-animate-sacred" style={{ width: 600, height: 600 }} />
          <div className="th-sacred-circle th-animate-sacred-rev" style={{ width: 400, height: 400, top: 100, left: 100, position: "absolute" }} />
        </div>

        {/* Knowledge chambers */}
        <div className="space-y-8 md:space-y-12">
          {CHAMBERS.map((chamber, i) => (
            <VaultChamber key={i} chamber={chamber} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

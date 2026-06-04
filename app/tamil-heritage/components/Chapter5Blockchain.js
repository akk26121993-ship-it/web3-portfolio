"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextReveal from "./ui/TextReveal";

// Animated SVG blockchain node network
function BlockchainNetwork() {
  const nodes = [
    { x: 150, y: 80 },
    { x: 300, y: 50 },
    { x: 450, y: 100 },
    { x: 100, y: 200 },
    { x: 250, y: 180 },
    { x: 400, y: 220 },
    { x: 550, y: 160 },
    { x: 200, y: 300 },
    { x: 350, y: 280 },
    { x: 500, y: 310 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [5, 6], [3, 7], [4, 8],
    [5, 9], [7, 8], [8, 9], [6, 9], [2, 6],
  ];

  return (
    <svg viewBox="0 0 650 380" className="w-full h-auto max-w-xl mx-auto">
      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(34, 211, 238, 0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + i * 0.08 }}
        />
      ))}
      {/* Data flow pulses along connections */}
      {connections.slice(0, 8).map(([a, b], i) => (
        <motion.circle
          key={`pulse-${i}`}
          r="2"
          fill="#22d3ee"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            delay: 1.5 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <animateMotion
            dur={`${1.5 + i * 0.2}s`}
            repeatCount="indefinite"
            path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`}
          />
        </motion.circle>
      ))}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="14"
            fill="rgba(34, 211, 238, 0.05)"
            stroke="rgba(34, 211, 238, 0.3)"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="4"
            fill="#22d3ee"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

// Architecture pipeline steps
const ARCH_STEPS = [
  {
    step: "01",
    title: "Data Collection & OCR",
    desc: "High-resolution scanning of manuscripts paired with AI-powered Tamil OCR processing for accurate digitization.",
    icon: "📸",
    color: "#fbbf24",
  },
  {
    step: "02",
    title: "Multi-Expert Validation",
    desc: "3-of-5 consensus required from vetted historians, linguists, and domain experts ensures data integrity.",
    icon: "🔍",
    color: "#22c55e",
  },
  {
    step: "03",
    title: "IPFS Decentralization",
    desc: "Validated files are hashed and permanently pinned across the Filecoin/IPFS distributed network.",
    icon: "🌐",
    color: "#a855f7",
  },
  {
    step: "04",
    title: "Blockchain Anchoring",
    desc: "SHA-256 hashes and metadata are minted as tamper-proof, immutable records on Ethereum.",
    icon: "⛓️",
    color: "#22d3ee",
  },
];

function TransformVisual() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const ancientItems = ["ஓலைச்சுவடி", "கல்வெட்டு", "செப்புப்பட்டயம்", "கோயில் ஆவணம்"];
  const digitalItems = ["0x7a3f...e9b2", "QmXoypiz...J4", "ipfs://bafy...", "eth:0x1b9..."];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center mb-16 md:mb-24">
      {/* Ancient side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-3"
      >
        <p className="th-font-mono text-[10px] text-yellow-500/60 uppercase tracking-widest mb-4">
          Physical Archives
        </p>
        {ancientItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
            <span className="th-font-tamil text-yellow-400/80 text-sm">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Transformation arrow / particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-2 py-4 md:py-0"
      >
        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: [0, 1, 0.5], scale: [0, 1.2, 1] } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
              className="w-2 h-2 rounded-full"
              style={{
                background: `hsl(${40 + i * 18}, 80%, 55%)`,
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-px h-12 md:h-0 md:w-12 md:rotate-0 bg-linear-to-b md:bg-linear-to-r from-yellow-500 to-cyan-500 origin-top md:origin-left"
        />
        <span className="text-[10px] th-font-mono text-gray-500 rotate-0 md:rotate-0">SHA-256</span>
      </motion.div>

      {/* Digital side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-3"
      >
        <p className="th-font-mono text-[10px] text-cyan-500/60 uppercase tracking-widest mb-4">
          Blockchain Records
        </p>
        {digitalItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            <span className="th-font-mono text-cyan-400/80 text-sm">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Chapter5Blockchain() {
  return (
    <section id="chapter-5" className="th-chapter relative" style={{ minHeight: "auto" }}>
      {/* Subtle hash stream background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="th-hash-stream th-animate-hash" style={{ fontSize: 8, lineHeight: 2.2 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, j) => (
                <span key={j} className="mx-4">
                  0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-[#050508] via-[#050510] to-[#050508]" />

      <div className="th-chapter-content relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-500/60 text-xs th-font-mono uppercase tracking-[0.3em] block mb-3"
          >
            Chapter V
          </motion.span>
          <TextReveal
            text="The Blockchain Transformation"
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
            Where ancient knowledge meets immutable technology.
            Every manuscript, every inscription — preserved forever on the blockchain.
          </motion.p>
        </div>

        {/* Ancient → Digital Visual Transformation */}
        <TransformVisual />

        {/* Architecture pipeline */}
        <div className="mb-16 md:mb-24">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="th-font-display font-bold text-xl md:text-2xl text-white text-center mb-12"
          >
            System Architecture
          </motion.h3>

          <div className="relative">
            {/* Vertical connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-yellow-500/10 via-cyan-500/30 to-cyan-500/10 -translate-x-px" />

            <div className="space-y-8 md:space-y-0">
              {ARCH_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center md:mb-12 last:mb-0 ${
                    i % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className={`w-full md:w-[44%] p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors ${
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}>
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-2xl">{step.icon}</span>
                      <span className="th-font-mono text-sm" style={{ color: step.color }}>
                        {step.step}
                      </span>
                    </div>
                    <h4 className="th-font-display font-bold text-lg text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex w-12 h-12 items-center justify-center z-10 mx-auto">
                    <div
                      className="w-4 h-4 rounded-full animate-pulse"
                      style={{ background: step.color, boxShadow: `0 0 12px ${step.color}` }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[44%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain Network Visualization */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="th-font-display font-bold text-xl md:text-2xl text-white text-center mb-8"
          >
            Decentralized Node Network
          </motion.h3>
          <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white/1 border border-cyan-500/10">
            <BlockchainNetwork />
          </div>
        </div>

        {/* Security features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Validator Network",
              desc: "Decentralized consensus among certified historians, linguists, and domain experts.",
              icon: "🔐",
              color: "#22c55e",
            },
            {
              title: "Trust Scoring",
              desc: "Reputation mechanics that reward accuracy and penalize fraudulent submissions.",
              icon: "⚖️",
              color: "#fbbf24",
            },
            {
              title: "Immutable Audit Trail",
              desc: "Every modification, translation, and annotation is permanently recorded on-chain.",
              icon: "📋",
              color: "#22d3ee",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors text-center"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="th-font-display font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

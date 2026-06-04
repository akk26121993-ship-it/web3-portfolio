"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { projects } from "@/src/data/projects";




// ─────────────────────────────────────────────────────────────
// FIX #1, #2, #3: No more hardcoded credentials or NEXT_PUBLIC_ env vars.
// EmailJS is now called via /api/contact (server-side route).
// The browser never sees service IDs or API keys.
// ─────────────────────────────────────────────────────────────




/* ─────────────────────────────────────────
   CURSOR
───────────────────────────────────────── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 300 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 300 });


  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400 mix-blend-difference pointer-events-none z-9999"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none z-9998"
        style={{ x: trailX, y: trailY, translateX: "-4px", translateY: "-4px" }}
      />
    </>
  );
}


function MatrixChar({ columnIndex, totalColumns }) {
  const [randomValues, setRandomValues] = useState(null);

  useEffect(() => {
    // Generate random values only on client side
    const frame = requestAnimationFrame(() => {
      setRandomValues({
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 5,
        fontSize: 8 + Math.random() * 6,
        chars: Array.from({ length: 45 }).map(
          () => ["0", "1", "A", "Ξ", "λ", "∆", "Ω", "X", "Z"][Math.floor(Math.random() * 9)]
        ),
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!randomValues) return null;

  return (
    <div
      className="absolute top-[-120%] text-green-400 font-mono animate-matrix whitespace-pre"
      style={{
        left: `${(columnIndex / totalColumns) * 100}%`,
        animationDuration: `${randomValues.duration}s`,
        animationDelay: `${randomValues.delay}s`,
        fontSize: `${randomValues.fontSize}px`,
      }}
    >
      {randomValues.chars.map((char, j) => (
        <div key={j}>{char}</div>
      ))}
    </div>
  );
}

function MatrixRain() {
  const columns = 60;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <MatrixChar key={i} columnIndex={i} totalColumns={columns} />
      ))}
    </div>
  );
}

const PHASES = [
  "INITIALIZING QUANTUM CORE...",
  "AUTHENTICATING AI PROTOCOL...",
  "SYNCING WEB3 NETWORK...",
  "ESTABLISHING SECURE CHANNEL...",
  "ACCESSING METAVERSE GRID...",
  "BOOTING NEURAL INTERFACE...",
];

function LoadingScreen({ onComplete }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Mark that we're on client
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /* EXACT 5 SECOND LOADING */
  useEffect(() => {
    if (!isClient) return;

    const totalDuration = 5000;
    const interval = 50;
    const totalSteps = totalDuration / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      const progress = Math.min(
        Math.floor((currentStep / totalSteps) * 100),
        100
      );

      setPct(progress);

      setPhase(
        Math.min(
          Math.floor((progress / 100) * PHASES.length),
          PHASES.length - 1
        )
      );

      if (progress >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isClient, onComplete]);

  /* TYPING EFFECT */
  useEffect(() => {
    if (!isClient) return;

    let current = "";
    let index = 0;

    const frame = requestAnimationFrame(() => {
      setTypedText("");
    });

    const typing = setInterval(() => {
      current += PHASES[phase][index] || "";
      setTypedText(current);

      index++;

      if (index >= PHASES[phase].length) {
        clearInterval(typing);
      }
    }, 20);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(typing);
    };
  }, [phase, isClient]);

  return (
    <>
      <style jsx global>{`
        @keyframes matrixFall {
          0% {
            transform: translateY(-120%);
          }
          100% {
            transform: translateY(220%);
          }
        }

        @keyframes pulseGlow {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }

        @keyframes rotateRing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes flicker {
          0% {
            opacity: 1;
          }
          5% {
            opacity: 0.95;
          }
          10% {
            opacity: 1;
          }
          15% {
            opacity: 0.92;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes glow-ring {
          0% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.1);
          }
          50% {
            box-shadow: 0 0 50px rgba(34, 211, 238, 0.8), inset 0 0 30px rgba(34, 211, 238, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.1);
          }
        }

        .animate-matrix {
          animation-name: matrixFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .glow-pulse {
          animation: pulseGlow 3s infinite ease-in-out;
        }

        .rotate-ring {
          animation: rotateRing 12s linear infinite;
        }

        .screen-flicker {
          animation: flicker 4s infinite;
        }

        .scanline {
          animation: scanline 5s linear infinite;
        }

        .glow-ring {
          animation: glow-ring 2s ease-in-out infinite;
        }
      `}</style>

      <motion.div
        className="fixed inset-0 z-99999 bg-black overflow-hidden flex items-center justify-center screen-flicker"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Matrix Background */}
        {isClient && <MatrixRain />}

        {/* Scanline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scanline absolute w-full h-24 bg-linear-to-b from-transparent via-cyan-400/10 to-transparent" />
        </div>

        {/* Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_65%)]" />

        {/* Rotating Rings */}
        <div className="absolute w-[260px] h-[260px] md:w-[420px] md:h-[420px] border border-cyan-500/20 rounded-full rotate-ring" />
        <div className="absolute w-[180px] h-[180px] md:w-[300px] md:h-[300px] border border-purple-500/20 rounded-full rotate-ring" style={{ animationDirection: "reverse" }} />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 w-full max-w-2xl">
          {/* AI Orb */}
          <motion.div
            className="relative mb-6 sm:mb-8 md:mb-10 glow-pulse"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-60 absolute inset-0" />

            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border border-cyan-400/30 bg-black/40 backdrop-blur-xl flex items-center justify-center glow-ring">
              <div className="text-cyan-300 text-2xl sm:text-4xl md:text-5xl font-black tracking-widest">
                A
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-6xl font-black mb-2 sm:mb-3 md:mb-4 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wider text-center"
          >
            ASHOK KUMAR
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-8 uppercase text-center"
          >
            Neural Portfolio Interface
          </motion.div>

          {/* Typing Animation */}
          <motion.div
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-[24px] sm:min-h-[28px] text-green-400 font-mono text-[10px] sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8 tracking-widest text-center px-2 h-6"
          >
            {typedText}
            <span className="animate-pulse">_</span>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[520px] px-2"
          >
            <div className="flex justify-between text-[9px] sm:text-xs text-cyan-400 mb-2 tracking-widest">
              <span>SYSTEM BOOT</span>
              <span>{pct}%</span>
            </div>

            <div className="h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden border border-cyan-500/20 backdrop-blur-md">
              <motion.div
                className="h-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                animate={{ width: `${pct}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 sm:mt-8 md:mt-10 w-full max-w-[520px] bg-black/40 border border-cyan-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-md text-[9px] sm:text-xs font-mono text-green-400 space-y-0.5 sm:space-y-1 shadow-2xl px-4"
          >
            <div>{"> Initializing encrypted protocols..."}</div>
            <div>{"> Loading neural architecture..."}</div>
            <div>{"> Syncing blockchain identity..."}</div>
            <div>{"> Accessing decentralized systems..."}</div>
            <div className="text-cyan-400">{"> AI authentication complete ✓"}</div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 sm:mt-6 md:mt-8 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-cyan-500 uppercase text-center"
          >
            Quantum Security Layer Active
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
/* ─────────────────────────────────────────
   PARTICLE BACKGROUND
───────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}


/* ─────────────────────────────────────────
   GLITCH TEXT
───────────────────────────────────────── */
function GlitchText({ children, className }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 text-cyan-400 opacity-0 hover:opacity-70 transition-opacity duration-100"
        style={{ clipPath: "inset(30% 0 50% 0)", transform: "translate(-2px, 0)" }}
        aria-hidden
      >{children}</span>
      <span
        className="absolute inset-0 text-purple-400 opacity-0 hover:opacity-70 transition-opacity duration-100"
        style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, 0)" }}
        aria-hidden
      >{children}</span>
    </span>
  );
}

/* ─────────────────────────────────────────
   COUNT-UP
───────────────────────────────────────── */
function CountUp({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────── */
function MagneticButton({ children, className, onClick, href, target, download }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? "a" : "button";
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ x, y }} className="inline-block">
      <Tag href={href} target={target} download={download} onClick={onClick} className={className}>
        {children}
      </Tag>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────── */
function SkillBar({ name, level, icon }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-200">{icon} {name}</span>
        <span className="text-xs text-cyan-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-cyan-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────── */
function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────
   TILT CARD
───────────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
   FIX #12: WhatsApp integration
───────────────────────────────────────── */
const WHATSAPP_NUMBER = "916382807639"; // +91 6382807639 in international format
const WHATSAPP_DEFAULT_MSG = encodeURIComponent(
  "Hi Ashok! I found your portfolio and I'm interested in discussing a Web3 project with you. 🚀"
);

function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 300 }}
      className="fixed bottom-6 right-6 z-9990 flex flex-col items-end gap-2"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="bg-[#111118] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-200 whitespace-nowrap shadow-xl"
          >
            💬 Chat on WhatsApp
            <div className="text-gray-500 text-[10px] mt-0.5">Typically replies within 1 hour</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        }}
      >
        {/* WhatsApp SVG Icon */}
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-green-400/30 animate-ping" />
      </motion.a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SHARED CARD SHELL
───────────────────────────────────────── */
function SharedCardShell({ variant = "project", color = "from-cyan-500 to-purple-600", children, className = "", ...props }) {
  const intensity = variant === "hero" ? 1 : 0.6;
  const glowColor = color.includes('orange') || color.includes('amber') ? 'rgba(251,146,60,' : color.includes('purple') || color.includes('pink') ? 'rgba(168,85,247,' : color.includes('emerald') || color.includes('teal') ? 'rgba(16,185,129,' : 'rgba(34,211,238,';
  const borderColor = color.includes('orange') || color.includes('amber') ? 'orange' : color.includes('purple') || color.includes('pink') ? 'purple' : color.includes('emerald') || color.includes('teal') ? 'emerald' : 'cyan';

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-white/10 bg-linear-to-br from-white/4 to-transparent backdrop-blur-sm ${variant === 'hero' ? 'glow-card' : ''} ${className}`}
      style={{
        boxShadow: variant === 'hero' ? undefined : `0 0 20px ${glowColor}${0.15 * intensity})`
      }}
      {...props}
    >
      {/* Layer 1: Animated Blurred Orbs */}
      <div
        className={`absolute -top-32 -right-32 w-48 h-48 rounded-full bg-linear-to-br ${color} blur-[100px] opacity-15 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none animate-[float_8s_ease-in-out_infinite]`}
        style={{ zIndex: 0, opacity: 0.15 * intensity }}
      />
      <div
        className={`absolute -bottom-32 -left-32 w-40 h-40 rounded-full bg-linear-to-br ${color} blur-[100px] opacity-12 group-hover:opacity-18 transition-opacity duration-500 pointer-events-none animate-[float_10s_ease-in-out_infinite_reverse]`}
        style={{ zIndex: 0, opacity: 0.12 * intensity }}
      />

      {/* Layer 2: Animated Gradient Sweep */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${color} opacity-8 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none`}
        style={{
          zIndex: 1,
          opacity: 0.08 * intensity,
          backgroundSize: '400% 400%',
          animation: 'gradient-sweep 18s ease infinite'
        }}
      />

      {/* Animated Border Lines */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-${borderColor}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ zIndex: 2, opacity: 0.5 * intensity }}
      />
      <div
        className={`absolute -top-px right-12 w-32 h-px bg-${borderColor}-500 opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
        style={{ zIndex: 2, opacity: 0.3 * intensity }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED GLOW
───────────────────────────────────────── */
function AnimatedGlow({ color = "from-cyan-500 to-purple-600", className = "" }) {
  const glowColor = color.includes('orange') || color.includes('amber') ? 'rgba(251,146,60,0.3)' : color.includes('purple') || color.includes('pink') ? 'rgba(168,85,247,0.3)' : color.includes('emerald') || color.includes('teal') ? 'rgba(16,185,129,0.3)' : 'rgba(34,211,238,0.3)';

  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl pointer-events-none ${className}`}
      style={{
        boxShadow: `0 0 60px ${glowColor}, 0 0 100px ${glowColor}`,
        opacity: 0.6
      }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

/* ─────────────────────────────────────────
   CARD BORDER BEAM
───────────────────────────────────────── */
function CardBorderBeam({ color = "cyan", className = "" }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl pointer-events-none ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${color === 'cyan' ? 'rgba(34,211,238,0.5)' : color === 'purple' ? 'rgba(168,85,247,0.5)' : color === 'orange' ? 'rgba(251,146,60,0.5)' : color === 'emerald' ? 'rgba(16,185,129,0.5)' : 'rgba(251,191,36,0.5)'}, transparent)`,
        backgroundSize: '200% 100%'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

/* ─────────────────────────────────────────
   FEATURE CHIP
───────────────────────────────────────── */
function FeatureChip({ feature, color = "cyan", index = 0 }) {
  const dotColor = color === 'orange' || color === 'amber' ? 'bg-orange-400' : color === 'purple' || color === 'pink' ? 'bg-purple-400' : color === 'emerald' || color === 'teal' ? 'bg-emerald-400' : 'bg-cyan-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.05 }}
      className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 border border-white/8 px-3 py-2 rounded-lg hover:bg-white/10 hover:border-white/15 transition-all duration-300 cursor-default"
    >
      <span className={`w-1 h-1 rounded-full ${dotColor} animate-pulse`} />
      {feature}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PROJECT BADGE
───────────────────────────────────────── */
function ProjectBadge({ badge, color = "from-cyan-500 to-purple-600" }) {
  const badgeColor = badge === 'LIVE' || badge === 'Live' ? 'bg-white' : badge === 'Building' ? 'bg-emerald-400' : badge === 'Coming Soon' ? 'bg-purple-400' : 'bg-cyan-400';

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-linear-to-r ${color}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className={`w-1.5 h-1.5 rounded-full ${badgeColor}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {badge}
    </motion.span>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ project, index, expandedCards, setExpandedCards, setSelectedProject }) {
  const borderColor = project.color.includes('orange') || project.color.includes('amber') ? 'orange' : project.color.includes('purple') || project.color.includes('pink') ? 'purple' : project.color.includes('emerald') || project.color.includes('teal') ? 'emerald' : 'cyan';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative"
    >
      <SharedCardShell variant="project" color={project.color} className="flex flex-col h-full rounded-2xl overflow-hidden">
        {/* Animated Glow Layer */}
        <AnimatedGlow color={project.color} className="rounded-2xl" />

        {/* Border Beam */}
        <CardBorderBeam color={borderColor} className="rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Moving Gradient */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-transparent"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 200%' }}
          />

          {/* Blockchain Dots Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-1/2 left-4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full" />
          </div>

          {/* Light Streak */}
          <motion.div
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '400%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Floating Corner Accent */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center text-lg"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {project.category === 'business' ? '🛒' : project.category === 'web3' ? '⛓️' : project.category === 'ai' ? '🤖' : project.category === 'upcoming' ? '🚀' : '💎'}
        </motion.div>

        {/* Top Accent Line */}
        <div className={`h-1 w-full bg-linear-to-r ${project.color} relative z-10`} />

        {/* Cover Image */}
        {project.coverImage && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-transparent" />
          </div>
        )}

        <div className="flex-1 p-6 flex flex-col relative z-10">
          {/* Project Badge */}
          <div className="flex items-center gap-2 mb-4">
            <ProjectBadge badge={project.badge} color={project.color} />
          </div>

          <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{project.title}</h3>

          <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">{project.shortDescription || project.description}</p>

          {/* Mobile: Expandable Features */}
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              {!expandedCards[project.title] ? (
                <motion.button
                  key="expand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpandedCards(prev => ({ ...prev, [project.title]: true }))}
                  className="w-full text-xs text-cyan-400 hover:text-cyan-300 font-medium transition mb-4"
                >
                  Show More ↓
                </motion.button>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.features.slice(0, 4).map((f, idx) => (
                      <FeatureChip key={f} feature={f} color={borderColor} index={idx} />
                    ))}
                  </div>
                  <button
                    onClick={() => setExpandedCards(prev => ({ ...prev, [project.title]: false }))}
                    className="w-full text-xs text-cyan-400 hover:text-cyan-300 font-medium transition mb-4"
                  >
                    Show Less ↑
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: Always show features */}
          <div className="hidden sm:block grid grid-cols-2 gap-2 mb-6">
            {project.features.slice(0, 4).map((f, idx) => (
              <FeatureChip key={f} feature={f} color={borderColor} index={idx} />
            ))}
          </div>

          {/* Premium Card Footer */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5 mt-auto">
            <motion.button
              onClick={() => setSelectedProject(project)}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition relative group/btn"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white font-medium transition relative"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                ↗ Live Demo
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            )}
            {!project.live && !project.github && (
              <span className="text-xs text-gray-500">🔨 In Development</span>
            )}
          </div>
        </div>
      </SharedCardShell>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ARCHITECTURE MODAL
───────────────────────────────────────── */
function ArchitectureModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  const architectureSteps = [
    {
      step: "01",
      title: "Data Collection",
      description: "Tamil manuscripts, temple inscriptions, and palm leaf archives are digitized using OCR technology",
      icon: "📜",
      color: "from-yellow-500 to-amber-500"
    },
    {
      step: "02", 
      title: "Verification",
      description: "Multi-validator system authenticates historical accuracy and cultural significance",
      icon: "🔍",
      color: "from-cyan-500 to-blue-500"
    },
    {
      step: "03",
      title: "Blockchain Storage", 
      description: "Verified records are immutably stored on Ethereum with cryptographic proof of authenticity",
      icon: "⛓️",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "04",
      title: "IPFS Storage",
      description: "High-resolution images and documents are decentralized on IPFS for permanent availability",
      icon: "📦",
      color: "from-emerald-500 to-teal-500"
    },
    {
      step: "05",
      title: "Frontend Explorer",
      description: "Public interface for browsing, searching, and experiencing Tamil heritage digitally",
      icon: "🖥️",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10000 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#0a0a0f] border border-yellow-500/30 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-yellow-500/20 my-4 sm:my-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-linear-to-r from-yellow-500/20 to-amber-500/20 border-b border-yellow-500/30 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-1">
                    System Architecture
                  </h3>
                  <p className="text-yellow-400 text-xs sm:text-sm">{project.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm sm:text-base"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Architecture Flow */}
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden sm:block absolute top-16 left-8 right-8 h-0.5 bg-linear-to-r from-yellow-500/50 via-cyan-500/50 to-purple-500/50" />

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {architectureSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="bg-white/3 border border-white/10 rounded-2xl p-3 sm:p-4 hover:border-yellow-500/30 transition-all hover:bg-white/5 group">
                        {/* Step Number */}
                        <div className={`w-8 h-8 rounded-lg bg-linear-to-r ${step.color} flex items-center justify-center text-xs font-bold text-white mb-2 sm:mb-3 mx-auto`}>
                          {step.step}
                        </div>

                        {/* Icon */}
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">{step.icon}</div>

                        {/* Title */}
                        <h4 className="font-display font-bold text-white text-xs sm:text-sm mb-2 text-center">
                          {step.title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed text-center wrap-break-word">
                          {step.description}
                        </p>

                        {/* Arrow for desktop */}
                        {index < architectureSteps.length - 1 && (
                          <div className="hidden sm:flex absolute top-1/2 -right-2 transform -translate-y-1/2 text-yellow-500/50">
                            →
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Integration */}
              <div className="mt-8 bg-white/2 border border-white/8 rounded-2xl p-6">
                <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">⚡</span> Technology Integration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        ⛓️
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">Ethereum Blockchain</p>
                        <p className="text-gray-400 text-xs truncate">Immutable record storage</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                        📦
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">IPFS Network</p>
                        <p className="text-gray-400 text-xs truncate">Decentralized file storage</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        🔍
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">Tesseract OCR</p>
                        <p className="text-gray-400 text-xs truncate">Manuscript digitization</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                        ✅
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">Multi-Validator System</p>
                        <p className="text-gray-400 text-xs truncate">Consensus-based verification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/2 border border-white/8 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-white text-xs font-medium">Cryptographic Security</p>
                </div>
                <div className="bg-white/2 border border-white/8 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-white text-xs font-medium">Gas Optimized</p>
                </div>
                <div className="bg-white/2 border border-white/8 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🌐</div>
                  <p className="text-white text-xs font-medium">Decentralized</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   PROJECT DETAILS MODAL
───────────────────────────────────────── */
function ProjectDetailsModal({ isOpen, onClose, project }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#0a0a0f] border border-cyan-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-linear-to-r ${project.color} border-b border-white/10 p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-white/20 mb-2`}>
                    {project.badge}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">{project.title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Cover Image */}
              {project.coverImage && (
                <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-display font-bold text-lg text-white mb-3">About</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              {project.tech && (
                <div className="mb-6">
                  <h4 className="font-display font-bold text-lg text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-display font-bold text-lg text-white mb-3">Features</h4>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400">▸</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              {project.quote && (
                <div className="mb-6 p-4 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                  <p className="text-cyan-400 text-sm italic text-center leading-relaxed">
                    &ldquo;{project.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer"
                    className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium">
                    ↗ Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition text-sm font-medium">
                    ⌥ GitHub
                  </a>
                )}
                {project.caseStudy && (
                  <a href={project.caseStudy} target="_blank" rel="noreferrer"
                    className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition text-sm font-medium">
                    🏛️ Case Study
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   MAIN PORTFOLIO
───────────────────────────────────────── */
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);

  // FIX #4: formStatus now has granular error messaging
  // FIX #7, #8: async error handling with real error details
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error
  const [formError, setFormError] = useState("");

  const [activeTab, setActiveTab] = useState("all");
  const [architectureModal, setArchitectureModal] = useState({ open: false, project: null });
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  // FIX #4: formData state replaces uncontrolled ref — no more ref/value mismatch
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_type: "",
    message: "",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── Wallet ── */
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask to connect your wallet.");
    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("[wallet]", err);
    } finally {
      setConnecting(false);
    }
  };

  /* ── Form field handler ── */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── Contact Form ──
     FIX #1, #2, #3: Calls our secure /api/contact route — no credentials in browser
     FIX #5: template_params keys match EmailJS template: from_name, from_email, project_type, message
     FIX #7, #8: full async/await with proper .catch and real error logging
     FIX #10: server validates env vars, client shows real error message
     FIX #11: migrated to Next.js API route
  ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // FIX #8: surface the actual error reason
        console.error("[contact form] API error:", res.status, data);
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setFormStatus("sent");
      setFormData({ name: "", email: "", project_type: "", message: "" });

    } catch (err) {
      // FIX #7: .catch equivalent — always capture real error
      console.error("[contact form] Submit error:", err);
      setFormError(err.message || "Something went wrong. Please email directly.");
      setFormStatus("error");
    }
  };

  /* ── WhatsApp pre-filled message from form ── */
  const buildWhatsAppURL = () => {
    const namePart  = formData.name    ? `My name is ${formData.name}.` : "";
    const projPart  = formData.project_type ? ` I'm interested in: ${formData.project_type}.` : "";
    const msgPart   = formData.message ? ` ${formData.message}` : "";
    const text = `Hi Ashok! ${namePart}${projPart}${msgPart}`.trim();
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  /* ── Data ── */
  const skills = [
    { name: "Solidity", level: 90, icon: "⬡" },
    { name: "React / Next.js", level: 88, icon: "⚛" },
    { name: "Ethers.js / Web3.js", level: 85, icon: "🔗" },
    { name: "IPFS / Filecoin", level: 80, icon: "📦" },
    { name: "Hardhat / Foundry", level: 82, icon: "🔨" },
    { name: "TypeScript", level: 78, icon: "𝗧" },
    { name: "Node.js / Spring Boot", level: 75, icon: "🟢" },
    { name: "Tailwind CSS", level: 92, icon: "🎨" },
  ];

  const projects = [
    {
      tag: "business",
      title: "Chennai Buyers",
      shortDescription: "Premium shopping concierge platform helping customers source, inspect, verify, and receive products directly from Chennai's most trusted markets.",
      description: "A full-featured commerce platform connecting global customers with Chennai's iconic shopping destinations through personal shopping, product verification, live video inspection, order tracking, and international delivery workflows.",
      features: [
        "Product Verification",
        "Video Inspection",
        "Global Delivery",
        "Bulk Sourcing",
        "Product sourcing across Chennai markets",
        "Product inspection & quality verification",
        "Live video confirmation",
        "International shipping workflow",
        "WhatsApp lead generation",
        "Order tracking experience"
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      coverImage: "/projects/chennai-buyers.jpg",
      badge: "LIVE",
      color: "from-orange-500 to-amber-500",
      live: "https://chennai-buyers.vercel.app/",
      github: "https://github.com/akk26121993-ship-it",
    },
    {
      tag: "web3",
      title: "NFT Marketplace dApp",
      shortDescription: "Fully decentralized NFT marketplace with minting, trading, and IPFS storage.",
      description: "Fully decentralized NFT marketplace with minting, trading, and IPFS storage. Built with React, Solidity, and IPFS for a complete Web3 experience.",
      features: ["Mint NFTs with IPFS", "Buy/Sell using ETH", "MetaMask wallet integration"],
      tech: ["React", "Solidity", "IPFS", "Ethers.js", "Tailwind CSS"],
      badge: "Live",
      color: "from-cyan-500 to-blue-600",
      live: "https://nft-marketplace-tau-sepia.vercel.app",
      github: "https://github.com/akk26121993-ship-it/nft-marketplace",
    },
    {
      tag: "web3",
      title: "Smart Contract System",
      shortDescription: "Secure Solidity contracts with optimized gas usage and marketplace logic.",
      description: "Secure Solidity contracts with optimized gas usage and marketplace logic. Implements ERC-721 standard with event-driven architecture for maximum efficiency.",
      features: ["ERC-721 implementation", "Gas optimized functions", "Event-driven architecture"],
      tech: ["Solidity", "Hardhat", "OpenZeppelin", "Ethers.js"],
      badge: "Solidity",
      color: "from-purple-500 to-pink-600",
      github: "https://github.com/akk26121993-ship-it",
    },
    {
      tag: "ai",
      title: "Web3 AI Trading Platform",
      shortDescription: "Next-generation decentralized trading platform combining AI-driven market insights with real-time on-chain analytics.",
      description: "A next-generation decentralized trading platform combining AI-driven market insights, real-time on-chain analytics, and smart contract automation across multiple chains.",
      features: ["AI Trading Signals", "On-chain Analytics", "Multi-chain Support", "Wallet Integration", "Low Gas Fees", "Real-time Dashboard"],
      tech: ["Python", "TensorFlow", "Solidity", "React", "Web3.js"],
      badge: "Coming Soon",
      color: "from-cyan-500 to-purple-600",
    },
    {
      tag: "upcoming",
      title: "DAO Governance Module",
      shortDescription: "On-chain voting and proposal system for decentralized organizations.",
      description: "On-chain voting and proposal system for decentralized organizations. Features token-weighted governance with timelock execution for security.",
      features: ["Proposal creation & voting", "Token-weighted governance", "Timelock execution"],
      tech: ["Solidity", "OpenZeppelin", "React"],
      badge: "Building",
      color: "from-emerald-500 to-teal-600",
    },
    {
      tag: "web3",
      title: "Immutable Tamil Heritage Archive",
      shortDescription: "Decentralized archival system preserving Tamil heritage permanently using blockchain verification and IPFS storage.",
      description: "A decentralized archival system that preserves Tamil heritage permanently using blockchain verification, IPFS decentralized storage, and multi-validator authentication.",
      features: [
        "Blockchain-based tamper-proof archive",
        "IPFS decentralized storage",
        "Multi-validator approval system",
        "Tamil OCR manuscript digitization",
        "Temple inscription preservation",
        "Public heritage explorer",
        "Digital museum experience",
        "Historical authenticity verification"
      ],
      tech: ["React", "Tailwind CSS", "Solidity", "Ethereum", "IPFS", "Ethers.js", "Tesseract OCR", "Framer Motion"],
      coverImage: "/projects/tamil-heritage.jpg",
      badge: "Upcoming Project",
      color: "from-yellow-500 to-amber-600",
      quote: "Building permanence for Tamil civilization — one block at a time.",
      github: "https://github.com/akk26121993-ship-it",
      caseStudy: "/tamil-heritage",
    },
  ];

  const services = [
    { icon: "🖼", title: "NFT Marketplace", price: "$500+", desc: "Full-stack NFT platform with minting, trading & IPFS storage." },
    { icon: "📜", title: "Smart Contracts", price: "$200+", desc: "Secure, gas-optimized Solidity contracts with full test coverage." },
    { icon: "🔌", title: "Web3 Integration", price: "$150+", desc: "Wallet connect, Ethers.js, and seamless frontend integration." },
    { icon: "🤖", title: "AI + Web3 dApps", price: "$800+", desc: "AI-powered decentralized applications combining GPT & blockchain." },
    { icon: "🏛", title: "DAO Setup", price: "$350+", desc: "On-chain governance, tokenomics design, and DAO deployment." },
    { icon: "🔍", title: "Smart Contract Audit", price: "$300+", desc: "Security-focused review identifying vulnerabilities and gas inefficiencies." },
  ];

  const testimonials = [
    { name: "Alex R.", role: "Startup Founder", text: "Delivered our NFT marketplace faster than expected. Clean code and great communication throughout the project." },
    { name: "Priya M.", role: "Web3 Client", text: "Strong understanding of smart contracts and frontend integration. Will definitely work together again." },
    { name: "James K.", role: "Freelance Client", text: "Professional, responsive, and very skilled in Web3 development. One of the best devs I've worked with." },
  ];

  const navLinks = ["home", "projects", "skills", "services", "about", "contact"];
  const filteredProjects = activeTab === "all" ? projects : projects.filter((p) => p.tag === activeTab);
  if (loading) {
  return <LoadingScreen onComplete={() => setLoading(false)} />;
}
  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden font-sans selection:bg-cyan-400/20">

      {/* ── Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        code, .mono { font-family: 'JetBrains Mono', monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee, #a855f7, #ec4899, #22d3ee);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float { animation: float 5s ease-in-out infinite; }
        @keyframes gradient-sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.3); }
          50% { box-shadow: 0 0 50px rgba(34,211,238,0.6), 0 0 80px rgba(168,85,247,0.3); }
        }
        .glow-card { animation: glow-pulse 3s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#22d3ee, #a855f7); border-radius: 2px; }
        /* WhatsApp button pulse fix on mobile */
        @media (max-width: 640px) {
          .wa-float { bottom: 1.25rem; right: 1rem; }
        }
      `}</style>

      {/* ── Custom Cursor (desktop only) ── */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* ── Particle Background ── */}
      <ParticleField />

      {/* ── WhatsApp Floating Button ── */}
      <WhatsAppFloat />

      {/* ── Architecture Modal ── */}
      <ArchitectureModal
        isOpen={architectureModal.open}
        onClose={() => setArchitectureModal({ open: false, project: null })}
        project={architectureModal.project}
      />

      {/* ── Project Details Modal ── */}
      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* ── Ambient Glow Orbs ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[700px] h-[700px] bg-purple-700/10 rounded-full blur-[120px] bottom-[-200px] right-[-200px]" />
        <div className="absolute w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 z-9999"
        style={{ width: progressWidth }}
      />

      {/* ═══════════════════════════════════
          NAVBAR
      ═══════════════════════════════════ */}
      <nav className="fixed top-0 w-full z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 my-3">
          <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-lg shadow-black/20">
            <a href="#home" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-black">AK</span>
              <span className="font-bold text-sm tracking-wide hidden sm:block">ASHOK KUMAR</span>
            </a>

            <div className="hidden md:flex gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg capitalize transition-all duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={connectWallet}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${account ? "bg-green-400" : "bg-gray-500"}`} />
                {account ? account.slice(0, 6) + "..." + account.slice(-4) : "Wallet"}
              </button>

              {/* WhatsApp in navbar (desktop) */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/10 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mx-4 mt-1 bg-[#0a0a12]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 capitalize border-b border-white/5 last:border-none transition"
                >
                  {link}
                </a>
              ))}
              <div className="px-5 py-4 flex flex-col gap-2">
                <button
                  onClick={() => { connectWallet(); setMenuOpen(false); }}
                  className="w-full py-2.5 text-sm border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition"
                >
                  {account ? `Connected: ${account.slice(0, 8)}...` : "🦊 Connect Wallet"}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 text-sm border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/10 transition text-center"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section id="home" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for Web3 Projects · Open to Work
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-none mb-4">
            <span className="block text-white"></span>
            <span className="block shimmer-text">AK</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mono text-sm sm:text-base text-cyan-400/80 tracking-[0.2em] uppercase mb-6"
        >
          &gt; Full Stack Developer &amp; Web3 Engineer_
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed mb-10"
        >
          Building production-grade software — from business applications and AI systems to Web3 products and smart contracts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <MagneticButton
            href="#projects"
            className="px-6 py-3 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
          >
            View My Work →
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-6 py-3 border border-white/15 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Hire Me 🚀
          </MagneticButton>
          <MagneticButton
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
            target="_blank"
            className="px-6 py-3 border border-green-500/30 text-green-400 rounded-xl text-sm font-medium hover:bg-green-500/10 transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </MagneticButton>
          <MagneticButton
            onClick={connectWallet}
            className="px-6 py-3 border border-cyan-500/30 text-cyan-400 rounded-xl text-sm font-medium hover:bg-cyan-500/10 transition-colors"
          >
            {connecting ? "Connecting…" : account ? `🟢 ${account.slice(0, 6)}...` : "🦊 Connect Wallet"}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-14"
        >
          {[
            { label: "Projects Deployed", value: 10, suffix: "+" },
            { label: "Smart Contracts", value: 25, suffix: "+" },
            { label: "Satisfied Clients", value: 12, suffix: "+" },
            { label: "GitHub Commits", value: 300, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white font-display">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════
          FEATURED: UPCOMING PROJECT
      ═══════════════════════════════════ */}
      <Section className="mt-8 mb-20">
        <TiltCard>
          <SharedCardShell variant="hero" color="from-cyan-500 to-purple-600" className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                🚀 Flagship Upcoming Project
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3 leading-tight">
                Web3 AI Trading<br />Platform
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-6">
                A next-generation decentralized trading platform combining AI-driven market insights, real-time on-chain analytics, and smart contract automation across multiple chains.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {["AI Trading Signals", "On-chain Analytics", "Multi-chain Support", "Wallet Integration", "Low Gas Fees", "Real-time Dashboard"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 border border-white/8 px-3 py-2 rounded-lg">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <MagneticButton className="px-5 py-2.5 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl text-sm font-semibold hover:opacity-90 transition">
                  🚀 Coming Soon
                </MagneticButton>
                <MagneticButton className="px-5 py-2.5 border border-white/15 text-sm rounded-xl hover:bg-white/5 transition">
                  🔔 Join Waitlist
                </MagneticButton>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-3 float">
              <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-5xl">🤖</div>
              <div className="text-xs text-gray-500 text-center">AI + Web3<br />Powered</div>
            </div>
          </div>
          </SharedCardShell>
        </TiltCard>
      </Section>

      {/* ═══════════════════════════════════
          PROJECTS
      ═══════════════════════════════════ */}
      <Section id="projects" className="mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// portfolio"}</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl">🔥 Projects</h2>
          </div>
          <div className="sm:ml-auto flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
            {["all", "business", "web3", "ai", "upcoming"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  activeTab === tab ? "bg-linear-to-r from-cyan-500 to-purple-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "all" ? "All" : tab === "business" ? "Business Apps" : tab === "web3" ? "Web3" : tab === "ai" ? "AI" : "Upcoming"}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                expandedCards={expandedCards}
                setExpandedCards={setExpandedCards}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════
          SKILLS
      ═══════════════════════════════════ */}
      <Section id="skills" className="mb-24">
        <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// expertise"}</span>
        <h2 className="font-display font-black text-3xl sm:text-4xl mb-10">⚡ Technical Skills</h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 bg-white/2 border border-white/8 rounded-2xl p-6 sm:p-10">
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["ERC-721", "ERC-20", "OpenZeppelin", "Chainlink", "The Graph", "IPFS", "Polygon", "Ethereum", "MySQL", "Java", "Spring Boot"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SERVICES
      ═══════════════════════════════════ */}
      <Section id="services" className="mb-24">
        <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// offerings"}</span>
        <h2 className="font-display font-black text-3xl sm:text-4xl mb-10">💼 Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 bg-white/3 border border-white/10 rounded-2xl hover:border-cyan-500/20 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-display font-bold text-white mb-1">{s.title}</h3>
              <p className="text-cyan-400 text-sm font-semibold mb-2">{s.price}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          HOW I WORK
      ═══════════════════════════════════ */}
      <Section className="mb-24">
        <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// process"}</span>
        <h2 className="font-display font-black text-3xl sm:text-4xl mb-10 text-center">⚙️ How I Work</h2>
        <div className="relative">
          <div className="hidden sm:block absolute top-10 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discovery", desc: "Deep-dive into your requirements, goals, and technical constraints.", icon: "🔍" },
              { step: "02", title: "Architecture", desc: "Design the system, select the tech stack, and plan the smart contract structure.", icon: "📐" },
              { step: "03", title: "Development", desc: "Write clean, tested, and gas-optimized code with regular updates.", icon: "💻" },
              { step: "04", title: "Deployment", desc: "Deploy, verify contracts, set up monitoring, and hand off documentation.", icon: "🚀" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center p-6 bg-white/3 border border-white/8 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="mono text-xs text-cyan-400 mb-1">{item.step}</div>
                <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════ */}
      <Section className="mb-24">
        <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// social proof"}</span>
        <h2 className="font-display font-black text-3xl sm:text-4xl mb-10">⭐ Client Reviews</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative p-6 bg-white/3 border border-white/10 rounded-2xl"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          ABOUT
      ═══════════════════════════════════ */}
      <Section id="about" className="mb-24">
        <div className="grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// about me"}</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl mb-6">👨‍💻 Who I Am</h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                I hold a certification in <span className="text-white font-medium">Blockchain Technology from IIT Kanpur</span>, where I developed a strong foundation in decentralized systems and cryptography.
              </p>
              <p>
                As a <span className="text-white font-medium">Full Stack Web3 Developer</span>, I specialize in building production-grade dApps — from gas-optimized Solidity contracts to pixel-perfect React frontends. I&apos;m also advancing in Java and Spring Boot for enterprise backend systems.
              </p>
              <p>
                Driven by curiosity and a commitment to <span className="text-white font-medium">continuous learning</span>, I actively explore emerging technologies and build projects that create real-world value.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                href="/resume.pdf"
                download
                className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition"
              >
                📄 Download Resume
              </MagneticButton>
              <MagneticButton
                href="https://calendly.com/akk26121993"
                target="_blank"
                className="px-5 py-2.5 border border-white/15 text-sm rounded-xl hover:bg-white/5 transition"
              >
                📅 Book a Call
              </MagneticButton>
            </div>
          </div>

          <TiltCard className="p-6 bg-white/3 border border-white/10 rounded-2xl">
            <div className="space-y-4">
              {[
                { icon: "🎓", label: "Education", value: "Blockchain Cert · IIT Kanpur" },
                { icon: "💼", label: "Focus", value: "Web3 · Smart Contracts · dApps" },
                { icon: "📍", label: "Location", value: "Chennai,Tamil Nadu, India" },
                { icon: "🌐", label: "Available", value: "Remote Worldwide" },
                { icon: "⏰", label: "Experience", value: "2+ Years in Web3" },
                { icon: "📬", label: "Email", value: "akk26121993@gmail.com" },
                { icon: "💬", label: "WhatsApp", value: "+91 63828 07639" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-none">
                  <span className="text-xl w-8 text-center">{item.icon}</span>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <Section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-16 text-center bg-linear-to-br from-cyan-500/10 via-purple-600/10 to-pink-600/10">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          <h2 className="font-display font-black text-3xl sm:text-5xl mb-4">
            Ready to Build<br /><span className="shimmer-text">Something Big?</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base mb-8">
            I help founders and startups build powerful Web3 products — from NFT marketplaces to AI-powered dApps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="#contact" className="px-7 py-3 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition">
              💼 Start a Project
            </MagneticButton>
            <MagneticButton
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
              target="_blank"
              className="px-7 py-3 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/10 transition flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Me
            </MagneticButton>
            <MagneticButton href="https://calendly.com/akk26121993" target="_blank" className="px-7 py-3 border border-white/15 rounded-xl hover:bg-white/5 transition">
              📅 Schedule a Call
            </MagneticButton>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          CONTACT
      ═══════════════════════════════════ */}
      <Section id="contact" className="mb-24">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <span className="text-xs text-cyan-400 uppercase tracking-widest mono mb-2 block">{"// contact"}</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl mb-4">Let&apos;s Build<br />Together 🚀</h2>
            <p className="text-gray-400 text-sm mb-8">Open for freelance Web3 projects, collaborations, and full-time opportunities.</p>

            <div className="space-y-4">
              {[
                { icon: "📧", label: "Email", value: "akk26121993@gmail.com", href: "mailto:akk26121993@gmail.com" },
                { icon: "🐙", label: "GitHub", value: "github.com/akk26121993-ship-it", href: "https://github.com/akk26121993-ship-it" },
                { icon: "🐦", label: "Twitter", value: "@Lifeofak26", href: "https://twitter.com/Lifeofak26" },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                  label: "WhatsApp",
                  value: "+91 63828 07639",
                  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`,
                  highlight: true,
                },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className={`flex items-center gap-4 p-4 bg-white/3 border rounded-xl transition-all group ${
                    c.highlight
                      ? "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5"
                      : "border-white/8 hover:border-cyan-500/30 hover:bg-white/6"
                  }`}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{c.label}</div>
                    <div className={`text-sm transition-colors ${c.highlight ? "text-green-300 group-hover:text-green-200" : "text-gray-200 group-hover:text-cyan-400"}`}>
                      {c.value}
                    </div>
                  </div>
                  {c.highlight && (
                    <span className="ml-auto text-[10px] text-green-400 border border-green-500/30 rounded-full px-2 py-0.5">
                      Fast reply
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact Form ──
              FIX #4: Controlled inputs with formData state (no uncontrolled ref issues)
              FIX #5: name attributes match EmailJS template_params exactly
              FIX #6: form calls /api/contact which uses correct IDs from env
              FIX #7, #8: real error messages displayed, not just "400"
              FIX #10: server validates env; client shows useful fallback message
              FIX #11: no SDK in browser, pure fetch to API route
          ── */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-white mb-6">Send a Message</h3>

            <AnimatePresence mode="wait">
              {formStatus === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="font-bold text-white text-lg mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm mb-4">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  {/* Also offer WhatsApp after successful form */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border border-green-500/30 text-green-400 rounded-xl text-sm hover:bg-green-500/10 transition mb-4"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Or chat on WhatsApp for faster reply
                  </a>
                  <button onClick={() => setFormStatus("idle")} className="text-xs text-cyan-400 hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1.5">Your Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Satoshi Nakamoto"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1.5">Email Address</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1.5">Project Type</label>
                      <select
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 transition"
                      >
                        <option value="" className="bg-gray-900">Select project type...</option>
                        <option value="NFT Marketplace" className="bg-gray-900">NFT Marketplace</option>
                        <option value="Smart Contracts" className="bg-gray-900">Smart Contracts</option>
                        <option value="Full-stack dApp" className="bg-gray-900">Full-stack dApp</option>
                        <option value="Web3 Integration" className="bg-gray-900">Web3 Integration</option>
                        <option value="Other" className="bg-gray-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe your project, timeline, and budget..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition resize-none"
                      />
                    </div>

                    {/* FIX #8: Show the actual error, not just a generic message */}
                    {formStatus === "error" && formError && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 text-xs mt-0.5">⚠</span>
                        <p className="text-red-400 text-xs">{formError}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSubmit}
                        disabled={formStatus === "sending"}
                        className="flex-1 py-3 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                      >
                        {formStatus === "sending" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Sending…
                          </span>
                        ) : "Send Message →"}
                      </button>

                      {/* WhatsApp as an alternative send method — pre-fills with form data */}
                      <a
                        href={buildWhatsAppURL()}
                        target="_blank"
                        rel="noreferrer"
                        title="Send via WhatsApp instead"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-green-500/30 text-green-400 rounded-xl text-sm hover:bg-green-500/10 transition sm:w-auto"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="hidden sm:inline">WhatsApp</span>
                        <span className="sm:hidden">Send via WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-[10px] text-gray-600 text-center">
                      Prefer a faster reply? Click the WhatsApp button or use the floating button →
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          FOOTER
      ═══════════════════════════════════ */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-black">AK</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()} Ashok Kumar · Web3 Developer</span>
          </div>
          <div className="flex gap-6">
            {["home", "projects", "skills", "contact"].map((link) => (
              <a key={link} href={`#${link}`} className="text-xs text-gray-600 hover:text-gray-300 capitalize transition">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:akk26121993@gmail.com" className="text-xs text-cyan-400 hover:text-cyan-300 transition">
              akk26121993@gmail.com
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-green-400 hover:text-green-300 transition flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
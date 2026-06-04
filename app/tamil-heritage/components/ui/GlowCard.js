"use client";

import React, { useRef, useState } from "react";

/**
 * Interactive card with mouse-following glow border and 3D tilt.
 */
export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(251, 191, 36, 0.4)",
  tiltIntensity = 8,
}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      background: `radial-gradient(circle at ${x}px ${y}px, ${glowColor} 0%, transparent 60%)`,
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      background: "transparent",
    });
  };

  // Touch handler for mobile
  const handleTouch = (e) => {
    const touch = e.touches[0];
    if (!touch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setStyle({
      transform: "perspective(800px) scale3d(1.02, 1.02, 1.02)",
      background: `radial-gradient(circle at ${x}px ${y}px, ${glowColor} 0%, transparent 60%)`,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      className={`th-glass-card relative overflow-hidden transition-transform duration-300 ${className}`}
      style={{
        transform: style.transform || "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-500"
        style={{ background: style.background || "transparent" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

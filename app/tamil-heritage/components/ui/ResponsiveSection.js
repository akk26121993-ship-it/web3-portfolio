"use client";

import React from "react";

/**
 * Reusable responsive section wrapper component
 * Ensures consistent responsive behavior across all chapters
 */
export default function ResponsiveSection({
  children,
  className = "",
  id = "",
  minHeight = "min-h-[100svh]",
  bgClass = "bg-[#050508]",
  overlayOpacityMobile = "bg-black/70",
  overlayOpacityDesktop = "bg-black/40",
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${minHeight} ${bgClass} ${className}`}
    >
      {/* Background layer - z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none" />

      {/* Effects layer - z-10 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 ${overlayOpacityMobile} md:${overlayOpacityDesktop} transition-opacity`} />
      </div>

      {/* Content layer - z-20 */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        {children}
      </div>
    </section>
  );
}

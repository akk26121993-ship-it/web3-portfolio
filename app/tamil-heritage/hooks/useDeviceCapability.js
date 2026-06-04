"use client";

import { useState, useEffect } from "react";

/**
 * Detects device capability tier for adaptive rendering.
 * Returns: { tier: 'high' | 'medium' | 'low', isMobile, isTablet, isDesktop, hasWebGL, pixelRatio }
 */
export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    tier: "medium",
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasWebGL: true,
    pixelRatio: 1,
    reducedMotion: false,
  });

  useEffect(() => {
    const width = window.innerWidth;
    const isMobile = width < 768 || "ontouchstart" in window && width < 1024;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check WebGL support
    let hasWebGL = false;
    let gpuTier = "medium";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) {
        hasWebGL = true;
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // High-end GPUs
          if (
            renderer.includes("nvidia") ||
            renderer.includes("radeon") ||
            renderer.includes("apple m") ||
            renderer.includes("apple gpu")
          ) {
            gpuTier = "high";
          }
          // Low-end / integrated
          if (
            renderer.includes("intel") ||
            renderer.includes("mesa") ||
            renderer.includes("swiftshader") ||
            renderer.includes("llvmpipe")
          ) {
            gpuTier = "low";
          }
        }
      }
    } catch {
      hasWebGL = false;
      gpuTier = "low";
    }

    // Calculate final tier
    let tier = gpuTier;
    if (isMobile) {
      tier = gpuTier === "high" ? "medium" : "low";
    }
    if (isTablet) {
      tier = gpuTier === "high" ? "high" : "medium";
    }
    if (reducedMotion) {
      tier = "low";
    }

    const frame = requestAnimationFrame(() => {
      setCapability({
        tier,
        isMobile,
        isTablet,
        isDesktop,
        hasWebGL,
        pixelRatio,
        reducedMotion,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return capability;
}

"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Parallax depth layer — wraps children with scroll-linked Y translation.
 */
export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
  direction = "up", // "up" | "down"
  opacityFade = false,
}) {
  const { scrollYProgress } = useScroll();

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, multiplier * speed * 500]
  );

  const fadeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const opacity = opacityFade ? fadeOpacity : 1;

  return (
    <motion.div
      className={`th-gpu ${className}`}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  );
}

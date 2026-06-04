"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked text reveal component.
 * Characters/words animate in as user scrolls past.
 */
export default function TextReveal({
  text,
  tag: Tag = "p",
  className = "",
  revealType = "word", // "word" | "character" | "line"
  staggerDelay = 0.03,
  once = true,
}) {
  const ref = useRef(null);

  const tokens = revealType === "character"
    ? text.split("")
    : revealType === "line"
    ? text.split("\n")
    : text.split(" ");

  return (
    <Tag ref={ref} className={`${className}`} style={{ overflow: "hidden" }}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once, margin: "-10%" }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            whiteSpace: revealType === "character" ? "pre" : "normal",
          }}
        >
          {token}
          {revealType !== "character" && revealType !== "line" ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

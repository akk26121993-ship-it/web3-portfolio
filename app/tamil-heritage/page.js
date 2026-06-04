"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the full experience — SSR disabled for Three.js + GSAP
const TamilHeritagePage = dynamic(
  () => import("./components/TamilHeritagePage"),
  {
    ssr: false,
    loading: () => <LoadingShell />,
  }
);

function LoadingShell() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      {/* Animated loading ring */}
      <div
        style={{
          width: 48,
          height: 48,
          border: "2px solid rgba(251, 191, 36, 0.1)",
          borderTop: "2px solid #fbbf24",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: 24,
        }}
      />
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Loading Experience
      </p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Page() {
  return <TamilHeritagePage />;
}

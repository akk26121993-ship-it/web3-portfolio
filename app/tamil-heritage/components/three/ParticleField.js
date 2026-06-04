"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Atmospheric dust/particle field using Three.js Points.
 * Particle count adapts to device capability.
 */
export default function ParticleField({ count = 300, color = "#fbbf24", spread = 30 }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    // Seeded pure pseudo-random number generator to satisfy react-hooks/purity
    let seed = 12345.67;
    const rand = () => {
      seed = Math.sin(seed) * 10000;
      return seed - Math.floor(seed);
    };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * spread;
      positions[i * 3 + 1] = (rand() - 0.5) * spread;
      positions[i * 3 + 2] = (rand() - 0.5) * spread;
      sizes[i] = rand() * 2 + 0.5;
      speeds[i] = rand() * 0.5 + 0.1;
    }

    return { positions, sizes, speeds };
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle drift
      positions[i3 + 1] += particles.speeds[i] * 0.005;
      positions[i3] += Math.sin(time * 0.3 + i) * 0.002;

      // Reset particles that drift too high
      if (positions[i3 + 1] > spread / 2) {
        positions[i3 + 1] = -spread / 2;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

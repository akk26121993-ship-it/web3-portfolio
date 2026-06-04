"use client";

import React, { useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * Floating palm leaf manuscript 3D objects.
 * Flat rectangular meshes that float and rotate gently.
 */
function PalmLeaf({ position, rotation, scale = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 * speed + position[0]) * 0.1;
  });

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={ref} position={position} rotation={rotation}>
        {/* Palm leaf shape — long flat rectangle with slight curve */}
        <boxGeometry args={[2.5 * scale, 0.05 * scale, 0.7 * scale]} />
        <meshStandardMaterial
          color="#8b6914"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Text lines on leaf */}
      {[-0.15, -0.05, 0.05, 0.15].map((z, i) => (
        <mesh key={i} position={[position[0], position[1] + 0.03, position[2] + z * scale]} rotation={rotation}>
          <boxGeometry args={[1.8 * scale, 0.005 * scale, 0.02 * scale]} />
          <meshStandardMaterial color="#5a4210" transparent opacity={0.6} />
        </mesh>
      ))}
    </Float>
  );
}

export default function FloatingLeaves({ count = 5 }) {
  const leaves = [
    { position: [-3, 1.5, -5], rotation: [0.1, 0.3, 0.05], scale: 0.8, speed: 1.2 },
    { position: [3.5, -1, -7], rotation: [-0.1, -0.5, 0.1], scale: 1, speed: 0.9 },
    { position: [-1, -2, -4], rotation: [0.2, 1.2, -0.1], scale: 0.6, speed: 1.5 },
    { position: [2, 2.5, -9], rotation: [-0.15, 0.8, 0.2], scale: 0.9, speed: 1.1 },
    { position: [-4, 0, -6], rotation: [0.05, -0.2, -0.05], scale: 0.7, speed: 1.3 },
  ].slice(0, count);

  return (
    <group>
      {leaves.map((leaf, i) => (
        <PalmLeaf key={i} {...leaf} />
      ))}
    </group>
  );
}

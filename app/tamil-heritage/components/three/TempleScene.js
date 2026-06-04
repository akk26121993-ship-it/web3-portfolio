"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedurally generated Brihadeeswarar Temple for the scroll-driven sequence.
 * scrollProgress (0-1) is mapped to 9 distinct narrative phases.
 */

// Colors & Materials
const STONE_COLOR = "#A09070";
const STONE_DARK = "#6B5B3D";
const STONE_LIGHT = "#D4C5A9";
const GOLD = "#FFD700";
const BLUEPRINT_COLOR = "#22d3ee"; // Cyan for vision phase

function TempleBase({ progress, isBlueprint }) {
  // Base emerges early (P1-P3)
  const y = progress < 0.22 ? -5 + (progress / 0.22) * 5 : 0;
  const opacity = progress < 0.11 ? progress / 0.11 : 1;

  // In P7 (Inscriptions), base glows slightly
  const emissive = progress > 0.66 && progress < 0.77 ? new THREE.Color("#fbbf24") : new THREE.Color("#000000");
  const emissiveIntensity = progress > 0.66 && progress < 0.77 ? 0.3 : 0;

  return (
    <group position={[0, y - 3, 0]}>
      {/* Main platform */}
      <mesh>
        <boxGeometry args={[6, 0.5, 4]} />
        <meshStandardMaterial 
          color={isBlueprint ? BLUEPRINT_COLOR : "#8B7355"} 
          wireframe={isBlueprint}
          metalness={0.2} roughness={0.9} transparent opacity={opacity} 
          emissive={emissive} emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Steps */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.4 - i * 0.25, 1.5 + i * 0.3]}>
          <boxGeometry args={[3 - i * 0.3, 0.2, 0.5]} />
          <meshStandardMaterial 
            color={isBlueprint ? BLUEPRINT_COLOR : "#9B8B75"} 
            wireframe={isBlueprint}
            metalness={0.1} roughness={0.95} transparent opacity={opacity} 
            emissive={emissive} emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      ))}
    </group>
  );
}

function TemplePillars({ progress, isBlueprint, isExploded }) {
  // Pillars rise in P3 (0.22 - 0.33)
  const pillarProgress = progress < 0.22 ? 0 : progress < 0.33 ? (progress - 0.22) / 0.11 : 1;
  const positions = [
    [-2.2, 0, -1.2], [-2.2, 0, 1.2],
    [-0.8, 0, -1.2], [-0.8, 0, 1.2],
    [0.8, 0, -1.2], [0.8, 0, 1.2],
    [2.2, 0, -1.2], [2.2, 0, 1.2],
  ];

  // Explode phase: P4 (0.33 - 0.44)
  const explodeAmount = isExploded ? 1.5 : 0;
  const explodeY = isExploded ? 2 : 0;

  return (
    <group position={[0, -3, 0]}>
      {positions.map((pos, i) => {
        const scaleY = Math.max(0.01, pillarProgress);
        const explodeX = pos[0] * (1 + explodeAmount);
        const explodeZ = pos[2] * (1 + explodeAmount);
        return (
          <mesh
            key={i}
            position={[explodeX, 0.5 + scaleY * 1.5 + explodeY, explodeZ]}
            scale={[1, scaleY, 1]}
          >
            <cylinderGeometry args={[0.12, 0.15, 3, 8]} />
            <meshStandardMaterial 
              color={isBlueprint ? BLUEPRINT_COLOR : STONE_LIGHT} 
              wireframe={isBlueprint}
              metalness={0.3} roughness={0.7} 
              transparent opacity={pillarProgress > 0 ? 1 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TempleSanctum({ progress, isBlueprint, isExploded }) {
  // Sanctum rises P3 (0.25 - 0.33)
  const sanctumProgress = progress < 0.25 ? 0 : progress < 0.33 ? (progress - 0.25) / 0.08 : 1;
  const opacity = sanctumProgress;

  const explodeY = isExploded ? 3 : 0;

  return (
    <group position={[0, -1 + explodeY, 0]} scale={[Math.max(0.01, sanctumProgress), Math.max(0.01, sanctumProgress), Math.max(0.01, sanctumProgress)]}>
      {/* Walls */}
      <mesh>
        <boxGeometry args={[4, 2.5, 3]} />
        <meshStandardMaterial
          color={isBlueprint ? BLUEPRINT_COLOR : STONE_COLOR}
          wireframe={isBlueprint}
          metalness={0.2} roughness={0.85} transparent opacity={opacity * 0.9}
        />
      </mesh>
      {/* Inner sanctum (garbhagriha) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial
          color={isBlueprint ? BLUEPRINT_COLOR : STONE_DARK}
          wireframe={isBlueprint}
          metalness={0.4} roughness={0.6} transparent opacity={opacity}
        />
      </mesh>
    </group>
  );
}

function TempleVimana({ progress, isBlueprint, isExploded }) {
  // Vimana rises P3 (0.28 - 0.33)
  const vimanProgress = progress < 0.28 ? 0 : progress < 0.33 ? (progress - 0.28) / 0.05 : 1;
  const explodeY = isExploded ? 5 : 0;
  const layers = 8;

  return (
    <group position={[0, 0.5 + explodeY, 0]} scale={[Math.max(0.01, vimanProgress), Math.max(0.01, vimanProgress), Math.max(0.01, vimanProgress)]}>
      {Array.from({ length: layers }).map((_, i) => {
        const layerScale = 1 - (i / layers) * 0.7;
        const y = i * 0.8;
        // explode the layers slightly during P4
        const explodeLayerY = isExploded ? y + (i * 0.5) : y;
        
        return (
          <mesh key={i} position={[0, explodeLayerY, 0]} scale={[layerScale, 1, layerScale]}>
            <boxGeometry args={[2.5, 0.7, 2]} />
            <meshStandardMaterial
              color={isBlueprint ? BLUEPRINT_COLOR : (i % 2 === 0 ? "#B8A888" : STONE_COLOR)}
              wireframe={isBlueprint}
              metalness={0.25} roughness={0.8} transparent opacity={vimanProgress}
            />
          </mesh>
        );
      })}

      {/* Kalasam (crown) */}
      <mesh position={[0, (isExploded ? layers * 1.3 : layers * 0.8), 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color={isBlueprint ? BLUEPRINT_COLOR : GOLD}
          wireframe={isBlueprint}
          metalness={0.8} roughness={0.2} emissive={GOLD} emissiveIntensity={vimanProgress * 0.3}
        />
      </mesh>
    </group>
  );
}

function EngineeringGrids({ progress }) {
  // P5: Stone Engineering
  const visible = progress >= 0.44 && progress < 0.55;
  const opacity = visible ? 1 : 0;

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (opacity <= 0) return null;

  return (
    <group ref={ref}>
      {/* Concentric circles */}
      {[3, 5, 7, 9].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <ringGeometry args={[radius - 0.05, radius, 64]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={opacity * 0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Vertical lines */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={`v${i}`} rotation={[0, (Math.PI / 4) * i, 0]}>
          <boxGeometry args={[0.02, 12, 0.02]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={opacity * 0.3} />
        </mesh>
      ))}
    </group>
  );
}

function KnowledgeParticles({ progress }) {
  // P8: Knowledge Vault
  const visible = progress >= 0.77 && progress < 0.88;
  const ref = useRef();
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    // Seeded pure pseudo-random number generator to satisfy react-hooks/purity
    let seed = 54321.09;
    const rand = () => {
      seed = Math.sin(seed) * 10000;
      return seed - Math.floor(seed);
    };

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (rand() - 0.5) * 10;
      pos[i * 3 + 1] = rand() * 15 - 2;
      pos[i * 3 + 2] = (rand() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.05; // float up
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -2;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!visible) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#a855f7" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function TempleScene({ scrollProgress = 0 }) {
  const groupRef = useRef();

  // Phase logic
  const isBlueprint = scrollProgress >= 0.11 && scrollProgress < 0.22;
  const isExploded = scrollProgress >= 0.33 && scrollProgress < 0.44;
  const isSculptures = scrollProgress >= 0.55 && scrollProgress < 0.66;
  const isLegacy = scrollProgress >= 0.88;

  // Camera & Group movements
  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation
      let targetRotY = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
      let targetScale = 1;
      let targetY = 0;
      let targetRotX = 0;

      // P4: Exploded View
      if (isExploded) {
        targetRotY += state.clock.elapsedTime * 0.1; // slow spin
      }
      
      // P6: Sculptures (Zoom in, tilt)
      if (isSculptures) {
        targetScale = 1.3;
        targetY = -2;
        targetRotX = -0.1;
      }

      // Smooth interpolation for cinematic camera moves
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      groupRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  // Lighting adjustments based on phase
  // P1: Misty, dark (Age of Cholas)
  // P2: Blueprint (Cyan glow)
  // P9: Golden Sunrise
  let mainLightColor = "#fbbf24";
  let mainLightInt = 0.8;
  let ambientInt = 0.15;
  let fogColor = "#050508";
  
  if (isBlueprint) {
    mainLightColor = "#22d3ee";
    mainLightInt = 1.5;
  } else if (isLegacy) {
    mainLightColor = "#FFD700";
    mainLightInt = 1.2;
    ambientInt = 0.4;
    fogColor = "#1a1000"; // Golden fog
  }

  return (
    <>
      <fog attach="fog" args={[fogColor, 10, 35]} />

      <group ref={groupRef}>
        {/* Lights */}
        <ambientLight intensity={ambientInt} />
        <directionalLight position={[5, 10, 5]} intensity={mainLightInt} color={mainLightColor} />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#22d3ee" />
        <pointLight position={[0, 8, 0]} intensity={isBlueprint ? 1 : 0.5} color={isBlueprint ? "#22d3ee" : "#FFD700"} distance={20} />

        {/* Fog-like ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color={isBlueprint ? "#001a1a" : "#0a0a0f"}
            transparent opacity={0.8} metalness={0.5} roughness={0.8}
          />
        </mesh>

        {/* Temple components */}
        <TempleBase progress={scrollProgress} isBlueprint={isBlueprint} />
        <TemplePillars progress={scrollProgress} isBlueprint={isBlueprint} isExploded={isExploded} />
        <TempleSanctum progress={scrollProgress} isBlueprint={isBlueprint} isExploded={isExploded} />
        <TempleVimana progress={scrollProgress} isBlueprint={isBlueprint} isExploded={isExploded} />
        
        {/* Special Phase Overlays */}
        <EngineeringGrids progress={scrollProgress} />
        <KnowledgeParticles progress={scrollProgress} />
      </group>
    </>
  );
}

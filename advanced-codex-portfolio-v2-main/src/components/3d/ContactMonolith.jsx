import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ContactMonolith({ progress = 0 }) {
  const monolithRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (monolithRef.current) {
      monolithRef.current.rotation.y = t * 0.1;
      monolithRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      // Gentle breathing scale
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      monolithRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={monolithRef} position={[0, -0.5, 0]}>
      {/* Tall Architectural Monolith Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 5.5, 0.4]} />
        <meshPhysicalMaterial
          color="#07050A"
          roughness={0.1}
          metalness={0.96}
          reflectivity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Internal glowing fissure / vertical energy strip */}
      <mesh position={[0, 0, 0.21]}>
        <planeGeometry args={[0.08, 4.8]} />
        <meshBasicMaterial
          color="#EC4899"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Floating Framework Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#A855F7"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Looming Top Halo Light */}
      <pointLight
        color="#A855F7"
        intensity={3.5}
        distance={15}
        position={[0, 2.5, 1]}
      />
    </group>
  );
}

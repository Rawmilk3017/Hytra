import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DynamicLighting({ mouse }) {
  const keyLightRef = useRef();
  const rimLightRef = useRef();
  const crimsonSpotRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = (mouse?.normX || 0) * 2;
    const my = (mouse?.normY || 0) * 2;

    // Violet key light subtle orbital sweep + mouse influence
    if (keyLightRef.current) {
      keyLightRef.current.position.x = 4 + Math.sin(t * 0.4) * 2 + mx;
      keyLightRef.current.position.y = 5 + Math.cos(t * 0.3) * 1.5 + my;
      keyLightRef.current.position.z = 6 + Math.sin(t * 0.2) * 1.5;
    }

    // Magenta rim light counter-orbiting behind
    if (rimLightRef.current) {
      rimLightRef.current.position.x = -5 + Math.cos(t * 0.35) * 2 - mx;
      rimLightRef.current.position.y = -3 + Math.sin(t * 0.5) * 1.5;
      rimLightRef.current.position.z = -4 + Math.cos(t * 0.25) * 1.5;
    }

    // Hot Crimson accent light sweeping occasionally
    if (crimsonSpotRef.current) {
      crimsonSpotRef.current.position.x = Math.sin(t * 0.6) * 4;
      crimsonSpotRef.current.position.y = -2 + Math.sin(t * 0.4) * 2;
    }
  });

  return (
    <>
      {/* Deep atmospheric ambient light */}
      <ambientLight color="#100A14" intensity={1.2} />

      {/* Primary Key Light: Violet */}
      <directionalLight
        ref={keyLightRef}
        color="#A855F7"
        intensity={2.8}
        position={[5, 6, 6]}
      />

      {/* Rim / Accent Light: Hot Magenta */}
      <pointLight
        ref={rimLightRef}
        color="#EC4899"
        intensity={3.5}
        distance={25}
        decay={2}
        position={[-6, -3, -4]}
      />

      {/* Hot Crimson Accent Light */}
      <pointLight
        ref={crimsonSpotRef}
        color="#F43F5E"
        intensity={2.2}
        distance={20}
        decay={2}
        position={[0, -2, 3]}
      />

      {/* Soft Top Highlight Light: Orchid */}
      <directionalLight
        color="#F5D0FE"
        intensity={0.6}
        position={[0, 8, 2]}
      />
    </>
  );
}

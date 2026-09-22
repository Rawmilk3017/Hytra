import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useQuality } from '../../context/QualityContext';

export default function BackgroundVoid({ mouse }) {
  const { particleCount, tier } = useQuality();
  const bgRef = useRef();
  const midRef = useRef();
  const fgRef = useRef();
  const planesRef = useRef();

  // 1. Background distant fragments & stars
  const [bgPositions, bgColors] = useMemo(() => {
    const count = Math.floor(particleCount * 0.5);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorChoices = [
      new THREE.Color('#2A123D'), // deep purple
      new THREE.Color('#A855F7'), // violet
      new THREE.Color('#EC4899'), // magenta
      new THREE.Color('#F5D0FE'), // soft highlight
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = -15 - Math.random() * 30;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return [positions, colors];
  }, [particleCount]);

  // 2. Midground geometric crystalline fragments
  const [midPositions, midColors] = useMemo(() => {
    const count = Math.floor(particleCount * 0.35);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color('#A855F7');
    const c2 = new THREE.Color('#F43F5E');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = -5 - Math.random() * 15;

      const mix = Math.random();
      const col = c1.clone().lerp(c2, mix);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return [positions, colors];
  }, [particleCount]);

  // 3. Foreground micro light trails & dust
  const [fgPositions] = useMemo(() => {
    const count = Math.floor(particleCount * 0.15);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = 2 + Math.random() * 6;
    }
    return [positions];
  }, [particleCount]);

  // Animated floating spatial planes (distant geometric structures)
  const planes = useMemo(() => {
    if (tier === 'low') return [];
    return [
      { pos: [-12, 6, -18], rot: [0.3, 0.4, 0.2], size: [4, 6] },
      { pos: [14, -8, -22], rot: [-0.2, 0.5, -0.3], size: [5, 7] },
      { pos: [-8, -10, -14], rot: [0.4, -0.3, 0.1], size: [3, 5] },
      { pos: [10, 8, -16], rot: [-0.3, -0.4, 0.2], size: [4, 4] },
    ];
  }, [tier]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = (mouse?.normX || 0);
    const my = (mouse?.normY || 0);

    // Parallax layering:
    // Background moves slow (0.3x)
    if (bgRef.current) {
      bgRef.current.rotation.y = t * 0.015 + mx * 0.04;
      bgRef.current.rotation.x = my * 0.03;
    }

    // Midground moves medium (0.7x)
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.03 + mx * 0.08;
      midRef.current.rotation.x = Math.sin(t * 0.08) * 0.05 + my * 0.06;
    }

    // Foreground moves fast (1.4x)
    if (fgRef.current) {
      fgRef.current.rotation.y = t * 0.05 + mx * 0.15;
      fgRef.current.rotation.x = -t * 0.03 + my * 0.12;
    }

    // Distant architecture slow drift
    if (planesRef.current) {
      planesRef.current.rotation.y = Math.sin(t * 0.05) * 0.06 + mx * 0.05;
    }
  });

  return (
    <group>
      {/* Background Layer */}
      <points ref={bgRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bgPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[bgColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Midground Layer */}
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[midColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Foreground Layer */}
      <points ref={fgRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fgPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#F5D0FE"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Distant Architectural Floating Planes */}
      {planes.length > 0 && (
        <group ref={planesRef}>
          {planes.map((p, idx) => (
            <mesh
              key={idx}
              position={p.pos}
              rotation={p.rot}
            >
              <planeGeometry args={p.size} />
              <meshStandardMaterial
                color="#100A14"
                roughness={0.4}
                metalness={0.8}
                wireframe={idx % 2 === 1}
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useQuality } from '../../context/QualityContext';

export default function NeuralArchitecture({ mouse, scrollProgress }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const liquidMeshRef = useRef();
  const glassMantleRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const satellitesGroupRef = useRef();
  const internalLightRef = useRef();
  const { tier } = useQuality();

  // Procedural orbiting satellites (shards/data micro-objects)
  const satellites = useMemo(() => {
    const count = tier === 'low' ? 5 : 10;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      const height = ((i % 4) - 1.5) * 0.8;
      const scale = 0.12 + (i % 3) * 0.06;
      return {
        initialAngle: angle,
        radius,
        height,
        scale,
        speed: 0.5 + (i % 2) * 0.3,
        type: i % 2 === 0 ? 'octa' : 'tetra',
      };
    });
  }, [tier]);

  // Procedural light trail ring points
  const trailCurve = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 4;
      const r = 2.8 + Math.sin(theta * 3) * 0.3;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta * 2) * 0.8;
      const z = Math.sin(theta) * r;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = (mouse?.normX || 0);
    const my = (mouse?.normY || 0);
    const speedMultiplier = 1 + (mouse?.speed || 0) * 0.25;

    // Master organism breathing & tilt
    if (groupRef.current) {
      // Gentle floating elevation
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      
      // Responsive tilt towards mouse with smooth dampening
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        t * 0.15 + mx * 0.45,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        my * 0.35,
        0.05
      );
    }

    // Inner Liquid Chrome Core morphing & rotation
    if (liquidMeshRef.current) {
      liquidMeshRef.current.rotation.x = t * 0.3 * speedMultiplier;
      liquidMeshRef.current.rotation.z = -t * 0.25 * speedMultiplier;
      const pulse = 1 + Math.sin(t * 2.2) * 0.06;
      liquidMeshRef.current.scale.set(pulse, pulse, pulse);
    }

    // Inner faceted structural core
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.2;
      innerCoreRef.current.rotation.x = Math.cos(t * 0.4) * 0.15;
    }

    // Translucent glass mantle counter-rotation
    if (glassMantleRef.current) {
      glassMantleRef.current.rotation.y = t * 0.1;
      glassMantleRef.current.rotation.z = Math.sin(t * 0.5) * 0.12;
    }

    // Floating segmented rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = 1.1 + Math.sin(t * 0.5) * 0.2;
      ring1Ref.current.rotation.y = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -1.2 + Math.cos(t * 0.4) * 0.2;
      ring2Ref.current.rotation.z = -t * 0.35;
    }

    // Orbiting satellites breathing & radial pulsation (separating and reconnecting)
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.children.forEach((child, idx) => {
        const sat = satellites[idx];
        if (!sat) return;
        const currentAngle = sat.initialAngle + t * sat.speed * 0.6;
        // Breathing separation
        const breathingRadius = sat.radius + Math.sin(t * 1.5 + idx) * 0.35;
        child.position.x = Math.cos(currentAngle) * breathingRadius;
        child.position.z = Math.sin(currentAngle) * breathingRadius;
        child.position.y = sat.height + Math.sin(t * 2 + idx) * 0.25;
        child.rotation.x += delta * 1.5;
        child.rotation.y += delta * 2.0;
      });
    }

    // Internal Point Light pulsating glow
    if (internalLightRef.current) {
      internalLightRef.current.intensity = 3.5 + Math.sin(t * 3.5) * 1.8;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      {/* Internal Core Pulsating Point Light */}
      <pointLight
        ref={internalLightRef}
        color="#EC4899"
        distance={12}
        decay={2}
        intensity={4}
      />

      {/* 1. Liquid Metal / Dark Chrome Center Organism */}
      <mesh ref={liquidMeshRef}>
        <icosahedronGeometry args={[1.05, tier === 'low' ? 1 : 2]} />
        <meshStandardMaterial
          color="#0B0710"
          roughness={0.08}
          metalness={0.96}
          wireframe={false}
          emissive="#2A123D"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. Inner Faceted Structural Wireframe Cage */}
      <mesh ref={innerCoreRef}>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
          emissive="#A855F7"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 3. Translucent Frosted Glass Mantle */}
      <mesh ref={glassMantleRef}>
        <octahedronGeometry args={[1.75, 1]} />
        <meshPhysicalMaterial
          color="#180E20"
          roughness={0.25}
          transmission={0.85}
          thickness={1.2}
          ior={1.45}
          transparent
          opacity={0.65}
          reflectivity={0.9}
        />
      </mesh>

      {/* 4. Segmented Floating Gyroscopic Ring 1 (Dark Metal + Emissive Rim) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.25, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#130C19"
          roughness={0.15}
          metalness={0.95}
          emissive="#EC4899"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 5. Segmented Floating Ring 2 (Violet Arc) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.55, 0.025, 16, 64, Math.PI * 1.6]} />
        <meshStandardMaterial
          color="#2A123D"
          roughness={0.2}
          metalness={0.9}
          emissive="#A855F7"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 6. Dynamic Light Trail Curved Filament */}
      {tier !== 'low' && (
        <mesh>
          <tubeGeometry args={[trailCurve, 64, 0.018, 8, false]} />
          <meshBasicMaterial
            color="#F43F5E"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* 7. Orbiting Crystalline Satellites (Data Shards) */}
      <group ref={satellitesGroupRef}>
        {satellites.map((sat, idx) => (
          <mesh key={idx} scale={sat.scale}>
            {sat.type === 'octa' ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#EC4899" : "#A855F7"}
              roughness={0.12}
              metalness={0.95}
              emissive={idx % 3 === 0 ? "#F43F5E" : "#2A123D"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Sonic Wave: 3D audio waveform ribbons & oscillating sound rings
export function SonicWaveVisual({ isHovered }) {
  const ringGroupRef = useRef();
  const waveMeshRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 2.5 : 1.2;

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
      ringGroupRef.current.rotation.y = t * 0.5 * speed;
      ringGroupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(t * 3.5 + i * 0.7) * (isHovered ? 0.2 : 0.08);
        child.scale.set(scale, scale, scale);
      });
    }

    if (waveMeshRef.current) {
      waveMeshRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group scale={1.2}>
      {/* Concentric sound wave rings */}
      <group ref={ringGroupRef}>
        {[0.9, 1.3, 1.7, 2.1].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2.4 + i * 0.2, 0, 0]}>
            <torusGeometry args={[radius, 0.025, 16, 64]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#A855F7" : "#EC4899"}
              emissive={i % 2 === 0 ? "#A855F7" : "#EC4899"}
              emissiveIntensity={isHovered ? 1.5 : 0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Central pulsating audio core */}
      <mesh ref={waveMeshRef}>
        <octahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#100A14"
          emissive="#A855F7"
          emissiveIntensity={isHovered ? 2.0 : 0.9}
          roughness={0.1}
          metalness={0.95}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

// 2. Kreo Hub: Abstract developer network (node graph / connected plexus)
export function KreoHubVisual({ isHovered }) {
  const groupRef = useRef();

  const [nodes, lines] = useMemo(() => {
    const nodeCoords = [
      [-1.2, 0.8, 0],
      [1.1, 0.9, -0.4],
      [0.2, -1.1, 0.3],
      [-0.9, -0.6, -0.5],
      [1.3, -0.5, 0.4],
      [0, 1.4, 0.2],
      [0, 0, 0], // hub center
    ];

    const pairs = [
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
      [0, 5], [1, 5], [1, 4], [2, 4], [2, 3], [0, 3]
    ];

    const linePoints = [];
    pairs.forEach(([a, b]) => {
      linePoints.push(new THREE.Vector3(...nodeCoords[a]));
      linePoints.push(new THREE.Vector3(...nodeCoords[b]));
    });

    return [nodeCoords, linePoints];
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [lines]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4 * (isHovered ? 2 : 1);
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.25;
    }
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Dynamic Network Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#EC4899"
          transparent
          opacity={isHovered ? 0.9 : 0.5}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating Network Nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[idx === 6 ? 0.22 : 0.12, 16, 16]} />
          <meshStandardMaterial
            color={idx === 6 ? "#F43F5E" : "#EC4899"}
            emissive={idx === 6 ? "#F43F5E" : "#A855F7"}
            emissiveIntensity={isHovered ? 2.5 : 1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3. Bot Control: Floating layered dashboard telemetry architecture
export function BotControlVisual({ isHovered }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -t * 0.35 * (isHovered ? 2 : 1);
      groupRef.current.rotation.x = 0.2 + Math.sin(t * 0.7) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* 3 Floating Layered Telemetry Data Planes */}
      {[-0.4, 0, 0.4].map((zOffset, idx) => (
        <group key={idx} position={[0, 0, zOffset]}>
          <mesh>
            <boxGeometry args={[1.8 - idx * 0.2, 1.2 - idx * 0.15, 0.04]} />
            <meshPhysicalMaterial
              color="#100A14"
              emissive={idx === 1 ? "#F43F5E" : "#A855F7"}
              emissiveIntensity={isHovered ? 0.8 : 0.4}
              roughness={0.2}
              transmission={0.8}
              transparent
              opacity={0.7}
              metalness={0.8}
            />
          </mesh>
          {/* Wireframe border highlight */}
          <mesh>
            <boxGeometry args={[1.82 - idx * 0.2, 1.22 - idx * 0.15, 0.045]} />
            <meshStandardMaterial
              color="#F5D0FE"
              wireframe
              transparent
              opacity={isHovered ? 0.8 : 0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Central data pulse node */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#F43F5E"
          emissive="#F43F5E"
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// 4. Open Source Lab: Procedural crystalline code & data matrix structure
export function OpenSourceLabVisual({ isHovered }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.3 * (isHovered ? 2 : 1);
      groupRef.current.rotation.y = t * 0.4 * (isHovered ? 2 : 1);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Nested crystalline lattice */}
      <mesh>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          wireframe
          emissive="#F5D0FE"
          emissiveIntensity={isHovered ? 1.8 : 0.9}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#180E20"
          emissive="#A855F7"
          emissiveIntensity={isHovered ? 1.4 : 0.5}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Orbiting data fragments */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0]}
          >
            <tetrahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color="#EC4899"
              emissive="#EC4899"
              emissiveIntensity={isHovered ? 2 : 1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Master Dispatcher
export default function ProjectVisual({ type, isHovered = false }) {
  switch (type) {
    case 'waveform':
      return <SonicWaveVisual isHovered={isHovered} />;
    case 'network':
      return <KreoHubVisual isHovered={isHovered} />;
    case 'dashboard':
      return <BotControlVisual isHovered={isHovered} />;
    case 'matrix':
      return <OpenSourceLabVisual isHovered={isHovered} />;
    default:
      return <SonicWaveVisual isHovered={isHovered} />;
  }
}

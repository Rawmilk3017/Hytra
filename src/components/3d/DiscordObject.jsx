import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DiscordObject({ isHovered = false }) {
  const groupRef = useRef();
  const ringRef = useRef();

  // Procedural interconnected community node clusters
  const [nodes, lineGeo] = useMemo(() => {
    const coords = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.4;
      coords.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ]);
    }

    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = new THREE.Vector3(...coords[i]).distanceTo(new THREE.Vector3(...coords[j]));
        if (d < 1.6) {
          lines.push(new THREE.Vector3(...coords[i]));
          lines.push(new THREE.Vector3(...coords[j]));
        }
      }
    }

    const geo = new THREE.BufferGeometry().setFromPoints(lines);
    return [coords, geo];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3 * (isHovered ? 2 : 1);
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Dynamic network lattice */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#A855F7"
          transparent
          opacity={isHovered ? 0.9 : 0.45}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating community nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={idx % 3 === 0 ? "#EC4899" : "#A855F7"}
            emissive={idx % 3 === 0 ? "#EC4899" : "#A855F7"}
            emissiveIntensity={isHovered ? 2 : 0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Central communication pulse sphere */}
      <mesh>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color="#100A14"
          emissive="#EC4899"
          emissiveIntensity={isHovered ? 1.8 : 0.8}
          wireframe
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer communication orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#F43F5E"
          emissive="#F43F5E"
          emissiveIntensity={isHovered ? 2.2 : 0.9}
        />
      </mesh>
    </group>
  );
}

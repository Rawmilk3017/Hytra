import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SKILLS, SKILL_CONNECTIONS } from '../../data/skills';
import { Html } from '@react-three/drei';

export default function SkillsConstellationScene({ hoveredSkillId, onHoverSkill }) {
  const groupRef = useRef();

  // Map skill id to its position
  const skillMap = useMemo(() => {
    const map = new Map();
    SKILLS.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  // Compute 3D lines between connected skills
  const linePoints = useMemo(() => {
    const points = [];
    SKILL_CONNECTIONS.forEach(([fromId, toId]) => {
      const fromSkill = skillMap.get(fromId);
      const toSkill = skillMap.get(toId);
      if (fromSkill && toSkill) {
        points.push(new THREE.Vector3(...fromSkill.position));
        points.push(new THREE.Vector3(...toSkill.position));
      }
    });
    return points;
  }, [skillMap]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.25;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#A855F7"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating Skill Nodes */}
      {SKILLS.map((skill) => {
        const isHovered = hoveredSkillId === skill.id;
        return (
          <group
            key={skill.id}
            position={skill.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverSkill(skill.id);
            }}
            onPointerOut={() => onHoverSkill(null)}
          >
            {/* Outer halo */}
            <mesh scale={isHovered ? 1.6 : 1.0}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={isHovered ? 2.5 : 0.8}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            {/* Orbiting ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.28, 0.32, 24]} />
              <meshBasicMaterial
                color={skill.color}
                side={THREE.DoubleSide}
                transparent
                opacity={isHovered ? 0.9 : 0.3}
              />
            </mesh>

            {/* Floating 3D Text Label */}
            <Html
              position={[0, -0.38, 0]}
              center
              distanceFactor={8}
              className="pointer-events-none select-none"
            >
              <div
                className={`px-2 py-0.5 rounded text-[11px] font-mono tracking-wider font-semibold whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? 'bg-accent-violet text-white shadow-violet-glow scale-110'
                    : 'bg-[#100A14]/85 text-text-muted border border-purple-deep/60'
                }`}
              >
                {skill.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

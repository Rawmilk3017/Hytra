import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CameraController({ mouse, scrollProgress = 0, activeSection = 'hero' }) {
  const prefersReduced = useReducedMotion();
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const currentTarget = useRef(new THREE.Vector3(0.8, 0, 0));

  useFrame((state, delta) => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);
    const mx = prefersReduced ? 0 : (mouse?.normX || 0);
    const my = prefersReduced ? 0 : (mouse?.normY || 0);

    // Dynamic Waypoints Interpolation along scroll progress
    let targetX = 0;
    let targetY = 0;
    let targetZ = 5.5;

    let lookX = 0.8;
    let lookY = 0;
    let lookZ = 0;

    if (p < 0.18) {
      // Hero
      const localP = p / 0.18;
      targetX = THREE.MathUtils.lerp(0, 0.8, localP);
      targetY = THREE.MathUtils.lerp(0, -0.4, localP);
      targetZ = THREE.MathUtils.lerp(5.5, 5.0, localP);
      lookX = THREE.MathUtils.lerp(0.8, 0, localP);
    } else if (p < 0.40) {
      // About
      const localP = (p - 0.18) / 0.22;
      targetX = THREE.MathUtils.lerp(0.8, -0.6, localP);
      targetY = THREE.MathUtils.lerp(-0.4, 0.2, localP);
      targetZ = THREE.MathUtils.lerp(5.0, 4.6, localP);
      lookX = 0;
    } else if (p < 0.65) {
      // Projects
      const localP = (p - 0.40) / 0.25;
      targetX = THREE.MathUtils.lerp(-0.6, 0.4, localP);
      targetY = THREE.MathUtils.lerp(0.2, -0.3, localP);
      targetZ = THREE.MathUtils.lerp(4.6, 4.9, localP);
      lookX = 0;
    } else if (p < 0.85) {
      // Skills & Experience
      const localP = (p - 0.65) / 0.20;
      targetX = THREE.MathUtils.lerp(0.4, -0.5, localP);
      targetY = THREE.MathUtils.lerp(-0.3, 0.1, localP);
      targetZ = THREE.MathUtils.lerp(4.9, 4.5, localP);
      lookX = 0;
    } else {
      // Discord, GitHub & Contact Final Scene
      const localP = (p - 0.85) / 0.15;
      targetX = THREE.MathUtils.lerp(-0.5, 0, localP);
      targetY = THREE.MathUtils.lerp(0.1, 0.3, localP);
      targetZ = THREE.MathUtils.lerp(4.5, 3.8, localP); // Moves in closer for final monolith
      lookX = 0;
    }

    // Add subtle mouse parallax to camera
    targetX += mx * 0.35;
    targetY += my * 0.25;

    // Smooth lerp to destination
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.045);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.045);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.045);

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, lookX, 0.045);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, lookY, 0.045);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, lookZ, 0.045);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}

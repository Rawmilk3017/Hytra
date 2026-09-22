import { useState, useEffect } from 'react';

export function useDeviceQuality() {
  const [quality, setQuality] = useState({
    tier: 'high', // 'high' | 'medium' | 'low'
    dpr: 1.5,
    isMobile: false,
    hasWebGL: true,
    particleCount: 800,
    enablePostProcessing: true,
  });

  useEffect(() => {
    // 1. Check WebGL availability
    let webGLAvailable = true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) webGLAvailable = false;
    } catch {
      webGLAvailable = false;
    }

    // 2. Check mobile & touch
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const isMobile = isTouch && isSmallScreen;

    // 3. Hardware concurrency & device memory
    const cores = navigator.hardwareConcurrency || 4;
    const rawDpr = window.devicePixelRatio || 1;

    let tier = 'high';
    let dpr = Math.min(rawDpr, 2);
    let particleCount = 700;
    let enablePostProcessing = true;

    if (!webGLAvailable || isMobile || cores <= 2) {
      tier = 'low';
      dpr = Math.min(rawDpr, 1.25);
      particleCount = 220;
      enablePostProcessing = false;
    } else if (cores <= 4 || window.innerWidth < 1024) {
      tier = 'medium';
      dpr = Math.min(rawDpr, 1.5);
      particleCount = 450;
      enablePostProcessing = true;
    }

    setQuality({
      tier,
      dpr,
      isMobile,
      hasWebGL: webGLAvailable,
      particleCount,
      enablePostProcessing,
    });
  }, []);

  return quality;
}

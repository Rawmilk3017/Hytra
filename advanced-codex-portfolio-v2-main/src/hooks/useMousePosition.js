import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    normX: 0, // -1 to 1
    normY: 0, // -1 to 1
    speed: 0,
  });

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();

    const handleMouseMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMouse({
        x: e.clientX,
        y: e.clientY,
        normX,
        normY,
        speed: Math.min(speed, 5),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}

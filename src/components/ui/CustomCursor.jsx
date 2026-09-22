import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'project' | 'link'
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (prefersReduced || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
        if (type === 'project') setCursorText('EXPLORE');
        else if (type === 'link') setCursorText('OPEN');
        else if (type === 'copy') setCursorText('COPY');
        else setCursorText('');
      } else if (e.target.closest('a, button, [role="button"]')) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, [prefersReduced, isVisible]);

  if (isTouchDevice || prefersReduced || !isVisible) return null;

  const isProject = cursorType === 'project';
  const isHovered = cursorType !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isProject ? 72 : isHovered ? 44 : 26,
          height: isProject ? 72 : isHovered ? 44 : 26,
          borderColor: isProject ? '#EC4899' : isHovered ? '#A855F7' : 'rgba(168, 85, 247, 0.4)',
          backgroundColor: isProject
            ? 'rgba(236, 72, 153, 0.15)'
            : isHovered
            ? 'rgba(168, 85, 247, 0.08)'
            : 'rgba(168, 85, 247, 0)',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        className="rounded-full border border-accent-violet/40 backdrop-blur-[1px] flex items-center justify-center shadow-subtle-glow"
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-accent-soft font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Central Sharp Point */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-accent-soft shadow-[0_0_8px_#A855F7]"
      />
    </div>
  );
}

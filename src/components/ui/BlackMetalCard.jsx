import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlackMetalCard({
  children,
  className = '',
  spotlight = true,
  scanline = true,
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-xl border border-purple-deep/70 bg-[#0E0914]/90 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'border-accent-violet/50 shadow-violet-glow' : 'shadow-metal-card'
      } ${className}`}
    >
      {/* Metallic edge highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-soft/30 to-transparent pointer-events-none" />

      {/* Dynamic Cursor Spotlight inside Card */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle animated scanline */}
      {scanline && (
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(rgba(245,208,254,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

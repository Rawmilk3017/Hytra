import React from 'react';
import { motion } from 'framer-motion';

export function RevealWords({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 24,
      filter: 'blur(8px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block will-change-transform">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function MaskSlide({ children, className = '', delay = 0 }) {
  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function GlowBadge({ children, color = 'violet', className = '' }) {
  const colorStyles = {
    violet: 'border-accent-violet/30 bg-accent-violet/10 text-accent-soft shadow-violet-glow',
    magenta: 'border-accent-magenta/30 bg-accent-magenta/10 text-accent-magenta shadow-magenta-glow',
    crimson: 'border-accent-crimson/30 bg-accent-crimson/10 text-accent-crimson shadow-crimson-glow',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase border backdrop-blur-md ${
        colorStyles[color] || colorStyles.violet
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}

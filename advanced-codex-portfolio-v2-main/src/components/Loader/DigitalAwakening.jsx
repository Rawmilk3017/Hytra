import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalAwakening({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Void, 1: Particles, 2: Light, 3: Typography, 4: Complete
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, snappy loading sequence (1.4s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 80);

    const t1 = setTimeout(() => setPhase(1), 200);  // Particles
    const t2 = setTimeout(() => setPhase(2), 550);  // Light & Geometry
    const t3 = setTimeout(() => setPhase(3), 950);  // Typography
    const t4 = setTimeout(() => {
      setPhase(4);
      if (onComplete) onComplete();
    }, 1500); // Complete

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-void select-none overflow-hidden"
        >
          {/* Phase 1: Tiny floating particles */}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-accent-soft animate-ping" />
              <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-accent-magenta animate-ping" />
            </motion.div>
          )}

          {/* Phase 2: Faint distorted light & procedural ring */}
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex items-center justify-center mb-8"
            >
              {/* Volumetric glow */}
              <div className="absolute w-40 h-40 rounded-full bg-accent-violet/20 blur-3xl" />
              <div className="absolute w-24 h-24 rounded-full bg-accent-magenta/25 blur-xl" />

              {/* Procedural rotating rings */}
              <div className="w-20 h-20 rounded-full border border-accent-violet/30 border-t-accent-magenta animate-spin" />
              <div className="absolute w-12 h-12 rounded-full border border-purple-deep border-b-accent-crimson animate-[spin_1.5s_linear_infinite_reverse]" />
              <div className="absolute w-2 h-2 rounded-full bg-accent-soft shadow-[0_0_12px_#F5D0FE]" />
            </motion.div>
          )}

          {/* Phase 3: RAWMILK3017 Identity reveal */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.3em] text-text-main font-display">
                RAWMILK3017<span className="text-accent-violet">.EXE</span>
              </h1>
              <p className="mt-2 text-[10px] font-mono tracking-[0.35em] text-accent-soft/70 uppercase">
                SYSTEM INITIALIZATION // {progress}%
              </p>
            </motion.div>
          )}

          {/* Minimal progress tracker bar */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-purple-deep/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-violet via-accent-magenta to-accent-crimson"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

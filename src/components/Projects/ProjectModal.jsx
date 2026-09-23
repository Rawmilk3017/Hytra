import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Github, Discord } from '../ui/Icons';
import { Canvas } from '@react-three/fiber';
import ProjectVisual from '../3d/ProjectVisuals';
import MagneticButton from '../ui/MagneticButton';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Darkened Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-deep/90 bg-surface-deep/95 shadow-2xl p-6 sm:p-10 z-10 metal-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="hover"
              aria-label="Close Project Modal"
              className="absolute top-6 right-6 p-2.5 rounded-full border border-purple-deep bg-surface-subtle text-text-muted hover:text-white hover:border-accent-violet transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive 3D Canvas Preview */}
              <div className="lg:col-span-6 h-64 sm:h-80 rounded-2xl bg-void/80 border border-purple-deep/60 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
                    <ambientLight intensity={1.2} />
                    <pointLight position={[4, 4, 4]} color={project.accentColor} intensity={3} />
                    <pointLight position={[-4, -4, -4]} color={project.secondaryColor} intensity={2} />
                    <ProjectVisual type={project.visualType} isHovered={true} />
                  </Canvas>
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-text-subtle uppercase">
                  PROCEDURAL RENDERING // {project.visualType}
                </div>
              </div>

              {/* Right Column: Detailed Specs */}
              <div className="lg:col-span-6">
                <div className="text-xs font-mono tracking-widest text-accent-magenta font-semibold uppercase mb-1">
                  {project.category}
                </div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-accent-soft/80 mb-4">
                  {project.subtitle}
                </p>
                <p className="text-sm text-text-muted leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono tracking-wider text-text-subtle uppercase block font-semibold">
                    ENGINEERING HIGHLIGHTS:
                  </span>
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-text-main">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-violet shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-xs font-mono tracking-wider bg-surface-subtle text-accent-soft border border-purple-deep"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    dataCursor="link"
                    className="px-5 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-violet/90 text-white text-xs font-mono tracking-widest font-bold flex items-center gap-2 shadow-violet-glow"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW REPOSITORY</span>
                  </MagneticButton>

                  <MagneticButton
                    href={project.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    dataCursor="link"
                    className="px-5 py-2.5 rounded-xl border border-purple-deep bg-surface-subtle hover:border-accent-magenta text-text-main text-xs font-mono tracking-widest font-bold flex items-center gap-2"
                  >
                    <Discord className="w-4 h-4 text-accent-magenta" />
                    <span>COMMUNITY</span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

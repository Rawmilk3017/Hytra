import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import ProjectVisual from '../3d/ProjectVisuals';
import ProjectModal from './ProjectModal';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import { useProjects } from '../../hooks/useProjects';
import { useQuality } from '../../context/QualityContext';

function ProjectCard({ project, onSelect, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const { tier } = useQuality();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      data-cursor="project"
      className="group relative rounded-3xl border border-purple-deep/70 bg-[#0E0914]/80 backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-accent-violet/60 hover:shadow-violet-glow flex flex-col justify-between"
    >
      {/* 3D Procedural Canvas Box */}
      <div className="relative w-full h-64 sm:h-72 bg-void/90 overflow-hidden flex items-center justify-center border-b border-purple-deep/50">
        <div className="absolute inset-0 pointer-events-none">
          {tier !== 'low' ? (
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 4.2], fov: 45 }}
              className="pointer-events-none"
            >
              <ambientLight intensity={1.2} />
              <pointLight position={[3, 3, 3]} color={project.accentColor} intensity={2.5} />
              <pointLight position={[-3, -3, -3]} color={project.secondaryColor} intensity={2} />
              <ProjectVisual type={project.visualType} isHovered={isHovered} />
            </Canvas>
          ) : (
            // Mobile light fallback placeholder with pulsing geometric icon
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl border border-accent-violet/40 bg-surface-subtle/60 flex items-center justify-center text-accent-soft font-mono text-xs">
                3D VISUAL
              </div>
            </div>
          )}
        </div>

        {/* Ambient colored spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)`
          }}
        />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-surface-deep/90 border border-purple-deep/80 text-text-muted">
            {project.category}
          </span>
        </div>

        {/* Bottom Right Inspect Prompt */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-accent-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>INSPECT 3D ARCHITECTURE</span>
          <ArrowRight className="w-3 h-3 text-accent-magenta" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-2xl font-display font-extrabold text-white tracking-wide mb-2 group-hover:text-accent-soft transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-accent-magenta/90 mb-3 font-semibold">
            {project.subtitle}
          </p>
          <p className="text-sm text-text-muted leading-relaxed mb-6 font-light line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Footer */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-purple-deep/40 items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-surface-deep text-text-muted border border-purple-deep/50"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono text-accent-violet group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            EXPLORE <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = useProjects();

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <GlowBadge color="violet" className="mb-4">
            FEATURED ENGINEERING WORKS
          </GlowBadge>
          <MaskSlide>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
              PROJECTS — 3D SHOWCASE
            </h2>
          </MaskSlide>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
            Each project features its own procedural 3D spatial visualizer representing its computational mechanics, data flow, and runtime architecture.
          </p>
        </div>

        {/* 4 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length ? projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={(p) => setSelectedProject(p)}
            />
          )) : (
            <div className="md:col-span-2 rounded-3xl border border-purple-deep/70 bg-[#0E0914]/80 p-12 text-center">
              <p className="text-sm font-mono text-text-muted">No projects are published yet. Add one from your private /admin project manager.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cinematic Detail Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Network, Sparkles, Terminal, Share2, Layers } from 'lucide-react';
import SkillsConstellationScene from '../3d/SkillsConstellationScene';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import { SKILLS, SKILL_CONNECTIONS } from '../../data/skills';
import { useQuality } from '../../context/QualityContext';
import BlackMetalCard from '../ui/BlackMetalCard';

export default function SkillsSection() {
  const [hoveredSkillId, setHoveredSkillId] = useState('javascript');
  const { tier } = useQuality();

  const currentSkill = SKILLS.find((s) => s.id === hoveredSkillId) || SKILLS[0];

  // Find connected skill names
  const connectedSkillNames = SKILL_CONNECTIONS
    .filter(([a, b]) => a === currentSkill.id || b === currentSkill.id)
    .map(([a, b]) => (a === currentSkill.id ? b : a))
    .map((id) => SKILLS.find((s) => s.id === id)?.name)
    .filter(Boolean);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <GlowBadge color="crimson" className="mb-4">
            DIGITAL CONSTELLATION
          </GlowBadge>
          <MaskSlide>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
              SKILLS & TECH ECOSYSTEM
            </h2>
          </MaskSlide>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
            An interconnected computational constellation. Each technology forms a living node in the developer pipeline with dynamic relationships and shared paradigms.
          </p>
        </div>

        {/* 3D Constellation + HUD Spec Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Interactive Constellation Canvas (Left 7 cols) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] rounded-3xl border border-purple-deep/80 bg-surface-deep/70 backdrop-blur-xl relative overflow-hidden flex items-center justify-center metal-border">
            <div className="absolute inset-0">
              <Canvas
                dpr={tier === 'low' ? 1 : [1, 1.5]}
                camera={{ position: [0, 0, 5.8], fov: 48 }}
              >
                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} color="#A855F7" intensity={2.5} />
                <pointLight position={[-5, -5, -3]} color="#EC4899" intensity={2} />
                <SkillsConstellationScene
                  hoveredSkillId={hoveredSkillId}
                  onHoverSkill={setHoveredSkillId}
                />
              </Canvas>
            </div>

            {/* Canvas Overlay Instructions */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent-soft uppercase bg-surface-deep/80 px-3 py-1.5 rounded-full border border-purple-deep/60">
              <Network className="w-3.5 h-3.5 text-accent-magenta" />
              <span>3D INTERACTIVE GRAPH // HOVER NODES</span>
            </div>
          </div>

          {/* Detailed Skill HUD Readout (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BlackMetalCard className="p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-purple-deep/60 pb-3 mb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-accent-magenta uppercase font-semibold">
                  NODE TELEMETRY // {currentSkill.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
              </div>

              <h3 className="text-3xl font-display font-black text-white tracking-wide mb-2">
                {currentSkill.name}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6 font-light">
                {currentSkill.description}
              </p>

              {/* Connected Nodes */}
              <div className="mb-6 pt-3 border-t border-purple-deep/40">
                <span className="text-[10px] font-mono tracking-wider text-text-subtle uppercase block mb-2 font-semibold flex items-center gap-1.5">
                  <Share2 className="w-3 h-3 text-accent-violet" /> CONNECTED PIPELINES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {connectedSkillNames.map((name, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-subtle text-accent-soft border border-purple-deep/60"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* All Skills Quick Selectors */}
              <div className="pt-4 border-t border-purple-deep/50">
                <span className="text-[10px] font-mono tracking-wider text-text-subtle uppercase block mb-3 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-accent-magenta" /> SELECT NODE:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setHoveredSkillId(s.id)}
                      data-cursor="hover"
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                        hoveredSkillId === s.id
                          ? 'bg-accent-violet text-white font-bold shadow-violet-glow scale-105'
                          : 'bg-surface-subtle/80 text-text-muted hover:text-white border border-purple-deep/40'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </BlackMetalCard>
          </div>
        </div>
      </div>
    </section>
  );
}

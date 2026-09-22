import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Users, Radio, ArrowUpRight, Sparkles } from 'lucide-react';
import { Discord } from '../ui/Icons';
import DiscordObject from '../3d/DiscordObject';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import MagneticButton from '../ui/MagneticButton';
import { SOCIAL_LINKS } from '../../data/social';
import { useQuality } from '../../context/QualityContext';

export default function DiscordSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { tier } = useQuality();

  return (
    <section id="discord" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-purple-deep/80 bg-gradient-to-br from-[#100A14] via-[#0E0914] to-[#180E20] p-8 sm:p-14 relative overflow-hidden metal-border">
          {/* Ambient Glow Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-magenta/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-violet/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 z-10">
              <GlowBadge color="magenta" className="mb-4">
                CODEX DEVELOPMENT ECOSYSTEM
              </GlowBadge>

              <MaskSlide>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight mb-4">
                  BUILD WITH THE COMMUNITY.
                </h2>
              </MaskSlide>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-accent-soft font-bold">
                    Rawmilk3017
                  </span>
                  <span className="text-text-subtle">•</span>
                  <span className="text-sm font-mono text-accent-magenta font-semibold">
                    Rawmilk3017 Community
                  </span>
                  <span className="text-text-subtle">•</span>
                  <span className="text-xs font-mono text-text-muted">
                    Discord Server
                  </span>
                </div>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light max-w-xl">
                  Connect with fellow developers, discuss Discord bot architectures, share open-source tools, and collaborate on cutting-edge digital experiences inside Rawmilk3017 Community.
                </p>
              </div>

              {/* Status Points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3 rounded-xl bg-surface-deep/80 border border-purple-deep/50">
                  <div className="flex items-center gap-1.5 text-accent-violet text-xs font-mono mb-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>STATUS</span>
                  </div>
                  <span className="text-sm font-display font-bold text-white">OPEN TO ALL</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-deep/80 border border-purple-deep/50">
                  <div className="flex items-center gap-1.5 text-accent-magenta text-xs font-mono mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>FOCUS</span>
                  </div>
                  <span className="text-sm font-display font-bold text-white">BOTS & CODE</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-surface-deep/80 border border-purple-deep/50">
                  <div className="flex items-center gap-1.5 text-accent-soft text-xs font-mono mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NETWORK</span>
                  </div>
                  <span className="text-sm font-display font-bold text-white">ACTIVE</span>
                </div>
              </div>

              {/* Join Discord CTA */}
              <MagneticButton
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                dataCursor="link"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-magenta to-accent-violet text-white text-xs font-mono font-bold tracking-[0.2em] uppercase shadow-magenta-glow hover:opacity-95 transition-opacity"
              >
                <span className="flex items-center gap-2.5">
                  <Discord className="w-4 h-4" />
                  JOIN DISCORD
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            </div>

            {/* Right: 3D Abstract Community Network Canvas */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="lg:col-span-5 h-72 sm:h-96 rounded-2xl bg-void/70 border border-purple-deep/60 relative overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 pointer-events-none">
                <Canvas
                  dpr={tier === 'low' ? 1 : [1, 1.5]}
                  camera={{ position: [0, 0, 4.2], fov: 45 }}
                >
                  <ambientLight intensity={1.2} />
                  <pointLight position={[3, 3, 3]} color="#EC4899" intensity={3} />
                  <pointLight position={[-3, -3, -3]} color="#A855F7" intensity={2} />
                  <DiscordObject isHovered={isHovered} />
                </Canvas>
              </div>
              <div className="absolute bottom-3 text-center text-[10px] font-mono tracking-widest text-text-subtle uppercase">
                PROCEDURAL COMMUNITY NETWORK // 3D
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

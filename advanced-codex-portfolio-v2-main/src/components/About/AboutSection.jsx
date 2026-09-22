import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Globe, Layers, ArrowUpRight, Cpu } from 'lucide-react';
import IdentityPanel from './IdentityPanel';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import { PROFILE } from '../../data/profile';

const CAPABILITIES = [
  {
    num: "01",
    title: "DISCORD SYSTEMS",
    tagline: "Bots • Automation • Dashboards",
    description:
      "Engineering resilient Discord automation architectures with event-driven command pipelines, shard scaling, and low-latency audio infrastructure.",
    icon: Bot,
    color: "#EC4899",
    tech: ["Discord.js", "Node.js", "Gateways", "Audio APIs"],
  },
  {
    num: "02",
    title: "WEB EXPERIENCES",
    tagline: "React • Next.js • Modern UI",
    description:
      "Crafting high-speed web apps and platforms with modular components, fluid responsive choreography, clean state synchronization, and accessible design tokens.",
    icon: Globe,
    color: "#A855F7",
    tech: ["React", "Next.js", "Tailwind CSS", "MongoDB"],
  },
  {
    num: "03",
    title: "3D & MOTION",
    tagline: "Three.js • Interaction • Animation",
    description:
      "Designing immersive spatial web interfaces powered by WebGL, continuous camera choreography, procedural particle fields, and smooth physics interactions.",
    icon: Layers,
    color: "#F43F5E",
    tech: ["Three.js", "React Three Fiber", "Drei", "Framer Motion"],
  },
];

function ExperimentalObjectCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl p-8 border border-purple-deep/70 bg-[#0E0914]/80 backdrop-blur-xl transition-all duration-500 hover:border-accent-violet/50 hover:shadow-violet-glow overflow-hidden"
    >
      {/* Background dynamic ambient glow on hover */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
        style={{ backgroundColor: item.color }}
      />

      {/* Top Bar with Number & Icon */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-soft to-text-muted">
            {item.num}
          </span>
          <span className="text-xs font-mono tracking-widest text-text-subtle">
            // SPECIALIZATION
          </span>
        </div>

        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-purple-deep bg-surface-deep transition-all duration-300 group-hover:scale-110"
          style={{
            borderColor: isHovered ? item.color : undefined,
            boxShadow: isHovered ? `0 0 20px ${item.color}40` : undefined,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: item.color }} />
        </div>
      </div>

      {/* Title & Tagline */}
      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide mb-2 group-hover:text-accent-soft transition-colors">
        {item.title}
      </h3>
      <p className="text-xs font-mono tracking-wider font-semibold text-accent-magenta mb-4">
        {item.tagline}
      </p>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-6 font-light">
        {item.description}
      </p>

      {/* Tech Chips */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-purple-deep/40">
        {item.tech.map((t, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-surface-deep/80 text-text-muted border border-purple-deep/50"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <GlowBadge color="magenta" className="mb-4">
            CORE DISCIPLINE & IDENTITY
          </GlowBadge>
          <MaskSlide>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
              {PROFILE.aboutHeading}
            </h2>
          </MaskSlide>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
            {PROFILE.aboutDescription}
          </p>
        </div>

        {/* Grid: 3 Capabilities + 1 Developer Identity Spec Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3 Experimental Interactive Cards (Left 8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {CAPABILITIES.map((cap, index) => (
              <ExperimentalObjectCard key={cap.num} item={cap} index={index} />
            ))}
          </div>

          {/* Futuristic Black-Metal Developer Identity Panel (Right 4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <IdentityPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Terminal, Radio } from 'lucide-react';
import { Github, Discord } from '../ui/Icons';
import { SOCIAL_LINKS } from '../../data/social';
import BlackMetalCard from '../ui/BlackMetalCard';

export default function IdentityPanel() {
  return (
    <BlackMetalCard className="p-6 sm:p-8 max-w-md w-full mx-auto relative border-purple-deep/80">
      {/* Top Hardware Header */}
      <div className="flex items-center justify-between border-b border-purple-deep/70 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-accent-violet animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent-soft font-bold uppercase">
            DEV IDENTITY SPEC // ID-8809
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-semibold">ACTIVE</span>
        </div>
      </div>

      {/* Main Identity Spec */}
      <div className="mb-6">
        <div className="text-[11px] font-mono text-text-subtle tracking-widest uppercase mb-1">
          REGISTERED CODENAME
        </div>
        <div className="flex items-baseline gap-3">
          <h3 className="text-3xl font-display font-extrabold text-white tracking-wider">
            RAWMILK3017
          </h3>
          <span className="text-sm font-mono text-accent-violet font-semibold">
            [Rawmilk3017]
          </span>
        </div>
      </div>

      {/* Core Disciplines */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-surface-deep/90 border border-purple-deep/60">
          <span className="text-[9px] font-mono tracking-wider text-text-subtle block uppercase mb-1">
            CORE DISCIPLINE
          </span>
          <span className="text-xs font-mono font-semibold text-text-main flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-accent-magenta" /> Discord Bot Dev
          </span>
        </div>

        <div className="p-3 rounded-lg bg-surface-deep/90 border border-purple-deep/60">
          <span className="text-[9px] font-mono tracking-wider text-text-subtle block uppercase mb-1">
            PLATFORM
          </span>
          <span className="text-xs font-mono font-semibold text-text-main flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-accent-violet" /> Web Developer
          </span>
        </div>
      </div>

      {/* Verified Link Rows */}
      <div className="space-y-2.5 pt-2 border-t border-purple-deep/60">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle/60 border border-purple-deep/40 text-xs font-mono">
          <div className="flex items-center gap-2 text-text-muted">
            <Github className="w-3.5 h-3.5 text-accent-soft" />
            <span>GitHub</span>
          </div>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-accent-violet hover:text-accent-soft hover:underline font-semibold"
          >
            Rawmilk3017
          </a>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle/60 border border-purple-deep/40 text-xs font-mono">
          <div className="flex items-center gap-2 text-text-muted">
            <Discord className="w-3.5 h-3.5 text-accent-magenta" />
            <span>Discord</span>
          </div>
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-accent-magenta hover:text-accent-soft hover:underline font-semibold"
          >
            Rawmilk3017 // Developer
          </a>
        </div>
      </div>

      {/* Bottom Micro Holographic Barcode */}
      <div className="mt-5 pt-3 border-t border-purple-deep/50 flex items-center justify-between text-[9px] font-mono text-text-subtle">
        <span>AUTHENTICATED KEY: 0x9F...88A</span>
        <div className="flex gap-[3px] h-3 items-center">
          {[4, 8, 2, 7, 3, 9, 5, 2, 6, 8, 3].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h + 3}px` }}
              className={`w-[2px] ${i % 2 === 0 ? 'bg-accent-violet/60' : 'bg-purple-deep'}`}
            />
          ))}
        </div>
      </div>
    </BlackMetalCard>
  );
}

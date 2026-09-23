import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Send } from 'lucide-react';
import { Github } from '../ui/Icons';
import MagneticButton from '../ui/MagneticButton';
import { GlowBadge, RevealWords } from '../ui/RevealText';
import { PROFILE } from '../../data/profile';
import { SOCIAL_LINKS } from '../../data/social';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Dramatic Typography & Interactive Identity */}
        <div className="lg:col-span-8 z-10">
          {/* Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <GlowBadge color="violet">
              DIGITAL EXPERIENCE V2.0
            </GlowBadge>
            <span className="text-xs font-mono tracking-widest text-text-muted">
              {PROFILE.status}
            </span>
          </motion.div>

          {/* Subheading Greeting */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl font-mono text-accent-soft tracking-wider font-semibold mb-3"
          >
            {PROFILE.heroHeading}
          </motion.h2>

          {/* Master Statement Typography */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-display tracking-tight text-white leading-[0.98] uppercase select-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-text-main to-accent-soft">
                I BUILD DIGITAL
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-magenta to-accent-crimson">
                EXPERIENCES
              </span>
              <span className="block text-white/95">
                THAT FEEL ALIVE.
              </span>
            </h1>
          </div>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed mb-8 font-light"
          >
            Creative developer engineering high-performance Discord bots, modern responsive web applications, and immersive 3D interactive environments.
          </motion.p>

          {/* Interactive CTAs with Magnetic Springs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => scrollTo('projects')}
              dataCursor="project"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-accent-violet via-accent-magenta to-accent-crimson text-white text-xs font-mono font-bold tracking-widest uppercase shadow-violet-glow hover:opacity-95 transition-opacity"
            >
              <span className="flex items-center gap-2">
                EXPLORE PROJECTS
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo('contact')}
              dataCursor="link"
              className="px-6 py-3.5 rounded-full border border-purple-deep bg-surface-deep/80 hover:border-accent-violet/60 text-text-main text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md transition-colors"
            >
              <span className="flex items-center gap-2">
                GET IN TOUCH
                <Send className="w-3.5 h-3.5 text-accent-magenta" />
              </span>
            </MagneticButton>

            <MagneticButton
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              dataCursor="link"
              className="p-3.5 rounded-full border border-purple-deep bg-surface-deep/80 hover:border-accent-violet/60 text-text-main hover:text-accent-soft transition-colors"
              ariaLabel="View GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          {/* Verified Roles / Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-mono text-text-subtle"
          >
            <span className="text-accent-violet font-semibold">IDENTITY:</span>
            {PROFILE.titles.map((title, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span className="text-text-muted hover:text-white transition-colors">{title}</span>
                {i < PROFILE.titles.length - 1 && <span className="text-purple-deep">•</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Space reserved for 3D Neural Architecture (visible in background canvas) */}
        <div className="hidden lg:block lg:col-span-4 h-full pointer-events-none" />
      </div>

      {/* Scroll Down Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-subtle font-mono text-[10px] tracking-[0.25em] select-none pointer-events-none"
      >
        <span>SCROLL TO TRAVERSE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-accent-violet" />
        </motion.div>
      </motion.div>
    </section>
  );
}

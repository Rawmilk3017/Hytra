import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Terminal, Sparkles } from 'lucide-react';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import { EXPERIENCES } from '../../data/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center sm:text-left">
          <GlowBadge color="violet" className="mb-4">
            CATEGORY-BASED TRAJECTORY
          </GlowBadge>
          <MaskSlide>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
              EXPERIENCE & DOMAINS
            </h2>
          </MaskSlide>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
            Specialized engineering experience grouped across four fundamental disciplines in bot infrastructure, web ecosystems, open-source libraries, and spatial computing.
          </p>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-purple-deep/70 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Point on Left Axis */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-void border-2 border-accent-violet group-hover:border-accent-magenta group-hover:bg-accent-soft transition-all duration-300 shadow-[0_0_12px_#A855F7]" />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-purple-deep/70 bg-[#0E0914]/85 backdrop-blur-xl group-hover:border-accent-violet/50 group-hover:shadow-violet-glow transition-all duration-300">
                {/* Tag & Domain Focus */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-accent-magenta uppercase px-2.5 py-1 rounded bg-accent-magenta/10 border border-accent-magenta/20">
                    {exp.tag}
                  </span>
                  <span className="text-xs font-mono text-text-subtle">
                    SPECIALIZATION 0{index + 1}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide mb-1 group-hover:text-accent-soft transition-colors">
                  {exp.category}
                </h3>
                <p className="text-sm font-mono text-accent-violet/90 mb-4 font-semibold">
                  {exp.focus}
                </p>

                <p className="text-sm text-text-muted leading-relaxed mb-6 font-light">
                  {exp.summary}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-text-main font-light leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-accent-magenta shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-purple-deep/40">
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-surface-deep text-text-muted border border-purple-deep/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

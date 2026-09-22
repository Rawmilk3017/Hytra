import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { Github, Discord } from '../ui/Icons';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import MagneticButton from '../ui/MagneticButton';
import { PROFILE } from '../../data/profile';
import { SOCIAL_LINKS } from '../../data/social';
import BlackMetalCard from '../ui/BlackMetalCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [msgText, setMsgText] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendIdea = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${SOCIAL_LINKS.email}?subject=Project Collaboration Idea&body=${encodeURIComponent(msgText)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-28 px-4 sm:px-8 z-10">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Top Status */}
        <div className="mb-6 flex justify-center">
          <GlowBadge color="crimson">
            THE FINAL SCENE // TRANSMISSION
          </GlowBadge>
        </div>

        {/* Cinematic Main Heading */}
        <div className="mb-8">
          <MaskSlide>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-tight">
              HAVE AN IDEA?
            </h2>
          </MaskSlide>
          <MaskSlide delay={0.1}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-magenta to-accent-crimson uppercase leading-tight">
              LET'S BUILD IT.
            </h2>
          </MaskSlide>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-text-muted font-light leading-relaxed mb-12">
          {PROFILE.contactDescription}
        </p>

        {/* Primary Contact Channels */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {/* GitHub CTA */}
          <MagneticButton
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            dataCursor="link"
            className="px-7 py-3.5 rounded-2xl border border-purple-deep bg-surface-deep/90 hover:border-accent-violet text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2.5 transition-colors"
          >
            <Github className="w-4 h-4 text-accent-violet" />
            <span>GITHUB</span>
          </MagneticButton>

          {/* Discord CTA */}
          <MagneticButton
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            dataCursor="link"
            className="px-7 py-3.5 rounded-2xl border border-purple-deep bg-surface-deep/90 hover:border-accent-magenta text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2.5 transition-colors"
          >
            <Discord className="w-4 h-4 text-accent-magenta" />
            <span>DISCORD</span>
          </MagneticButton>

          {/* Email Copy CTA */}
          <MagneticButton
            onClick={copyEmail}
            dataCursor="copy"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-violet via-accent-magenta to-accent-crimson text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-magenta-glow transition-opacity hover:opacity-90"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Mail className="w-4 h-4" />}
            <span>{copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
          </MagneticButton>
        </div>

        {/* Interactive Quick Transmission Box */}
        <BlackMetalCard className="max-w-lg mx-auto p-6 text-left">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-deep/50 text-[10px] font-mono text-text-subtle uppercase">
            <span>DIRECT TRANSMISSION</span>
            <span className="text-accent-soft">{SOCIAL_LINKS.email}</span>
          </div>

          <form onSubmit={handleSendIdea} className="space-y-4">
            <textarea
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Tell me about your bot concept, web platform, or project vision..."
              rows={3}
              className="w-full rounded-xl p-3 bg-surface-deep border border-purple-deep text-xs font-mono text-text-main placeholder:text-text-subtle focus:outline-none focus:border-accent-violet resize-none"
            />
            <button
              type="submit"
              data-cursor="hover"
              className="w-full py-3 rounded-xl bg-accent-violet hover:bg-accent-violet/90 text-white font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-violet-glow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>INITIALIZE TRANSMISSION</span>
            </button>
          </form>
        </BlackMetalCard>
      </div>
    </section>
  );
}

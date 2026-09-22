import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ExternalLink } from 'lucide-react';
import SoundToggle from '../ui/SoundToggle';
import { SOCIAL_LINKS } from '../../data/social';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ activeSection = 'hero', scrollY = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 40;

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 py-3 sm:py-4 px-4 sm:px-8 ${
          isScrolled
            ? 'bg-surface-deep/80 backdrop-blur-xl border-b border-purple-deep/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Identity */}
          <button
            onClick={() => scrollToSection('hero')}
            data-cursor="hover"
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-purple-deep flex items-center justify-center text-accent-violet group-hover:border-accent-violet transition-colors shadow-sm">
              <Terminal className="w-4 h-4 text-accent-violet group-hover:text-accent-magenta transition-colors" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-[0.2em] text-text-main group-hover:text-accent-soft transition-colors block">
                RAWMILK3017<span className="text-accent-violet">.EXE</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-text-subtle uppercase block">
                Discord & Web Dev
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-surface-deep/60 border border-purple-deep/50 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  data-cursor="hover"
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-violet/30 to-accent-magenta/30 border border-accent-violet/60 shadow-subtle-glow -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Audio + Discord/GitHub Quick Links + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <SoundToggle />

            {/* GitHub Quick CTA */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-deep bg-surface-subtle/70 text-xs font-mono tracking-wider text-text-main hover:border-accent-violet/60 hover:text-accent-soft transition-all"
            >
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3 text-accent-violet" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-cursor="hover"
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-lg border border-purple-deep bg-surface-subtle/80 text-text-main hover:border-accent-violet transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-40 p-4 md:hidden"
          >
            <div className="rounded-2xl border border-purple-deep/80 bg-surface-deep/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl font-mono text-sm tracking-wider flex items-center justify-between ${
                      activeSection === item.id
                        ? 'bg-accent-violet/20 text-accent-soft border border-accent-violet/40 font-bold'
                        : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-purple-deep/60 flex items-center justify-between text-xs font-mono">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-soft flex items-center gap-1"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-magenta hover:text-accent-soft flex items-center gap-1"
                >
                  Discord <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { SOCIALS } from '../../data/social';
import { PROFILE } from '../../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-purple-deep/50 bg-[#07050A]/95 py-12 px-4 sm:px-8 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Brand & Roles */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4 text-accent-violet" />
            <span className="font-display font-bold text-sm tracking-[0.25em] text-white">
              RAWMILK3017<span className="text-accent-violet">.EXE</span>
            </span>
          </div>
          <p className="text-[11px] text-text-subtle tracking-wider">
            Discord Bot Developer • Web Developer • Open Source Developer
          </p>
        </div>

        {/* Center Social Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {SOCIALS.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target={soc.available ? "_blank" : undefined}
              rel={soc.available ? "noopener noreferrer" : undefined}
              data-cursor={soc.available ? "link" : "hover"}
              className={`transition-colors tracking-wider ${
                soc.available
                  ? 'text-accent-soft hover:text-white font-semibold'
                  : 'text-text-subtle hover:text-text-muted cursor-default'
              }`}
            >
              {soc.name}
            </a>
          ))}
        </div>

        {/* Right Scroll To Top & Year */}
        <div className="flex items-center gap-4 text-text-subtle">
          <span>&copy; {new Date().getFullYear()} RAWMILK3017.</span>
          <button
            onClick={scrollToTop}
            data-cursor="hover"
            aria-label="Back to Top"
            className="p-2 rounded-lg border border-purple-deep bg-surface-deep hover:border-accent-violet text-text-muted hover:text-white transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

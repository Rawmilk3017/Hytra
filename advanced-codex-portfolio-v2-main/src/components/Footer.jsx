import React from "react";
import { SOCIAL_LINKS } from "../constants";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050816] border-t border-[#232631] py-8 px-6 sm:px-16 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Personal portfolio footer */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[15px]">
          <p className="text-white font-medium">
            Built by{" "}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#915EFF] font-bold hover:underline transition-all"
            >
              Rawmilk3017
            </a>
          </p>

          <span className="hidden sm:inline text-secondary">•</span>

          <p className="text-secondary text-[14px]">
            Discord bots • Web • Minecraft • Automation
          </p>
        </div>

        {/* Action Links & Back to Top */}
        <div className="flex items-center gap-6 text-[14px]">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors"
          >
            GitHub
          </a>

          <a
            href={SOCIAL_LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-[#915EFF] transition-colors"
          >
            Website
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full bg-tertiary border border-secondary/20 flex items-center justify-center text-secondary hover:text-white hover:border-[#915EFF] transition-all shadow-md cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

// Official reference site & Devicon verified assets
import htmlIcon from "../assets/html-P_XORoKv.png";
import cssIcon from "../assets/css-gLKK_hwV.png";
import mongodbIcon from "../assets/mongodb-51PRC_bF.png";
import nodejsIcon from "../assets/nodejs-cOREf0jI.png";
import tailwindIcon from "../assets/tailwind-i0ent8iN.png";
import dockerIcon from "../assets/docker-60Ckme38.png";
import figmaIcon from "../assets/figma-3Xqs7UmR.png";
import reactIcon from "../assets/react.svg";
import jsIcon from "../assets/javascript.svg";
import tsIcon from "../assets/typescript.svg";
import pythonIcon from "../assets/python.svg";
import gitIcon from "../assets/git.svg";

export const TECH_ICONS = {
  JavaScript: (
    <img
      src={jsIcon}
      alt="JavaScript"
      className="w-12 h-12 object-contain rounded-md shadow-sm"
    />
  ),
  TypeScript: (
    <img
      src={tsIcon}
      alt="TypeScript"
      className="w-12 h-12 object-contain rounded-md shadow-sm"
    />
  ),
  React: (
    <img
      src={reactIcon}
      alt="React"
      className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(97,218,251,0.5)]"
    />
  ),
  "Next.js": (
    <svg viewBox="0 0 180 180" className="w-12 h-12" aria-label="Next.js">
      <circle cx="90" cy="90" r="88" fill="#ffffff" />
      <circle cx="90" cy="90" r="86" fill="#000000" />
      <path fill="#ffffff" d="M149.5 157.4 69.9 54.1H54v71.8h14.4V69.8l70.8 91.9c3.6-1.4 7.1-3 10.3-4.3z" />
      <path fill="#ffffff" d="M112.1 54.1h14.4v48.6h-14.4z" />
    </svg>
  ),
  "Node.js": (
    <img
      src={nodejsIcon}
      alt="Node.js"
      className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(83,158,67,0.4)]"
    />
  ),
  "Discord.js": (
    <svg viewBox="0 0 127.14 96.36" className="w-12 h-12 filter drop-shadow-[0_0_8px_rgba(88,101,242,0.5)]" aria-label="Discord.js">
      <path
        fill="#5865F2"
        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z"
      />
    </svg>
  ),
  Python: (
    <img
      src={pythonIcon}
      alt="Python"
      className="w-12 h-12 object-contain"
    />
  ),
  "Three.js": (
    <svg viewBox="0 0 128 128" className="w-12 h-12" aria-label="Three.js">
      <path fill="#ffffff" d="M64 8.7 11.8 38.8v60.2L64 129.1l52.2-30.1V38.8L64 8.7zm38.2 81.3L64 109.2 25.8 87.2v-44L64 21.2l38.2 22v46.8z" />
      <path fill="#915EFF" d="M64 35.8 38.5 50.5v29.4L64 94.6l25.5-14.7V50.5L64 35.8z" />
    </svg>
  ),
  "Tailwind CSS": (
    <img
      src={tailwindIcon}
      alt="Tailwind CSS"
      className="w-12 h-12 object-contain"
    />
  ),
  MongoDB: (
    <img
      src={mongodbIcon}
      alt="MongoDB"
      className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(71,162,72,0.4)]"
    />
  ),
  "Git / GitHub": (
    <img
      src={gitIcon}
      alt="Git"
      className="w-12 h-12 object-contain"
    />
  ),
  Docker: (
    <img
      src={dockerIcon}
      alt="Docker"
      className="w-12 h-12 object-contain"
    />
  ),
  "HTML 5": (
    <img
      src={htmlIcon}
      alt="HTML 5"
      className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(227,79,38,0.4)]"
    />
  ),
  "CSS 3": (
    <img
      src={cssIcon}
      alt="CSS 3"
      className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(21,114,182,0.4)]"
    />
  ),
  Figma: (
    <img
      src={figmaIcon}
      alt="Figma"
      className="w-12 h-12 object-contain"
    />
  ),
};

// Case-insensitive lookup helper
export const getTechIcon = (name) => {
  if (!name) return null;
  if (TECH_ICONS[name]) return TECH_ICONS[name];

  const lower = name.toLowerCase().replace(/[\s\-_.]/g, "");
  for (const [key, icon] of Object.entries(TECH_ICONS)) {
    const keyLower = key.toLowerCase().replace(/[\s\-_.]/g, "");
    if (keyLower === lower || lower.includes(keyLower) || keyLower.includes(lower)) {
      return icon;
    }
  }
  return null;
};

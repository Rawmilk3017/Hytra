import backend from "../assets/backend-eJbiv30d.png";
import creator from "../assets/creator-Kxn6XPAS.png";
import mobile from "../assets/mobile-nsCxKNJ2.png";
import web from "../assets/web-2Xs7v1YF.png";
import github from "../assets/github-IexgpGUD.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const services = [
  { title: "Discord Bot Developer", icon: mobile },
  { title: "Web Developer", icon: web },
  { title: "Minecraft Developer", icon: creator },
  { title: "Automation & AI", icon: backend },
];

export const technologies = [
  { name: "Python" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Discord.js" },
  { name: "Git / GitHub" },
  { name: "HTML 5" },
  { name: "CSS 3" },
  { name: "Tailwind CSS" },
  { name: "Three.js" },
  { name: "MongoDB" },
];

export const experiences = [
  {
    title: "Discord Bot Development",
    company_name: "Bots, Dashboards & Automation",
    icon: mobile,
    iconBg: "#383E56",
    date: "Current Focus",
    points: [
      "Building Discord bots with Python and JavaScript for moderation, tickets, utilities, monitoring, and server automation.",
      "Designing interactive commands, buttons, select menus, dashboards, permissions, and persistent JSON/database-backed settings.",
      "Creating reusable bot systems that can be customized for different Discord communities and projects.",
    ],
  },
  {
    title: "Web Development",
    company_name: "Interactive Websites & Dashboards",
    icon: web,
    iconBg: "#E6DEDD",
    date: "Current Focus",
    points: [
      "Creating modern responsive websites and dashboards with React, Vite, JavaScript, HTML, CSS, and Tailwind CSS.",
      "Building portfolio sites, Minecraft project sites, bot dashboards, and web-based control panels.",
      "Connecting frontends to APIs and backend services while keeping the interface fast and mobile-friendly.",
    ],
  },
  {
    title: "Minecraft Development",
    company_name: "Servers, Bots & Tools",
    icon: creator,
    iconBg: "#383E56",
    date: "Current Projects",
    points: [
      "Building Minecraft-focused tools, server utilities, monitoring bots, and custom gameplay systems.",
      "Working with Paper/Java server environments, plugins, WorldEdit workflows, and Discord integrations.",
      "Developing service workflows for Minecraft communities, including queues, orders, monitoring, and support systems.",
    ],
  },
  {
    title: "AI & Automation",
    company_name: "AI-Assisted Developer Tools",
    icon: backend,
    iconBg: "#E6DEDD",
    date: "Exploring & Building",
    points: [
      "Experimenting with AI assistants and Groq-powered experiences for websites and developer dashboards.",
      "Using automation to simplify bot management, project workflows, support systems, and server operations.",
      "Combining AI with practical interfaces instead of treating it as a standalone feature.",
    ],
  },
];

export const projects = [
  {
    name: "Hytra",
    description:
      "An all-in-one Discord bot concept combining moderation, utilities, giveaways, invites, tickets, premium features, and a web dashboard.",
    tags: [
      { name: "discord", color: "blue-text-gradient" },
      { name: "python", color: "green-text-gradient" },
      { name: "dashboard", color: "pink-text-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/Rawmilk3017",
  },
  {
    name: "Deathbound SMP",
    description:
      "A Minecraft SMP project with a dedicated website, community information, owner profiles, recent posts, and an AI assistant experience.",
    tags: [
      { name: "minecraft", color: "blue-text-gradient" },
      { name: "react", color: "green-text-gradient" },
      { name: "groq", color: "pink-text-gradient" },
    ],
    image: web,
    source_code_link: "https://rawmilk3017.net",
  },
  {
    name: "Minecraft Services",
    description:
      "A Discord-based service workflow for Minecraft communities with orders, queues, payment confirmation, farming/mining services, and builder support.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "discord.py", color: "green-text-gradient" },
      { name: "minecraft", color: "pink-text-gradient" },
    ],
    image: mobile,
    source_code_link: "https://github.com/Rawmilk3017",
  },
  {
    name: "Build-a-Bot Platform",
    description:
      "A customizable bot-building service concept with ticket intake, feature packages, hosting options, customer management, and a planned dashboard.",
    tags: [
      { name: "discord", color: "blue-text-gradient" },
      { name: "automation", color: "green-text-gradient" },
      { name: "web", color: "pink-text-gradient" },
    ],
    image: creator,
    source_code_link: "https://github.com/Rawmilk3017",
  },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/Rawmilk3017",
  discord: "",
  website: "https://rawmilk3017.net",
  email: "",
};

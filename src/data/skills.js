export const SKILLS = [
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Language",
    description: "Modern ECMAScript, asynchronous programming, event loop mechanics, and DOM APIs.",
    position: [-2.5, 1.2, 0.4],
    color: "#F5D0FE"
  },
  {
    id: "react",
    name: "React",
    category: "UI Architecture",
    description: "Component lifecycle, state primitives, hooks architecture, and concurrent rendering.",
    position: [-1.2, 2.2, -0.6],
    color: "#A855F7"
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack Web",
    description: "Server-side rendering, App Router architecture, route handlers, and static generation.",
    position: [0.8, 2.4, 0.2],
    color: "#EC4899"
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Runtime & Backend",
    description: "Server-side runtime, stream pipelines, event-driven microservices, and REST APIs.",
    position: [-2.2, -0.8, -0.4],
    color: "#A855F7"
  },
  {
    id: "discordjs",
    name: "Discord.js",
    category: "Bot Engineering",
    description: "WebSocket gateway communication, interaction handlers, voice state, and automation.",
    position: [-0.6, -1.8, 0.5],
    color: "#EC4899"
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "3D & Creative",
    description: "WebGL render loops, custom shaders, procedural geometry, scene graph & lighting.",
    position: [1.8, 1.4, -0.3],
    color: "#F43F5E"
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Design Systems",
    description: "Utility-first design tokens, responsive layouts, custom plugins, and animation curves.",
    position: [2.4, -0.4, 0.3],
    color: "#F5D0FE"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    description: "NoSQL document schemas, aggregation pipelines, indexing strategies, and clustering.",
    position: [1.2, -1.9, -0.5],
    color: "#A855F7"
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "Tooling & DevOps",
    description: "Version control branching, open-source workflows, release automation, and pull requests.",
    position: [0.0, 0.2, 1.0],
    color: "#EC4899"
  }
];

// Graph connections for 3D constellation
export const SKILL_CONNECTIONS = [
  ["javascript", "react"],
  ["javascript", "nodejs"],
  ["react", "nextjs"],
  ["react", "tailwindcss"],
  ["react", "threejs"],
  ["nodejs", "discordjs"],
  ["nodejs", "mongodb"],
  ["javascript", "git"],
  ["nextjs", "git"],
  ["discordjs", "mongodb"],
  ["threejs", "javascript"]
];

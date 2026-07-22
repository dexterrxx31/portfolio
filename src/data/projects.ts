export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
  flagship?: boolean;
}

const gh = (repo: string) => `https://github.com/dexterrxx31/${repo}`;

export const featuredProjects: Project[] = [
  {
    name: "showrunner",
    tagline: "An AI-programmed linear TV channel",
    description:
      "A cloud playout engine that turns a media library into a 24/7 HLS live stream — with Claude as the programming director. A stateless manifest generator maps wall clock + schedule onto pre-cut segments (the same manifest-stitching architecture behind Pluto-style FAST channels), so replicas agree byte-for-byte and horizontal scaling is free.",
    tech: ["Python", "FastAPI", "ffmpeg", "HLS", "Claude API", "Broadcast"],
    repo: gh("showrunner"),
    flagship: true,
  },
  {
    name: "StreamVault",
    tagline: "Full-stack video streaming platform",
    description:
      "High-performance video streaming with a premium glassmorphism UI and a Spring Boot backend — JWT authentication, protected routes, multipart uploads with real-time progress, and metadata management.",
    tech: ["Java", "Spring Boot", "JWT", "REST APIs"],
    repo: gh("streamvault"),
  },
  {
    name: "Daily Journal",
    tagline: "Markdown blog with $0/month deployment",
    description:
      "A professional blog app with a glassmorphism UI — XSS-safe Markdown rendering, auto excerpts, reading time & slug generation, light/dark themes, CI/CD pipeline, SQLite/Turso storage. Live in production.",
    tech: ["Node.js", "Express", "EJS", "SQLite", "CI/CD"],
    repo: gh("my-blog-app"),
    live: "https://daily-journal-aqhg.onrender.com/",
  },
  {
    name: "Knowledge Bank",
    tagline: "Interactive CS learning platform",
    description:
      "An interactive CS knowledge bank covering OS, DBMS, Networks, OOP, DSA, System Design, RAG & Kubernetes — animated step-through visualizers (CPU scheduling, TCP handshake, sorting, BFS/DFS), clickable SVG diagrams, runnable code, and self-check quizzes. Zero dependencies, no build step.",
    tech: ["JavaScript", "SVG", "Canvas", "localStorage"],
    repo: gh("knowledgeBank"),
  },
  {
    name: "Tasks",
    tagline: "Installable offline-first PWA to-do app",
    description:
      "A sleek to-do app in pure vanilla JS — installable PWA that works offline, drag-to-reorder with mouse & touch, smart due-date labels, aurora glassmorphism UI, safe-area aware on iPhone, and fully accessible with reduced-motion support.",
    tech: ["PWA", "Vanilla JS", "Service Worker", "CSS"],
    repo: gh("TodoTask"),
  },
];

export const honorableMentions: { name: string; blurb: string; repo: string }[] = [
  {
    name: "weather-app",
    blurb: "Weather app — OpenWeather API + Node.js",
    repo: gh("weather-app"),
  },
  {
    name: "DeepLearning_PyTorch",
    blurb: "Deep learning projects in PyTorch",
    repo: gh("DeepLearning_PyTorch"),
  },
  {
    name: "e-yantra",
    blurb: "IIT-Bombay e-Yantra robotics competition",
    repo: gh("e-yantra"),
  },
  {
    name: "DataStructuresAlgorithms",
    blurb: "DSA implementations & problem solutions in C++",
    repo: gh("DataStructuresAlgorithms"),
  },
  {
    name: "Machine-Learning",
    blurb: "ML algorithms with scikit-learn notebooks",
    repo: gh("Machine-Learning"),
  },
];

export const githubProfile = "https://github.com/dexterrxx31";
export const linkedinProfile = "https://www.linkedin.com/in/riyanahmad";
export const email = "riyanahmad99@gmail.com";

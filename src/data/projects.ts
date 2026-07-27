export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
  flagship?: boolean;
  /** Longer intro shown in the detail modal. */
  overview?: string;
  /** Architecture / how-it-works bullets. */
  architecture?: string[];
  /** Notable features. */
  features?: string[];
}

const gh = (repo: string) => `https://github.com/dexterrxx31/${repo}`;

export const featuredProjects: Project[] = [
  {
    name: "showrunner",
    tagline: "An AI-programmed linear TV channel",
    description:
      "A cloud playout engine that turns a media library into a 24/7 HLS live stream — with Claude as the programming director. A stateless manifest generator maps wall clock + schedule onto pre-cut segments (the same manifest-stitching architecture behind Pluto-style FAST channels), so replicas agree byte-for-byte and horizontal scaling is free.",
    tech: [
      "Python",
      "FastAPI",
      "ffmpeg",
      "HLS",
      "Claude API",
      "Celery",
      "S3 / MinIO",
      "Docker",
    ],
    repo: gh("showrunner"),
    flagship: true,
    overview:
      "showrunner turns a media library into a 24/7 broadcast TV channel, with Claude as the programming director. No video is processed at playout time — assets are normalized to one spec and pre-cut into HLS segments at ingest, and the \"channel\" is a stateless manifest generator that maps wall clock + schedule onto those pre-cut segments.",
    architecture: [
      "Every HLS playlist is a pure function of (epoch, catalog, schedule, wall clock) — the same manifest-stitching approach behind Pluto-style FAST channels.",
      "Because manifests are deterministic, replicas agree byte-for-byte, restarts can't drift the channel, and horizontal scaling is essentially free.",
      "Ingest pipeline normalizes uploads to a uniform spec and pre-cuts them into HLS segments; runs in-process by default or routes to a Celery worker.",
      "Claude acts as programming director: a natural-language brief → a validated, gapless broadcast schedule.",
      "Segments served from local disk in dev, or MinIO/S3 in production with nginx/CDN in front.",
    ],
    features: [
      "Live HLS playlist (sliding window) with on-air / up-next JSON",
      "AI schedule generation from a plain-English brief",
      "Multi-channel management with per-channel schedules",
      "XMLTV + JSON EPG (electronic programme guide)",
      "hls.js demo player with a live on-air bar and guide",
    ],
  },
  {
    name: "StreamVault",
    tagline: "Full-stack video streaming platform",
    description:
      "High-performance video streaming with a premium glassmorphism UI and a Spring Boot backend — JWT authentication, protected routes, multipart uploads with real-time progress, and metadata management.",
    tech: [
      "Java",
      "Spring Boot 3.4",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "Angular",
      "REST APIs",
    ],
    repo: gh("streamvault"),
    overview:
      "StreamVault is a high-performance, full-stack video streaming platform pairing a premium glassmorphism UI with a robust Spring Boot backend — built for secure video management, large uploads and smooth playback.",
    architecture: [
      "Three-tier: Angular frontend ⟷ Spring Boot REST API ⟷ relational database via JPA / Hibernate.",
      "Stateless JWT authentication with Spring Security — encrypted tokens, protected routes, and session persistence via stored tokens.",
      "Dedicated multipart handling for high-speed uploads of large video files, with real-time progress.",
      "Precise metadata tracking (title, size, format) persisted through Spring Data JPA.",
    ],
    features: [
      "JWT login with protected dashboard & player",
      "High-speed multipart uploads with progress indicators",
      "Video metadata storage & management",
      "Immersive, high-quality streaming playback",
    ],
  },
  {
    name: "Daily Journal",
    tagline: "Markdown blog with $0/month deployment",
    description:
      "A professional blog app with a glassmorphism UI — XSS-safe Markdown rendering, auto excerpts, reading time & slug generation, light/dark themes, CI/CD pipeline, SQLite/Turso storage. Live in production.",
    tech: [
      "Node.js",
      "Express 4",
      "EJS",
      "libSQL / Turso",
      "marked",
      "sanitize-html",
      "GitHub Actions",
      "Render",
    ],
    repo: gh("my-blog-app"),
    live: "https://daily-journal-aqhg.onrender.com/",
    overview:
      "A modern, professional Markdown blog with a glassmorphism UI, built with Express + EJS + SQLite — no frontend framework, no build step, and deployable for $0/month.",
    architecture: [
      "Server-rendered with Express 4 + EJS templates — no SPA and no build step.",
      "libSQL (SQLite dialect): a local file in development, Turso's free tier in production.",
      "XSS-safe Markdown — content is sanitized after parsing (marked + sanitize-html); scripts and javascript: URLs are stripped.",
      "Excerpts, reading time (~200 wpm) and slug URLs are generated automatically on save.",
      "CI/CD via GitHub Actions; deploys free on Render + Turso.",
    ],
    features: [
      "Markdown posts — headings, code blocks, images, links",
      "Featured-post spotlight with a magazine-style card",
      "Light / dark themes",
      "Admin authoring flow",
    ],
  },
  {
    name: "Knowledge Bank",
    tagline: "Interactive CS learning platform",
    description:
      "An interactive CS knowledge bank covering OS, DBMS, Networks, OOP, DSA, System Design, RAG & Kubernetes — animated step-through visualizers (CPU scheduling, TCP handshake, sorting, BFS/DFS), clickable SVG diagrams, runnable code, and self-check quizzes. Zero dependencies, no build step.",
    tech: ["JavaScript", "SVG", "Canvas", "localStorage", "GitHub Pages"],
    repo: gh("knowledgeBank"),
    live: "https://dexterrxx31.github.io/knowledgeBank/",
    overview:
      "An interactive CS knowledge bank spanning OS, DBMS, Networks, OOP, DSA, System Design, RAG & Kubernetes — mixing animated visualizers, clickable diagrams, runnable code and quizzes. Zero dependencies, no build step.",
    architecture: [
      "Pure HTML / CSS / JS — no framework, no build step; served as static files on GitHub Pages.",
      "Animated step-through visualizers with play / pause / step / speed controls (CPU scheduling, TCP handshake, sorting, BFS/DFS).",
      "Clickable SVG diagrams — process states, OSI model, B+ trees, UML inheritance.",
      "In-page runnable JavaScript snippets and self-check quizzes.",
      "Progress (topics read + quiz scores) persisted in localStorage.",
    ],
    features: [
      "7 tracks: CS fundamentals, DSA, LLD, HLD, RAG, Kubernetes, Java/Spring/Python",
      "Interactive visualizers & clickable diagrams",
      "Editable, runnable code snippets",
      "Quizzes with saved best scores",
    ],
  },
  {
    name: "Tasks",
    tagline: "Installable offline-first PWA to-do app",
    description:
      "A sleek to-do app in pure vanilla JS — installable PWA that works offline, drag-to-reorder with mouse & touch, smart due-date labels, aurora glassmorphism UI, safe-area aware on iPhone, and fully accessible with reduced-motion support.",
    tech: ["PWA", "Vanilla JS", "Service Worker", "localStorage", "CSS"],
    repo: gh("TodoTask"),
    live: "https://dexterrxx31.github.io/TodoTask/",
    overview:
      "A sleek, installable to-do app written in pure vanilla JS — it works offline as a PWA, supports drag-to-reorder, smart due dates, and an aurora glassmorphism UI, with zero frameworks and no build step.",
    architecture: [
      "Pure vanilla HTML / CSS / JS — no framework, no build step.",
      "Installable PWA backed by a service worker for offline use; add-to-home-screen on iOS & Android.",
      "All state persisted in localStorage.",
      "Drag-to-reorder with both mouse & touch; safe-area aware on iPhone; respects reduced-motion.",
    ],
    features: [
      "Offline-first, installable PWA",
      "Drag-to-reorder (mouse + touch)",
      "Smart due-date labels + overdue highlighting",
      "Light / dark themes, fully accessible",
    ],
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

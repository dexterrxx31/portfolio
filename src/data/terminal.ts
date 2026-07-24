import { featuredProjects, honorableMentions, githubProfile, linkedinProfile, email } from "./projects";
import { experience, education } from "./experience";
import { skillGroups } from "./skills";
import { hobbies } from "./hobbies";
import { photos } from "./photos";

export interface CommandResult {
  lines: string[];
  /** Special side effects the Terminal component intercepts. */
  action?: "clear" | "resume";
}

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat about.md",
  "skills",
  "projects",
  "experience",
  "hobbies",
  "photography",
  "neofetch",
  "curl /api/about",
  "uptime",
  "resume",
  "social",
  "clear",
  "echo",
  "sudo",
] as const;

const HELP: string[] = [
  "Available commands:",
  "",
  "  help              show this list",
  "  whoami            who am i",
  "  ls                list sections",
  "  cat about.md      read my bio",
  "  skills            tech stack",
  "  projects          featured work",
  "  experience        work history",
  "  hobbies           what i do off the clock",
  "  photography       my photo gallery",
  "  neofetch          system info card",
  "  curl /api/about   fetch profile as JSON",
  "  uptime            fun stats",
  "  resume            download my resume (pdf)",
  "  social            links",
  "  clear             clear the screen",
  "",
  "  tip: use ↑ / ↓ for history",
];

const NEOFETCH: string[] = [
  "        _nnnn_          riyan@portfolio",
  "       dGGGGMMb         ----------------",
  "      @p~qp~~qMb        OS: riyan-os (backend edition)",
  "      M|@||@) M|        Host: Evertz Microsystems",
  "      @,----.JM|        Role: Software Development Engineer 1",
  "     JS^\\__/  qKL       Shell: bash + fastapi",
  "    dZP        qKRb     Cloud: AWS (Lambda·S3·EC2·DynamoDB)",
  "   dZP          qKKb    Lang: Python · Java · C++ · TS",
  "  fZP            SMMb   DB: MariaDB · DynamoDB",
  "  HZM            MMMM   Uptime: 3+ years",
  "  FqM            MMMM   ",
  "__| \".        |\\dS\"qML  ████ ████ ████ ████ ████",
  "|    `.       | `' \\Zq  ",
];

function jsonProfile(): string[] {
  const obj = {
    name: "Riyan Ahmad",
    role: "Software Development Engineer 1",
    company: "Evertz Microsystems",
    location: "India",
    focus: ["backend", "cloud", "broadcast/media"],
    stack: {
      languages: ["Python", "Java", "C", "C++", "TypeScript"],
      cloud: ["AWS Lambda", "S3", "EC2", "DynamoDB", "Step Functions"],
      frameworks: ["Spring", "FastAPI", "Django"],
    },
    education: `${education.degree}, ${education.school} (${education.score})`,
    email,
    github: githubProfile,
    linkedin: linkedinProfile,
    open_to_work: true,
  };
  return ["HTTP/1.1 200 OK", "content-type: application/json", "", ...JSON.stringify(obj, null, 2).split("\n")];
}

export function runCommand(raw: string): CommandResult {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const lower = input.toLowerCase();

  if (lower === "clear" || lower === "cls") return { lines: [], action: "clear" };
  if (lower === "help" || lower === "?") return { lines: HELP };
  if (lower === "whoami")
    return {
      lines: [
        "riyan — backend & cloud engineer.",
        "I build the software behind live television at Evertz Microsystems.",
      ],
    };
  if (lower === "ls" || lower === "ls -la")
    return {
      lines: [
        "drwxr-xr-x  about.md      experience/   projects/",
        "drwxr-xr-x  skills/       hobbies/      photography/",
        "-rw-r--r--  resume.pdf    contact.sh",
      ],
    };
  if (lower === "cat about.md")
    return {
      lines: [
        "# About",
        "Backend engineer at Evertz Microsystems building broadcast/media",
        "pipelines — content workflows, WebSocket playlist management, and",
        "event-driven microservices on AWS. Contract-first with OpenAPI/AsyncAPI.",
      ],
    };
  if (lower === "skills")
    return {
      lines: skillGroups.flatMap((g) => [`~/${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`, "  " + g.skills.join("  ·  "), ""]),
    };
  if (lower === "projects")
    return {
      lines: [
        ...featuredProjects.map((p) => `★ ${p.name.padEnd(16)} ${p.tagline}`),
        "",
        "more: " + honorableMentions.map((m) => m.name).join(", "),
      ],
    };
  if (lower === "experience")
    return {
      lines: experience.flatMap((j) => [`${j.period}`, `  ${j.role} @ ${j.company}`, ""]),
    };
  if (lower === "hobbies")
    return { lines: hobbies.map((h) => `~/hobbies/${h.slug.padEnd(14)} ${h.blurb}`) };
  if (lower === "photography")
    return {
      lines: [`${photos.length} frames in ~/photography/`, "scroll down to the gallery to view them.", ...photos.map((p) => `  📷 ${p.title} — ${p.location}`)],
    };
  if (lower === "neofetch" || lower === "screenfetch") return { lines: NEOFETCH };
  if (lower === "curl /api/about" || lower === "curl /api/about.json" || lower === "wget /api/about")
    return { lines: jsonProfile() };
  if (lower === "uptime")
    return {
      lines: [
        "up 3+ years,  load average: 0.42, 0.58, 0.63",
        "12+ projects deployed · 600+ students mentored · 999+ coffees",
      ],
    };
  if (lower === "resume" || lower === "cat resume.pdf" || lower === "./resume")
    return { lines: ["fetching resume.pdf …", "download started ↓"], action: "resume" };
  if (lower === "social" || lower === "links")
    return { lines: [`github:   ${githubProfile}`, `linkedin: ${linkedinProfile}`, `email:    ${email}`] };
  if (lower.startsWith("echo ")) return { lines: [input.slice(5)] };
  if (lower.startsWith("sudo"))
    return { lines: ["riyan is not in the sudoers file. This incident will be reported. 🚨"] };
  if (lower === "exit") return { lines: ["nice try — you can't exit greatness 😎"] };

  return {
    lines: [`command not found: ${input}`, "type 'help' for a list of commands."],
  };
}

export const AUTOCOMPLETE = COMMANDS;

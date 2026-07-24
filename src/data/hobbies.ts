import type { LucideIcon } from "lucide-react";
import { Camera, Server, GitBranch, Gamepad2, Plane, BookOpen } from "lucide-react";

export interface Hobby {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  detail: string;
}

/*
 * Edit freely — this drives both the Hobbies cards and the terminal `hobbies`
 * command. Photography is real; the rest are sensible placeholders you can
 * swap for your actual interests.
 */
export const hobbies: Hobby[] = [
  {
    slug: "photography",
    title: "Photography",
    icon: Camera,
    blurb: "Chasing light, streets & landscapes",
    detail:
      "I shoot streets, landscapes and long exposures — see the gallery below. Framing a scene scratches the same itch as designing a clean API: composition under constraints.",
  },
  {
    slug: "homelab",
    title: "Homelab & Self-hosting",
    icon: Server,
    blurb: "Linux boxes, Docker, tinkering",
    detail:
      "Running services on my own hardware — Docker, reverse proxies, and the occasional 2 a.m. `journalctl -xe`. It's where I break things safely.",
  },
  {
    slug: "open-source",
    title: "Open Source",
    icon: GitBranch,
    blurb: "Building & sharing in public",
    detail:
      "Side projects like showrunner and this very site live on GitHub. I enjoy shipping small tools and reading other people's clever code.",
  },
  {
    slug: "gaming",
    title: "Gaming",
    icon: Gamepad2,
    blurb: "Strategy & story-driven titles",
    detail:
      "Unwinding with strategy and story-rich games — systems thinking, but for fun.",
  },
  {
    slug: "travel",
    title: "Travel",
    icon: Plane,
    blurb: "New places, new frames",
    detail:
      "Traveling doubles as photography fuel — new cities, new light, new problems to compose around.",
  },
  {
    slug: "reading",
    title: "Reading",
    icon: BookOpen,
    blurb: "Systems, sci-fi & engineering blogs",
    detail:
      "Distributed-systems papers, engineering blogs and the odd sci-fi novel keep the ideas flowing.",
  },
];

import type { LucideIcon } from "lucide-react";
import { Camera, Plane, Wand2, Mountain, ChefHat } from "lucide-react";

export interface Hobby {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  detail: string;
}

/*
 * Edit freely — this drives both the Hobbies cards and the terminal `hobbies`
 * command.
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
    slug: "travel",
    title: "Travel",
    icon: Plane,
    blurb: "New places, new frames",
    detail:
      "Traveling doubles as photography fuel — new cities, new light, and a break from the screen. The best ideas tend to show up somewhere far from my desk.",
  },
  {
    slug: "trekking",
    title: "Trekking",
    icon: Mountain,
    blurb: "Trails, summits & thin air",
    detail:
      "Give me a trailhead and a long climb. Trekking is my reset button — no notifications, just switchbacks, and a view that makes the effort worth it.",
  },
  {
    slug: "cooking",
    title: "Cooking",
    icon: ChefHat,
    blurb: "Recipes are just APIs for food",
    detail:
      "I like turning raw ingredients into something good — experimenting with recipes the same way I prototype code: measure, taste, iterate, ship.",
  },
  {
    slug: "vibe-coding",
    title: "Vibe Coding",
    icon: Wand2,
    blurb: "Building for fun with AI copilots",
    detail:
      "Late-night side projects where I just follow the vibe — pairing with AI copilots and agentic tools to turn ideas into working software fast. This very portfolio was built that way.",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

/** Playful "uptime" figures. Tweak freely. */
export const stats: Stat[] = [
  { label: "years shipping code", value: 3, suffix: "+" },
  { label: "projects deployed", value: 12, suffix: "+" },
  { label: "perf reviews @ 4/5", value: 4 },
  { label: "students mentored", value: 600, suffix: "+" },
  { label: "coffees compiled", value: 999, suffix: "+" },
];

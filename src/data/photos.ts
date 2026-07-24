export interface Photo {
  /** File under public/photos/ — e.g. "street-01.jpg". Falsy → renders a placeholder tile. */
  src?: string;
  title: string;
  location: string;
  /** EXIF-style caption line. */
  meta: string;
  /** Grid span for a masonry feel: "tall" doubles row span. */
  size?: "tall" | "wide" | "normal";
}

/*
 * Drop your real images into public/photos/ and set `src` to the filename.
 * See public/photos/README.md. Until then these render as labeled placeholders.
 */
export const photos: Photo[] = [
  {
    title: "Blue Hour",
    location: "Noida, IN",
    meta: "ƒ/8 · 20s · ISO 100 · 24mm",
    size: "tall",
  },
  {
    title: "Neon Alley",
    location: "Delhi, IN",
    meta: "ƒ/1.8 · 1/60 · ISO 800 · 35mm",
  },
  {
    title: "Morning Fog",
    location: "Manali, IN",
    meta: "ƒ/11 · 1/125 · ISO 200 · 50mm",
  },
  {
    title: "City Lights",
    location: "Delhi, IN",
    meta: "ƒ/4 · 4s · ISO 100 · 16mm",
    size: "wide",
  },
  {
    title: "Golden Ridge",
    location: "Kasol, IN",
    meta: "ƒ/9 · 1/250 · ISO 100 · 70mm",
  },
  {
    title: "Rush Hour",
    location: "Noida, IN",
    meta: "ƒ/2.8 · 1/30 · ISO 640 · 35mm",
    size: "tall",
  },
];

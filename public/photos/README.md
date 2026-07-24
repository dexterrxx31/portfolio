# Photography drop-in folder

Put your photo files in **this folder** (`public/photos/`), then reference them
in `src/data/photos.ts` by setting the `src` field to the filename.

## Steps

1. Copy an image here, e.g. `public/photos/street-01.jpg`.
2. Open `src/data/photos.ts` and add/edit an entry:

   ```ts
   {
     src: "street-01.jpg",      // <-- filename in public/photos/
     title: "Neon Alley",
     location: "Delhi, IN",
     meta: "ƒ/1.8 · 1/60 · ISO 800 · 35mm",
     size: "tall",              // "tall" | "wide" | "normal" (optional)
   },
   ```

3. Save. That's it — no component changes needed.

## Tips

- **Format:** `.jpg` or `.webp` (webp is smaller). Keep each image under ~500 KB
  for fast loading on mobile.
- **Size:** ~1600px on the long edge is plenty for the gallery + lightbox.
- Entries **without** a `src` render as labeled placeholder tiles, so you can
  add photos gradually.
- `size: "tall"` makes a tile span two rows; `"wide"` spans two columns — mix
  them for a magazine-style masonry layout.

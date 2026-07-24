# Riyan Ahmad — Portfolio

A modern, animation-heavy personal portfolio with a Linux/terminal aesthetic.

🔗 **Live:** https://dexterrxx31.github.io/portfolio/

## Highlights

- **3D hero** — a rotating WebGL wireframe network globe (react-three-fiber), lazy-loaded behind a Linux-style boot screen
- **Playable terminal** — a real shell (`help`, `neofetch`, `curl /api/about`, `resume`, …)
- **Light / dark themes** — Emerald Terminal (dark) & cyan/violet (light), persisted
- **Fun touches** — magic-wand cursor, scroll-progress beam, and a lazy robo-cat that follows your pointer and naps when idle
- Sections: About, Experience, Projects, Skills, Terminal, Hobbies, Photography (lightbox), Contact form + downloadable resume
- Responsive down to iPhone 15; respects `prefers-reduced-motion`

## Tech

Vite · React + TypeScript · Tailwind CSS v4 · Framer Motion · three / @react-three/fiber · lucide-react

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All content lives in typed data files — no component edits needed:

- `src/data/projects.ts` · `experience.ts` · `skills.ts` · `hobbies.ts` · `photos.ts` · `stats.ts`
- Profile photo: drop `public/profile.jpg`
- Photos: add images to `public/photos/` (see `public/photos/README.md`)
- Resume: `public/resume.pdf`

## Deploy

Pushing to `master` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yml`) which builds and publishes to GitHub Pages.

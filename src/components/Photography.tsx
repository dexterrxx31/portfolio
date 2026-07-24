import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { photos, type Photo } from "../data/photos";

const base = import.meta.env.BASE_URL;

function PhotoTile({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const span =
    photo.size === "tall"
      ? "row-span-2"
      : photo.size === "wide"
        ? "sm:col-span-2"
        : "";
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`group glow-card relative overflow-hidden ${span}`}
    >
      <div className="relative h-full min-h-44 w-full">
        {photo.src ? (
          <img
            src={`${base}photos/${photo.src}`}
            alt={photo.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-44 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-slate-500">
            <Camera size={26} />
            <span className="font-mono text-xs">{photo.title}</span>
          </div>
        )}
        {/* caption overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-3 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-mono text-sm text-white">{photo.title}</p>
          <p className="font-mono text-[0.7rem] text-slate-300">
            {photo.location} · {photo.meta}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Photography() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i! - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const photo = active !== null ? photos[active] : null;

  return (
    <section id="photography" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="07" title="Photography" />
      <p className="mb-10 max-w-2xl text-muted">
        <span className="font-mono text-neon">$</span> feh ~/photography/* — a few
        frames from off the clock.
      </p>

      <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((p, i) => (
          <PhotoTile key={p.title} photo={p} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {photo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 text-slate-300 hover:text-white"
            >
              <X size={26} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i! - 1 + photos.length) % photos.length);
              }}
              className="absolute left-3 text-slate-300 hover:text-neon sm:left-8"
            >
              <ChevronLeft size={34} />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i! + 1) % photos.length);
              }}
              className="absolute right-3 text-slate-300 hover:text-neon sm:right-8"
            >
              <ChevronRight size={34} />
            </button>

            <motion.div
              key={active}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl"
            >
              {photo.src ? (
                <img
                  src={`${base}photos/${photo.src}`}
                  alt={photo.title}
                  className="max-h-[75vh] w-full rounded-lg object-contain"
                />
              ) : (
                <div className="flex aspect-[3/2] w-full items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-slate-400">
                  <div className="text-center">
                    <Camera size={40} className="mx-auto" />
                    <p className="mt-3 font-mono text-sm">
                      {photo.title} — add {`photos/`} image to view
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-4 text-center font-mono">
                <p className="text-white">{photo.title}</p>
                <p className="text-sm text-slate-400">
                  {photo.location} · {photo.meta}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

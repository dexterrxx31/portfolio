import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Star, Boxes, ListChecks } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="term-window my-auto w-full max-w-2xl"
          >
            {/* title bar */}
            <div className="term-bar sticky top-0 z-10">
              <span className="term-dot" style={{ background: "#ff5f56" }} />
              <span className="term-dot" style={{ background: "#ffbd2e" }} />
              <span className="term-dot" style={{ background: "#27c93f" }} />
              <span className="ml-2 flex-1 truncate font-mono text-xs text-slate-500">
                riyan@portfolio: ~/projects/{project.name.toLowerCase().replace(/\s+/g, "-")}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-slate-400 transition-colors hover:text-neon"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
              {/* header */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  {project.flagship && (
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-neon/40 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[0.7rem] text-neon">
                      <Star size={11} /> Flagship
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-violet-neon">
                    {project.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-xs text-slate-300 transition-all hover:border-neon/50 hover:text-neon"
                  >
                    <GithubIcon size={14} /> Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-neon/40 bg-cyan-500/5 px-3 py-2 font-mono text-xs text-neon transition-all hover:border-neon/70 hover:bg-cyan-500/10"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>

              {/* overview */}
              <p className="mt-6 leading-relaxed text-muted">
                {project.overview ?? project.description}
              </p>

              {/* features */}
              {project.features && (
                <div className="mt-7">
                  <h4 className="flex items-center gap-2 font-mono text-sm text-neon">
                    <ListChecks size={15} /> Key features
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1 text-violet-neon">▹</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* architecture */}
              {project.architecture && (
                <div className="mt-7">
                  <h4 className="flex items-center gap-2 font-mono text-sm text-neon">
                    <Boxes size={15} /> Architecture &amp; how it works
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {project.architecture.map((a) => (
                      <li
                        key={a}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1 text-neon">▹</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* tech stack */}
              <div className="mt-7">
                <h4 className="font-mono text-sm text-neon">
                  <span className="text-slate-600">~/</span>stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

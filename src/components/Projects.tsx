import { motion } from "framer-motion";
import { ExternalLink, Star, Tv } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import {
  featuredProjects,
  githubProfile,
  honorableMentions,
  type Project,
} from "../data/projects";

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-400"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3">
      <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name} on GitHub`}
        className="text-slate-400 transition-colors hover:text-neon"
      >
        <GithubIcon size={18} />
      </a>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} live site`}
          className="text-slate-400 transition-colors hover:text-neon"
        >
          <ExternalLink size={18} />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const flagship = featuredProjects.find((p) => p.flagship)!;
  const rest = featuredProjects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="03" title="Projects" />

      {/* Flagship */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <TiltCard className="glow-card relative overflow-hidden p-8 sm:p-10">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 rounded-full border border-neon/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-neon">
              <Star size={12} /> Flagship project
            </span>
            <ProjectLinks project={flagship} />
          </div>

          <div className="mt-6 flex items-start gap-4">
            <div className="hidden rounded-xl border border-line bg-white/[0.03] p-4 sm:block">
              <Tv className="text-neon" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {flagship.name}
              </h3>
              <p className="mt-1 font-mono text-sm text-violet-neon">
                {flagship.tagline}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            {flagship.description}
          </p>
          <TechTags tech={flagship.tech} />
        </TiltCard>
      </motion.div>

      {/* Grid of 4 */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {rest.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
          >
            <TiltCard className="glow-card flex h-full flex-col p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-neon">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-violet-neon">
                    {project.tagline}
                  </p>
                </div>
                <ProjectLinks project={project} />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <TechTags tech={project.tech} />
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Honorable mentions */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h3 className="font-mono text-sm text-slate-500">
          <span className="text-neon">$</span> ls more-projects/
        </h3>
        <div className="mt-5 flex flex-wrap gap-3">
          {honorableMentions.map((m) => (
            <a
              key={m.name}
              href={m.repo}
              target="_blank"
              rel="noreferrer"
              title={m.blurb}
              className="group rounded-lg border border-line bg-white/[0.02] px-4 py-2.5 font-mono text-sm text-slate-400 transition-all hover:-translate-y-0.5 hover:border-neon/40 hover:text-neon"
            >
              {m.name}
              <span className="ml-2 text-slate-600 transition-colors group-hover:text-neon">
                ↗
              </span>
            </a>
          ))}
          <a
            href={`${githubProfile}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-violet-neon/30 bg-violet-500/5 px-4 py-2.5 font-mono text-sm text-violet-neon transition-all hover:-translate-y-0.5 hover:border-violet-neon/60"
          >
            view all on GitHub →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Briefcase, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience, activities } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" title="Experience" />

      <div className="relative ml-3 border-l border-line pl-8 sm:ml-6 sm:pl-12">
        {experience.map((job, i) => (
          <motion.article
            key={`${job.company}-${job.role}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative pb-14 last:pb-0"
          >
            {/* timeline node */}
            <span
              className={`absolute top-1 -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border sm:-left-[3.55rem] ${
                job.current
                  ? "border-neon/60 bg-cyan-500/10 text-neon shadow-[0_0_16px_#22d3ee55]"
                  : "border-line bg-surface text-slate-500"
              }`}
            >
              <Briefcase size={14} />
            </span>

            <div className="glow-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold text-white">
                  {job.role}
                  <span className="ml-2 text-neon">@ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {job.period}
                </span>
              </div>

              <ul className="mt-4 space-y-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-1 text-neon">▹</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Activities */}
      <div className="mt-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-sm text-slate-500"
        >
          <span className="text-neon">$</span> cat activities/
        </motion.h3>

        <div className="grid gap-6">
          {activities.map((a, i) => (
            <motion.div
              key={`${a.org}-${a.role}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glow-card flex flex-col gap-4 p-6 sm:flex-row sm:p-8"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-neon">
                <Users size={20} />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-lg font-bold text-white">
                    {a.role}
                    <span className="ml-2 text-neon">@ {a.org}</span>
                  </h4>
                  <span className="font-mono text-xs text-slate-500">
                    {a.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {a.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

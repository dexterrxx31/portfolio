import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" title="Skills" />

      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (gi % 2) * 0.12 }}
            className="glow-card p-7"
          >
            <h3 className="font-mono text-sm text-neon">
              <span className="text-slate-600">{"~/"}</span>
              {group.title.toLowerCase().replace(/[^a-z]+/g, "-")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + si * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="cursor-default rounded-lg border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-sm text-slate-300 transition-colors hover:border-neon/50 hover:text-neon"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

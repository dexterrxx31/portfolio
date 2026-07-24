import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { hobbies } from "../data/hobbies";

export default function Hobbies() {
  return (
    <section id="hobbies" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="06" title="Hobbies" />
      <p className="mb-10 max-w-2xl text-muted">
        <span className="font-mono text-neon">$</span> ls ~/hobbies — what I get
        up to when the build is green.
      </p>

      <div className="perspective grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((h, i) => (
          <motion.div
            key={h.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <TiltCard intensity={8} className="glow-card group h-full p-6">
              <div className="preserve-3d">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-line bg-white/[0.03] p-2.5 text-neon transition-colors group-hover:text-violet-neon">
                    <h.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{h.title}</h3>
                    <p className="font-mono text-xs text-slate-500">
                      ~/hobbies/{h.slug}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {h.detail}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

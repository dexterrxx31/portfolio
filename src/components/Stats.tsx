import { motion } from "framer-motion";
import { stats, type Stat } from "../data/stats";
import { useCountUp } from "../hooks/useCountUp";

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { value, ref } = useCountUp(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glow-card px-4 py-6 text-center"
    >
      <div className="font-mono text-3xl font-bold text-gradient sm:text-4xl">
        <span ref={ref}>
          {stat.prefix}
          {value}
          {stat.suffix}
        </span>
      </div>
      <div className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <p className="mb-6 text-center font-mono text-sm text-slate-500">
        <span className="text-neon">$</span> uptime
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

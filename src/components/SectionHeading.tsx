import { motion } from "framer-motion";

interface Props {
  index: string;
  title: string;
}

/** Animated section heading: `01. // Title` with a gradient underline sweep. */
export default function SectionHeading({ index, title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <h2 className="flex items-baseline gap-3 text-3xl font-bold text-white sm:text-4xl">
        <span className="font-mono text-lg text-neon sm:text-xl">{index}.</span>
        <span className="font-mono text-lg text-slate-600 sm:text-xl">{"//"}</span>
        {title}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-4 h-px w-32 origin-left bg-gradient-to-r from-cyan-400 to-violet-400"
      />
    </motion.div>
  );
}

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Vertical scroll-progress beam on the left edge — fills top→bottom on scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const headTop = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <div className="scroll-rail" aria-hidden>
      <motion.div className="scroll-rail-fill" style={{ scaleY: p }} />
      <motion.div className="scroll-rail-head" style={{ top: headTop }} />
    </div>
  );
}

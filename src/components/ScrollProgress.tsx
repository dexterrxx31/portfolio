import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
}

let sparkId = 0;
const NEON = ["#22d3ee", "#34d399", "#a78bfa", "#f472b6"];

/** Vertical scroll-progress beam on the left edge — fills top→bottom on scroll
 *  and sheds neon sparkles from its head as it travels. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const headTop = useTransform(p, [0, 1], ["0%", "100%"]);

  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastEmit = useRef(0);
  const lastVal = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const unsub = p.on("change", (v) => {
      const moving = Math.abs(v - lastVal.current) > 0.0004;
      lastVal.current = v;
      if (!moving) return;

      const now = performance.now();
      if (now - lastEmit.current < 50) return;
      lastEmit.current = now;

      const y = v * window.innerHeight;
      const batch: Spark[] = [];
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const id = sparkId++;
        batch.push({
          id,
          x: 2 + Math.random() * 9,
          y: y + (Math.random() * 12 - 6),
          color: NEON[Math.floor(Math.random() * NEON.length)],
        });
        setTimeout(
          () => setSparks((s) => s.filter((k) => k.id !== id)),
          750,
        );
      }
      setSparks((s) => [...s, ...batch]);
    });
    return () => unsub();
  }, [p]);

  return (
    <>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="scroll-spark"
          style={{
            left: s.x,
            top: s.y,
            background: s.color,
            boxShadow: `0 0 6px ${s.color}`,
          }}
        />
      ))}
      <div className="scroll-rail" aria-hidden>
        <motion.div className="scroll-rail-fill" style={{ scaleY: p }} />
        <motion.div className="scroll-rail-head" style={{ top: headTop }} />
      </div>
    </>
  );
}

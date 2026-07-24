import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
  hue: 0 | 1;
}

let sparkId = 0;

/** Magic-wand cursor with a sparkle trail. Fine-pointer devices only. */
export default function CursorWand() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 550, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setEnabled(true);
    document.documentElement.classList.add("wand-cursor");

    let last = 0;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (reduce) return;
      const now = performance.now();
      if (now - last > 45) {
        last = now;
        const id = sparkId++;
        const spark: Spark = {
          id,
          x: e.clientX + (Math.random() * 16 - 8),
          y: e.clientY + (Math.random() * 16 - 8) + 6,
          hue: Math.random() > 0.5 ? 1 : 0,
        };
        setSparks((s) => [...s, spark]);
        setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 650);
      }
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setActive(!!el.closest("a, button, input, textarea, [role=button]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("wand-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {sparks.map((s) => (
        <span
          key={s.id}
          className={`wand-spark ${s.hue ? "wand-spark--alt" : ""}`}
          style={{ left: s.x, top: s.y }}
        />
      ))}
      <motion.div className="wand-cursor-el" style={{ x: sx, y: sy }}>
        <div className={`wand-inner${active ? " is-active" : ""}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            {/* wand stick */}
            <path
              d="M5 19 L13.2 10.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* big 4-point star at the tip */}
            <path
              d="M16.5 2 L17.7 5.3 L21 6.5 L17.7 7.7 L16.5 11 L15.3 7.7 L12 6.5 L15.3 5.3 Z"
              fill="currentColor"
            />
            {/* small sparkle */}
            <path
              d="M7 4 L7.6 5.6 L9.2 6.2 L7.6 6.8 L7 8.4 L6.4 6.8 L4.8 6.2 L6.4 5.6 Z"
              className="wand-spark-tip"
              opacity="0.8"
            />
          </svg>
        </div>
      </motion.div>
    </>
  );
}

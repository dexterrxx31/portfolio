import { useEffect, useRef, useState } from "react";

type CatState = "walk" | "idle" | "sleep";

const NAP_DELAY = 15000; // ms of no activity before napping
const SPEED = 60; // px per second — a slow, lazy walk
const STOP_DIST = 100; // stops this far from the pointer (keeps its distance)
const START_DIST = 155; // won't bother moving until the pointer is this far (lazy)

/** A robotic cat that lazily walks after your pointer, keeping its distance,
 *  and lies down for a nap wherever it settles when you go idle. */
export default function RoboCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const dir = useRef(1);
  const walking = useRef(false);
  const lastActivity = useRef(0);
  const stateRef = useRef<CatState>("idle");
  const [state, setState] = useState<CatState>("idle");

  useEffect(() => {
    pos.current = { x: window.innerWidth * 0.18, y: window.innerHeight * 0.72 };
    target.current = { ...pos.current };
    lastActivity.current = performance.now();

    const setSt = (s: CatState) => {
      if (stateRef.current === s) return;
      stateRef.current = s;
      setState(s);
    };
    const wake = () => {
      lastActivity.current = performance.now();
      if (stateRef.current === "sleep") setSt("idle");
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      wake();
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0])
        target.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      wake();
    };
    const onScroll = () => wake();
    const onKey = () => wake();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    let raf = 0;
    let lastT = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(50, now - lastT);
      lastT = now;

      const el = containerRef.current;
      const flip = flipRef.current;
      if (el && flip) {
        const tx = Math.min(window.innerWidth - 34, Math.max(34, target.current.x));
        const ty = Math.min(window.innerHeight - 30, Math.max(34, target.current.y));
        const dx = tx - pos.current.x;
        const dy = ty - pos.current.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (stateRef.current !== "sleep") {
          // hysteresis: only start walking once the pointer wanders far off,
          // then keep walking until we've arrived near STOP_DIST (+ a small
          // band so it settles instead of creeping forever — lets it nap).
          if (walking.current ? dist > STOP_DIST + 2 : dist > START_DIST) {
            walking.current = true;
            const step = Math.min((SPEED * dt) / 1000, dist - STOP_DIST);
            pos.current.x += (dx / dist) * step;
            pos.current.y += (dy / dist) * step;
            if (Math.abs(dx) > 2) dir.current = dx > 0 ? 1 : -1;
            setSt("walk");
          } else {
            walking.current = false;
            setSt("idle");
            if (now - lastActivity.current > NAP_DELAY) setSt("sleep");
          }
        }

        el.style.transform = `translate(${pos.current.x - 23}px, ${pos.current.y - 18}px)`;
        flip.style.transform = `scaleX(${dir.current})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={containerRef} className={`robo-cat robo-${state}`} aria-hidden>
      <div className="robo-zzz">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </div>
      <div ref={flipRef} className="robo-flip">
        {/* ---- Awake / walking pose ---- */}
        <svg className="robo-svg robo-awake" width="46" height="37" viewBox="0 0 60 48">
          {/* tail */}
          <g className="robo-tail">
            <path className="cat-tail" d="M12 24 C 2 22, 3 9, 9 6" strokeWidth="3" />
            <circle className="cat-accent" cx="9" cy="6" r="2.4" />
          </g>
          {/* four legs (diagonal trot: a = back-near + front-far) */}
          <rect className="cat-leg leg-b" x="14.5" y="33" width="3.4" height="10" rx="1.7" />
          <rect className="cat-leg leg-a" x="21" y="33" width="3.4" height="10" rx="1.7" />
          <rect className="cat-leg leg-a" x="35.5" y="33" width="3.4" height="10" rx="1.7" />
          <rect className="cat-leg leg-b" x="42" y="33" width="3.4" height="10" rx="1.7" />
          {/* body */}
          <rect className="cat-body" x="10" y="18" width="40" height="17" rx="8" />
          <line className="cat-line" x1="21" y1="21" x2="21" y2="32" />
          <circle className="led" cx="16" cy="26" r="1" />
          {/* head */}
          <rect className="cat-body" x="30" y="7" width="23" height="20" rx="6" />
          <path className="cat-body" d="M33 9 L35 2 L40 9 Z" />
          <path className="cat-body" d="M44 9 L49 2 L51 9 Z" />
          {/* antenna */}
          <line className="cat-tail" x1="42" y1="7" x2="42" y2="2.5" strokeWidth="1.5" />
          <circle className="cat-accent robo-ant" cx="42" cy="2" r="1.7" />
          {/* eyes */}
          <circle className="led" cx="39" cy="17" r="2.4" />
          <circle className="led" cx="47" cy="17" r="2.4" />
        </svg>

        {/* ---- Asleep / lying-down pose ---- */}
        <svg className="robo-svg robo-asleep" width="46" height="37" viewBox="0 0 60 48">
          <g className="robo-tail-sleep">
            <path className="cat-tail" d="M15 34 C 5 34, 5 22, 13 23" strokeWidth="3" />
            <circle className="cat-accent" cx="13" cy="23" r="2.2" />
          </g>
          {/* folded paws */}
          <rect className="cat-leg" x="18" y="39" width="10" height="4.2" rx="2.1" />
          <rect className="cat-leg" x="31" y="39" width="10" height="4.2" rx="2.1" />
          {/* low body */}
          <rect className="cat-body" x="9" y="30" width="40" height="13" rx="6.5" />
          <circle className="led" cx="20" cy="36" r="1" />
          {/* head resting */}
          <rect className="cat-body" x="37" y="29" width="18" height="14" rx="6" />
          <path className="cat-body" d="M40 30 L42 25 L46 30 Z" />
          <path className="cat-body" d="M47 30 L51 25 L52 30 Z" />
          <line className="cat-tail" x1="49" y1="29" x2="52" y2="26" strokeWidth="1.5" />
          <circle className="cat-accent robo-ant" cx="52.5" cy="25.5" r="1.5" />
          {/* closed eyes */}
          <path d="M40.5 36 h4" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 36 h4" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

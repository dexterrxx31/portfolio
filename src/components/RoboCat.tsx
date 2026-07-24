import { useEffect, useRef, useState } from "react";

type CatState = "walk" | "idle" | "sleep";

const NAP_DELAY = 15000; // ms of no activity before napping
const FOLLOW = 0.035; // lazy follow factor (lower = lazier)
const OFFSET_Y = 30; // rest a little below the pointer (clear of the wand)

/** A robotic cat that lazily roams the screen after your pointer and lies
 *  down for a nap wherever it settles when you go idle. */
export default function RoboCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const dir = useRef(1);
  const lastActivity = useRef(0);
  const stateRef = useRef<CatState>("idle");
  const [state, setState] = useState<CatState>("idle");

  useEffect(() => {
    pos.current = { x: window.innerWidth * 0.18, y: window.innerHeight * 0.7 };
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
      target.current = { x: e.clientX, y: e.clientY + OFFSET_Y };
      wake();
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0])
        target.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY + OFFSET_Y,
        };
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
    const tick = () => {
      const el = containerRef.current;
      const flip = flipRef.current;
      if (el && flip) {
        const tx = Math.min(window.innerWidth - 34, Math.max(34, target.current.x));
        const ty = Math.min(window.innerHeight - 30, Math.max(34, target.current.y));
        const dx = tx - pos.current.x;
        const dy = ty - pos.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 3 && stateRef.current !== "sleep") {
          if (Math.abs(dx) > 1) dir.current = dx > 0 ? 1 : -1;
          pos.current.x += dx * FOLLOW; // lazy amble
          pos.current.y += dy * FOLLOW;
          setSt("walk");
        } else {
          if (stateRef.current === "walk") setSt("idle");
          if (
            stateRef.current !== "sleep" &&
            performance.now() - lastActivity.current > NAP_DELAY
          ) {
            setSt("sleep");
          }
        }
        el.style.transform = `translate(${pos.current.x - 30}px, ${pos.current.y - 24}px)`;
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
        <svg className="robo-svg robo-awake" width="60" height="48" viewBox="0 0 60 48">
          <g className="robo-tail">
            <path d="M12 26 C 2 24, 3 11, 9 8" fill="none" stroke="#7c8797" strokeWidth="3" strokeLinecap="round" />
            <circle className="led" cx="9" cy="8" r="2.4" />
          </g>
          <circle className="wheel" cx="18" cy="40" r="6" fill="#8994a6" stroke="#5c6675" strokeWidth="1.5" />
          <circle className="wheel" cx="40" cy="40" r="6" fill="#8994a6" stroke="#5c6675" strokeWidth="1.5" />
          <circle className="hub" cx="18" cy="40" r="1.6" />
          <circle className="hub" cx="40" cy="40" r="1.6" />
          <rect x="10" y="20" width="40" height="17" rx="7" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          <circle cx="18" cy="28" r="1" fill="#7c8797" />
          <circle cx="26" cy="28" r="1" fill="#7c8797" />
          <rect x="30" y="7" width="23" height="21" rx="6" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          <path d="M33 9 L35 2 L40 9 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M44 9 L49 2 L51 9 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="42" y1="7" x2="42" y2="2" stroke="#7c8797" strokeWidth="1.5" />
          <circle className="led robo-ant" cx="42" cy="1.6" r="1.8" />
          <circle className="led" cx="39" cy="17" r="2.4" />
          <circle className="led" cx="47" cy="17" r="2.4" />
        </svg>

        {/* ---- Asleep / lying-down pose ---- */}
        <svg className="robo-svg robo-asleep" width="60" height="48" viewBox="0 0 60 48">
          {/* curled tail over the back */}
          <g className="robo-tail-sleep">
            <path d="M15 34 C 5 34, 5 22, 13 23" fill="none" stroke="#7c8797" strokeWidth="3" strokeLinecap="round" />
            <circle className="led" cx="13" cy="23" r="2.2" />
          </g>
          {/* tucked wheels resting on the ground */}
          <circle cx="21" cy="42" r="3.4" fill="#8994a6" stroke="#5c6675" strokeWidth="1.2" />
          <circle cx="37" cy="42" r="3.4" fill="#8994a6" stroke="#5c6675" strokeWidth="1.2" />
          {/* low, long body lying down */}
          <rect x="9" y="30" width="40" height="13" rx="6.5" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          <circle cx="20" cy="36" r="1" fill="#7c8797" />
          <circle cx="28" cy="36" r="1" fill="#7c8797" />
          {/* head resting level with the body */}
          <rect x="37" y="29" width="18" height="14" rx="6" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          {/* flattened ears */}
          <path d="M40 30 L42 25 L46 30 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M47 30 L51 25 L52 30 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          {/* drooped antenna, dim LED */}
          <line x1="49" y1="29" x2="52" y2="26" stroke="#7c8797" strokeWidth="1.5" />
          <circle className="led robo-ant" cx="52.5" cy="25.5" r="1.5" />
          {/* closed eyes */}
          <path d="M40.5 36 h4" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 36 h4" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

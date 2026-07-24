import { useEffect, useRef, useState } from "react";

type CatState = "walk" | "idle" | "sleep";

const NAP_DELAY = 6000; // ms of no activity before napping
const FOLLOW = 0.04; // lazy follow factor (lower = lazier)

/** A robotic cat that lazily follows you along the bottom and naps when idle. */
export default function RoboCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const posX = useRef(0);
  const targetX = useRef(0);
  const dir = useRef(1);
  const lastActivity = useRef(0);
  const stateRef = useRef<CatState>("idle");
  const [state, setState] = useState<CatState>("idle");

  useEffect(() => {
    posX.current = window.innerWidth * 0.14;
    targetX.current = posX.current;
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
      targetX.current = e.clientX;
      wake();
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) targetX.current = e.touches[0].clientX;
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
        const half = el.offsetWidth / 2;
        const tx = Math.min(
          window.innerWidth - half - 6,
          Math.max(half + 6, targetX.current),
        );
        const dx = tx - posX.current;

        if (Math.abs(dx) > 2 && stateRef.current !== "sleep") {
          dir.current = dx > 0 ? 1 : -1;
          posX.current += dx * FOLLOW; // lazy amble
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
        el.style.transform = `translateX(${posX.current}px)`;
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
        <svg className="robo-svg" width="60" height="48" viewBox="0 0 60 48">
          {/* tail */}
          <g className="robo-tail">
            <path
              d="M12 26 C 2 24, 3 11, 9 8"
              fill="none"
              stroke="#7c8797"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle className="led" cx="9" cy="8" r="2.4" />
          </g>

          {/* wheels / legs */}
          <circle className="wheel" cx="18" cy="40" r="6" fill="#8994a6" stroke="#5c6675" strokeWidth="1.5" />
          <circle className="wheel" cx="40" cy="40" r="6" fill="#8994a6" stroke="#5c6675" strokeWidth="1.5" />
          <circle className="hub" cx="18" cy="40" r="1.6" />
          <circle className="hub" cx="40" cy="40" r="1.6" />

          {/* body */}
          <rect x="10" y="20" width="40" height="17" rx="7" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          <circle cx="18" cy="28" r="1" fill="#7c8797" />
          <circle cx="26" cy="28" r="1" fill="#7c8797" />

          {/* head */}
          <rect x="30" y="7" width="23" height="21" rx="6" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" />
          {/* ears */}
          <path d="M33 9 L35 2 L40 9 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M44 9 L49 2 L51 9 Z" fill="#c3ccd8" stroke="#7c8797" strokeWidth="1.5" strokeLinejoin="round" />
          {/* antenna */}
          <line x1="42" y1="7" x2="42" y2="2" stroke="#7c8797" strokeWidth="1.5" />
          <circle className="led robo-ant" cx="42" cy="1.6" r="1.8" />

          {/* eyes - open */}
          <g className="eye-open">
            <circle className="led" cx="39" cy="17" r="2.4" />
            <circle className="led" cx="47" cy="17" r="2.4" />
          </g>
          {/* eyes - closed (sleep) */}
          <g className="eye-closed">
            <path d="M36.5 17.5 h5" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
            <path d="M44.5 17.5 h5" stroke="var(--color-neon)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

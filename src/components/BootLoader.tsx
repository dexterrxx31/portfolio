import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "Booting riyan-os 6.1.0-backend (tty1)",
  "[  OK  ] Mounted /dev/portfolio",
  "[  OK  ] Started Neon Particle Service",
  "[  OK  ] Reached target Network (AWS Lambda)",
  "[  OK  ] Started PostgreSQL / DynamoDB pool",
  "[  OK  ] Started REST + WebSocket gateway",
  "[  OK  ] Started Theme Manager (light/dark)",
  "[  OK  ] Reached target Multi-User System",
];

interface Props {
  onDone: () => void;
}

/** Full-screen systemd-style boot sequence. Skippable, session-scoped, reduced-motion aware. */
export default function BootLoader({ onDone }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    setTimeout(onDone, 550);
  };

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setLines((prev) => [...prev, line]), 140 + i * 180),
      );
    });

    const total = 140 + BOOT_LINES.length * 180 + 400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / total) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else timers.push(setTimeout(finish, 450));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filled = Math.round(progress / 5);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      onClick={finish}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-void px-6 font-mono"
    >
      <div className="w-full max-w-lg">
        <p className="mb-4 text-sm text-neon">
          <span className="text-slate-500">&gt;</span> riyan
          <span className="animate-blink">_</span> portfolio
        </p>

        <div className="min-h-52 text-xs leading-relaxed text-slate-400 sm:text-sm">
          {lines.map((line, i) => (
            <div key={i}>
              {line.startsWith("[  OK  ]") ? (
                <>
                  <span className="text-green-400">[  OK  ]</span>
                  {line.slice(8)}
                </>
              ) : (
                <span className="text-slate-500">{line}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>booting</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 font-mono text-sm text-neon">
            [{"█".repeat(filled)}
            <span className="text-slate-700">{"░".repeat(20 - filled)}</span>]
          </div>
          {progress >= 100 && (
            <p className="mt-4 text-sm text-slate-300">
              login: <span className="text-neon">riyan</span>
              <span className="animate-blink">▋</span>
            </p>
          )}
        </div>

        <p className="mt-8 text-center text-[0.7rem] text-slate-600">
          tap anywhere to skip
        </p>
      </div>
    </motion.div>
  );
}

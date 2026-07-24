import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** depth 0 (far) → 1 (near), drives size, speed & parallax */
  z: number;
}

interface Packet {
  ai: number;
  bi: number;
  t: number;
  speed: number;
}

const LINK_DIST = 130;
const MOUSE_DIST = 180;

/** Full-bleed drifting particle field: depth parallax, cursor links, and
 *  "data packets" that pulse along the network — a subtle backend signal. */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let lastPacket = 0;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35 * (0.4 + z),
          vy: (Math.random() - 0.5) * 0.35 * (0.4 + z),
          r: (Math.random() * 1.2 + 0.5) * (0.6 + z),
          z,
        };
      });
      packets = [];
    };

    const step = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // theme-aware colors (checked per frame so the toggle takes effect live)
      const light = document.documentElement.classList.contains("light");
      const dotRgb = light ? "51, 65, 85" : "148, 197, 253";
      const linkRgb = light ? "8, 145, 178" : "56, 189, 248";
      const mouseRgb = light ? "124, 58, 237" : "167, 139, 250";
      const packetRgb = light ? "124, 58, 237" : "34, 211, 238";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // near particles parallax-shift toward the cursor a touch
        let px = p.x;
        let py = p.y;
        if (mouse.x > -9000) {
          px += (mouse.x - w / 2) * 0.01 * p.z;
          py += (mouse.y - h / 2) * 0.01 * p.z;
        }

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb}, ${0.3 + p.z * 0.4})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${linkRgb}, ${0.14 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${mouseRgb}, ${0.25 * (1 - md / MOUSE_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // spawn a data packet on a random currently-linked pair
      if (now - lastPacket > 650 && particles.length > 2 && packets.length < 6) {
        lastPacket = now;
        const ai = Math.floor(Math.random() * particles.length);
        const a = particles[ai];
        const candidates: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (j === ai) continue;
          if (Math.hypot(a.x - particles[j].x, a.y - particles[j].y) < LINK_DIST)
            candidates.push(j);
        }
        if (candidates.length)
          packets.push({
            ai,
            bi: candidates[Math.floor(Math.random() * candidates.length)],
            t: 0,
            speed: 0.012 + Math.random() * 0.01,
          });
      }

      packets = packets.filter((pk) => pk.t < 1);
      for (const pk of packets) {
        pk.t += pk.speed;
        const a = particles[pk.ai];
        const b = particles[pk.bi];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * pk.t;
        const y = a.y + (b.y - a.y) * pk.t;
        const glow = Math.sin(pk.t * Math.PI); // fade in/out
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${packetRgb}, ${glow})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${packetRgb}, ${glow})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
  );
}

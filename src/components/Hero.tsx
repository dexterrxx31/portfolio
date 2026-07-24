import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import TerminalWindow from "./TerminalWindow";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { githubProfile, linkedinProfile } from "../data/projects";

// Heavy WebGL — its own chunk, loaded after the boot screen. Skipped entirely
// for reduced-motion users, who get the static aurora glow instead.
const Globe = lazy(() => import("./Globe"));
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const phrases = [
  "Software Development Engineer @ Evertz",
  "Backend & Cloud — AWS Serverless",
  "Broadcast / Media Streaming Tech",
  "REST · WebSockets · OpenAPI",
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto mb-8 h-28 w-28">
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 opacity-70 blur-[6px]" />
      <div className="absolute inset-[3px] overflow-hidden rounded-full bg-void">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-violet-500/20 font-mono text-3xl font-bold text-gradient">
            RA
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}profile.jpg`}
            alt="Riyan Ahmad"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypingEffect(phrases);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-28"
    >
      {/* animated aurora blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-cyan-500/12 blur-[120px] animate-aurora"
      />
      <div
        aria-hidden
        className="absolute -right-32 -bottom-32 h-[32rem] w-[32rem] rounded-full bg-violet-500/12 blur-[120px] animate-aurora [animation-delay:-7s]"
      />
      <div aria-hidden className="bg-grid absolute inset-0" />
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      )}
      <div aria-hidden className="hero-vignette absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }}>
          <Avatar />
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
        >
          Riyan <span className="text-gradient">Ahmad</span>
        </motion.h1>

        {/* terminal-framed auto-typed intro */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-8 max-w-md"
        >
          <TerminalWindow title="riyan@portfolio: ~ — ./intro.sh">
            <div className="p-4 text-left font-mono text-xs sm:text-sm">
              <div className="text-slate-500">
                <span className="text-neon">$</span> ./intro.sh
              </div>
              <div className="mt-1 flex min-h-6 items-center text-slate-200">
                <span className="mr-2 text-violet-neon">&gt;</span>
                <span>{typed}</span>
                <span className="ml-0.5 inline-block h-4 w-2 bg-neon animate-blink" />
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I build the backend of live television — cloud playout, media APIs and
          event-driven microservices on AWS. Off the clock I ship side projects,
          tinker with Linux, and shoot photography.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-mono text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            View Projects
            <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 opacity-50 blur-lg transition-opacity group-hover:opacity-80" />
          </a>
          <a
            href={resumeUrl}
            download="riyan-ahmad-resume.pdf"
            className="flex items-center gap-2 rounded-lg border border-neon/40 bg-cyan-500/5 px-6 py-3 font-mono text-sm text-neon transition-all hover:border-neon/70 hover:bg-cyan-500/10"
          >
            <Download size={16} /> Resume
          </a>
          <a
            href={githubProfile}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-mono text-sm text-slate-300 transition-all hover:border-neon/50 hover:text-neon"
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href={linkedinProfile}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-mono text-sm text-slate-300 transition-all hover:border-neon/50 hover:text-neon"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-float hover:text-neon"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}

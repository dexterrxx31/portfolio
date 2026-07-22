import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import ParticleCanvas from "./ParticleCanvas";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { githubProfile, linkedinProfile } from "../data/projects";

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

export default function Hero() {
  const typed = useTypingEffect(phrases);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
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
      <ParticleCanvas />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 font-mono text-sm text-neon sm:text-base"
        >
          $ whoami
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
        >
          Riyan <span className="text-gradient">Ahmad</span>
        </motion.h1>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex h-8 items-center justify-center font-mono text-base text-slate-300 sm:text-xl"
        >
          <span>{typed}</span>
          <span className="ml-1 inline-block h-5 w-2.5 bg-neon animate-blink sm:h-6" />
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I build the backend of live television — cloud playout, media APIs and
          event-driven microservices on AWS. Off the clock I ship side projects
          spanning AI-driven streaming to interactive CS visualizers.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.7 }}
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

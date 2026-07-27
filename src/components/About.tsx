import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Radio, Cloud, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import TerminalWindow from "./TerminalWindow";
import { education } from "../data/experience";

const facts = [
  {
    icon: Radio,
    title: "Broadcast tech",
    text: "Media & playout systems at Evertz — the backbone of live TV.",
  },
  {
    icon: Cloud,
    title: "Cloud native",
    text: "Event-driven on AWS: Lambda, SNS/SQS, Step Functions, CloudFormation.",
  },
  {
    icon: Sparkles,
    title: "Agentic AI",
    text: "Building LLM-driven systems — like showrunner, an AI-programmed TV channel.",
  },
];

function ProfileImage() {
  const [failed, setFailed] = useState(false);
  return (
    <TerminalWindow title="riyan@portfolio: ~/profile.png">
      <div className="aspect-square w-full">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/15 to-violet-500/15 font-mono text-6xl font-bold text-gradient">
            RA
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Riyan Ahmad"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </TerminalWindow>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" title="About" />

      <div className="grid items-start gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-xs lg:col-span-2 lg:mx-0 lg:max-w-none"
        >
          <ProfileImage />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-3"
        >
          <p>
            I&apos;m an <span className="text-white">SDE-2</span> at{" "}
            <span className="text-white">Evertz Microsystems</span>, building the
            software that keeps broadcast and media pipelines running — content
            workflows, WebSocket-driven playlist management, and event-driven
            microservices on <span className="text-white">AWS</span> (Lambda,
            SNS/SQS, Step Functions, S3, CloudFormation).
          </p>
          <p>
            I&apos;m equally at home in{" "}
            <span className="text-white">Java / Spring Boot</span> and{" "}
            <span className="text-white">Python</span> — designing APIs, wiring
            up AWS services, and lately building with{" "}
            <span className="text-neon">agentic AI</span>. Whatever the stack, I
            optimize for the same thing: systems that stay reliable when it
            matters most.
          </p>
          <p>
            I&apos;ve led two high-priority features — a content registration
            workflow and a purging system — to delivery{" "}
            <span className="text-white">ahead of schedule</span>. Off the clock
            I ship side projects (React / Next.js), tinker with Linux, and shoot
            photography.
          </p>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glow-card flex items-start gap-4 p-5"
          >
            <f.icon className="mt-1 shrink-0 text-neon" size={20} />
            <div>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glow-card flex items-start gap-4 p-5"
        >
          <GraduationCap className="mt-1 shrink-0 text-violet-neon" size={20} />
          <div>
            <h3 className="font-semibold text-white">{education.degree}</h3>
            <p className="mt-1 text-sm text-muted">
              {education.school} · {education.period} ·{" "}
              <span className="text-neon">{education.score}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

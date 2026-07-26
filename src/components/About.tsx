import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Radio, Cloud, GitBranch } from "lucide-react";
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
    text: "Serverless-first on AWS: Lambda, DynamoDB, Step Functions.",
  },
  {
    icon: GitBranch,
    title: "API craftsman",
    text: "Contract-first design with OpenAPI & AsyncAPI schemas.",
  },
];

function ProfileImage() {
  const [failed, setFailed] = useState(false);
  return (
    <TerminalWindow title="riyan@portfolio: ~/profile.jpg">
      <div className="aspect-square w-full">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/15 to-violet-500/15 font-mono text-6xl font-bold text-gradient">
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
            <span className="text-white">Evertz Microsystems</span>, where I
            build the software that keeps broadcast and media pipelines running
            — content workflows, playlist management over WebSockets, and
            event-driven microservices on AWS.
          </p>
          <p>
            My work is contract-first: shared{" "}
            <span className="text-neon">OpenAPI/AsyncAPI</span> schemas,
            versioned APIs, centralized error handling, and end-to-end
            automation, because reliability in live television is
            non-negotiable.
          </p>
          <p>
            I led two high-priority features — a content registration workflow
            and a purging system — from design to delivery,{" "}
            <span className="text-white">ahead of schedule</span>. Before that I
            mentored 600+ students in IoT and ML through my college&apos;s ECE
            society.
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

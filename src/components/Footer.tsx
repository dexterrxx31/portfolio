import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import ContactForm from "./ContactForm";
import { email, githubProfile, linkedinProfile } from "../data/projects";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm text-neon"
        >
          08. {"//"} What&apos;s next
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold text-white sm:text-5xl"
        >
          Get in <span className="text-gradient">touch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-muted"
        >
          Open to interesting backend, cloud and media-tech problems. Drop me a
          line below, or reach out directly.
        </motion.p>

        <ContactForm />

        <p className="mt-12 mb-4 font-mono text-xs text-slate-600">
          — or the old-fashioned way —
        </p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href={`mailto:${email}`}
          className="group relative mt-9 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-3.5 font-mono text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          <Mail size={16} /> {email}
          <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 opacity-50 blur-lg transition-opacity group-hover:opacity-80" />
        </motion.a>

        <div className="mt-12 flex items-center justify-center gap-6">
          <a
            href={githubProfile}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-500 transition-all hover:-translate-y-1 hover:text-neon"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={linkedinProfile}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 transition-all hover:-translate-y-1 hover:text-neon"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="text-slate-500 transition-all hover:-translate-y-1 hover:text-neon"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="mt-10 font-mono text-xs text-slate-600">
          <span className="text-neon">$</span> echo &quot;Designed &amp; built by
          Riyan Ahmad · {new Date().getFullYear()}&quot;
        </p>
      </div>
    </footer>
  );
}

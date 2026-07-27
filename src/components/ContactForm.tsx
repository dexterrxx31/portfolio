import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { sendMessage, emailConfigured } from "../lib/sendMessage";

type Status = "idle" | "sending" | "sent" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-lg border border-line bg-white/[0.03] px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-neon/60";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "name is required";
    if (!form.email.trim()) next.email = "email is required";
    else if (!emailRe.test(form.email)) next.email = "invalid email address";
    if (!form.message.trim()) next.message = "message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap
    if (!validate()) return;
    setStatus("sending");
    try {
      await sendMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-12 max-w-xl text-left"
    >
      <TerminalWindow title="riyan@portfolio: ~ — compose message">
        <form onSubmit={onSubmit} className="space-y-4 p-5" noValidate>
          <p className="font-mono text-xs text-slate-500">
            <span className="text-neon">$</span> mail -s "hello" riyan
          </p>

          {/* honeypot (hidden from users) */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0"
            aria-hidden
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                className={inputClass}
                placeholder="your name"
                value={form.name}
                onChange={set("name")}
                aria-label="Your name"
              />
              {errors.name && (
                <p className="mt-1 font-mono text-xs text-red-400">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                className={inputClass}
                placeholder="you@email.com"
                value={form.email}
                onChange={set("email")}
                aria-label="Your email"
              />
              {errors.email && (
                <p className="mt-1 font-mono text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              placeholder="type your message…"
              value={form.message}
              onChange={set("message")}
              aria-label="Your message"
            />
            {errors.message && (
              <p className="mt-1 font-mono text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-2.5 font-mono text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
            >
              <Send size={15} />
              {status === "sending" ? "sending…" : "send message"}
            </button>

            {status === "sent" && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-green-400">
                <CheckCircle2 size={15} />{" "}
                {emailConfigured
                  ? "message sent — I'll get back to you soon!"
                  : "message composed — check your mail app"}
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-red-400">
                <AlertCircle size={15} /> something went wrong
              </span>
            )}
          </div>
        </form>
      </TerminalWindow>
    </motion.div>
  );
}

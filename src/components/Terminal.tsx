import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalWindow from "./TerminalWindow";
import { runCommand, AUTOCOMPLETE } from "../data/terminal";

interface Entry {
  prompt: string;
  lines: string[];
}

const PROMPT = "riyan@portfolio:~$";

const WELCOME: Entry = {
  prompt: "",
  lines: [
    "Welcome to riyan-os. This is a real shell — try it.",
    "Type 'help' to see what I can do, or 'neofetch' for a system card.",
  ],
};

function resumeUrl() {
  return `${import.meta.env.BASE_URL}resume.pdf`;
}

export default function Terminal() {
  const [history, setHistory] = useState<Entry[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const submit = (value: string) => {
    const result = runCommand(value);

    if (result.action === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { prompt: value, lines: result.lines }]);
    }
    if (result.action === "resume") {
      const a = document.createElement("a");
      a.href = resumeUrl();
      a.download = "riyan-ahmad-resume.pdf";
      a.click();
    }
    if (value.trim()) setCmdHistory((prev) => [...prev, value]);
    setHistIndex(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const next = histIndex < 0 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = AUTOCOMPLETE.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" title="Terminal" />
      <p className="mb-8 max-w-2xl text-muted">
        Not a screenshot — an actual shell. Poke around: <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm text-neon">help</code>,{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm text-neon">neofetch</code>,{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm text-neon">curl /api/about</code>.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <TerminalWindow title="riyan@portfolio: ~ — bash" scanlines>
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[26rem] overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.prompt && (
                  <div className="text-slate-300">
                    <span className="text-neon">{PROMPT}</span>{" "}
                    <span className="text-white">{entry.prompt}</span>
                  </div>
                )}
                {entry.lines.map((line, j) => (
                  <div key={j} className="whitespace-pre-wrap break-words text-slate-400">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            {/* live input line */}
            <div className="flex items-center text-slate-300">
              <span className="shrink-0 text-neon">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                aria-label="Terminal input"
                className="ml-2 flex-1 bg-transparent text-white caret-cyan-400 outline-none"
              />
            </div>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "terminal", label: "Terminal" },
  { id: "hobbies", label: "Hobbies" },
  { id: "photography", label: "Photos" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["hero", ...sections.map((s) => s.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-void/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-mono text-lg font-semibold text-white">
          <span className="text-neon">&gt;</span> riyan
          <span className="text-neon animate-blink">_</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-md px-2.5 py-2 font-mono text-sm transition-colors ${
                  active === s.id
                    ? "text-neon"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={resumeUrl}
              download="riyan-ahmad-resume.pdf"
              className="ml-1 flex items-center gap-1.5 rounded-md border border-neon/40 px-3 py-2 font-mono text-sm text-neon transition-all hover:border-neon/70 hover:bg-cyan-500/10"
            >
              <Download size={14} /> CV
            </a>
          </li>
          <li>
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="ml-1 rounded-md border border-line p-2 text-slate-400 transition-all hover:border-neon/50 hover:text-neon"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="text-slate-300"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-slate-300"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line bg-void/90 backdrop-blur-xl md:hidden"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 font-mono text-sm ${
                    active === s.id ? "text-neon" : "text-slate-300"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

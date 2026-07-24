import type { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  scanlines?: boolean;
}

/** Reusable macOS/Linux-style terminal window chrome (traffic-light dots + title bar). */
export default function TerminalWindow({
  title = "riyan@portfolio: ~",
  children,
  className = "",
  bodyClassName = "",
  scanlines = false,
}: Props) {
  return (
    <div className={`term-window ${scanlines ? "scanlines" : ""} ${className}`}>
      <div className="term-bar">
        <span className="term-dot" style={{ background: "#ff5f56" }} />
        <span className="term-dot" style={{ background: "#ffbd2e" }} />
        <span className="term-dot" style={{ background: "#27c93f" }} />
        <span className="ml-2 truncate font-mono text-xs text-slate-500">
          {title}
        </span>
      </div>
      <div className={`relative z-[1] ${bodyClassName}`}>{children}</div>
    </div>
  );
}

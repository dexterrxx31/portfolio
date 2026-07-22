import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a type / pause / delete rhythm.
 * Renders each phrase instantly (no loop) when reduced motion is preferred.
 */
export function useTypingEffect(
  phrases: string[],
  { typeMs = 55, deleteMs = 30, holdMs = 1800 } = {},
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    if (reducedMotion) {
      setText(phrase);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting
              ? phrase.slice(0, text.length - 1)
              : phrase.slice(0, text.length + 1),
          ),
        deleting ? deleteMs : typeMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typeMs, deleteMs, holdMs, reducedMotion]);

  return text;
}

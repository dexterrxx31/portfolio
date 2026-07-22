import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/** Light/dark theme with localStorage persistence. Dark is the default. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f6f8fc" : "#050510");
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

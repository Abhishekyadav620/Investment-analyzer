import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="theme-toggle-track relative hidden h-9 w-[4.5rem] shrink-0 rounded-full border p-1 sm:flex"
      role="group"
      aria-label="Theme selection"
    >
      <span
        className="theme-toggle-thumb absolute top-1 left-1 h-7 w-7 rounded-full shadow-sm"
        style={{ transform: isDark ? "translateX(2rem)" : "translateX(0)" }}
      />

      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`relative z-10 flex flex-1 items-center justify-center rounded-full transition-all duration-300 ${
          !isDark ? "text-brand" : "text-secondary opacity-60"
        }`}
        aria-label="Light mode"
        aria-pressed={!isDark}
      >
        <Sun
          size={16}
          className={`transition-transform duration-300 ${!isDark ? "rotate-0" : "-rotate-90"}`}
        />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex flex-1 items-center justify-center rounded-full transition-all duration-300 ${
          isDark ? "text-brand" : "text-secondary opacity-60"
        }`}
        aria-label="Dark mode"
        aria-pressed={isDark}
      >
        <Moon
          size={16}
          className={`transition-transform duration-300 ${isDark ? "rotate-0" : "rotate-90"}`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;

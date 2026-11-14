import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300 dark:hover:bg-slate-700"
    >
      {theme === "dark" ? (
        <FiSun size={20} />
      ) : (
        <FiMoon size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
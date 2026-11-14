import {
  FiMenu,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle";

const Navbar = ({ onMenuClick }) => {
  const user = useSelector((state) => state.auth.user);

  const displayName = user?.username || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/95 sm:px-6 lg:px-8">

      {/* Left section */}
      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu size={22} />
        </button>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
            AI Resume Analyzer
          </h2>

          <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
            Your personal career assistant
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Dark mode toggle */}
        <ThemeToggle />

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

        {/* User profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">

            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={displayName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : user?.username ? (
              initial
            ) : (
              <FiUser size={18} />
            )}

          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {displayName}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Resume Workspace
            </p>
          </div>

          <FiChevronDown
            size={16}
            className="hidden text-gray-400 dark:text-gray-500 sm:block"
          />
        </button>

      </div>
    </header>
  );
};

export default Navbar;
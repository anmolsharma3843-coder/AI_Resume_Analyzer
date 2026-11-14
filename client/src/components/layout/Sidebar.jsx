
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiClock,
  FiLogOut,
  FiZap,
  FiX,
} from "react-icons/fi";
import { logout } from "../../services/userService";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Analyze Resume", path: "/analyze", icon: FiFileText },
    { name: "Analysis History", path: "/analysis-history", icon: FiClock },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      console.log("Logged out successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        border-r border-gray-200 bg-white transition-transform duration-300
        dark:border-gray-800 dark:bg-gray-900
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5 dark:border-gray-800">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FiZap size={20} />
            </div>

            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white">
                ResumeAI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Smart Career Tools
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Workspace
          </p>

          <nav className="space-y-1">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Upgrade card */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white">
            <FiZap size={22} />

            <h3 className="mt-3 text-sm font-semibold">
              Improve your resume
            </h3>

            <p className="mt-1 text-xs leading-5 text-indigo-100">
              Match your skills with job requirements and discover areas to improve.
            </p>

            <NavLink
              to="/analyze"
              onClick={onClose}
              className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Analyze Resume
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 p-3 dark:border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <FiLogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
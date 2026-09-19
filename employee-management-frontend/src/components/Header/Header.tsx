import { Link } from 'react-router-dom';
import ThemeToggle from '../TheameToggle/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { auth, logout } = useAuth();

  // Pick primary role for display
  const primaryRole = auth.roles.find((r) => ['admin', 'manager', 'employee'].includes(r)) || 'user';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xs px-6 text-gray-900 dark:text-white shadow-xs transition-colors duration-200">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-lg font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block hover:text-blue-600 transition-colors">
          Employee Management System
        </Link>
        <Link to="/" className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:hidden hover:text-blue-600 transition-colors">
          EMS
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />

        <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />

        {/* User Info & Avatar links to Profile */}
        <Link
          to="/profile"
          title="View profile"
          className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-xs text-white shadow-xs ring-2 ring-blue-500/20">
            {auth.username?.[0]?.toUpperCase() || 'U'}
          </div>

          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">
              {auth.username || 'User'}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {primaryRole}
            </span>
          </div>
        </Link>

        <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />

        {/* Logout Action Button */}
        <button
          type="button"
          onClick={logout}
          title="Sign out"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-950/40 dark:hover:text-red-400 dark:hover:border-red-800 transition-colors"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

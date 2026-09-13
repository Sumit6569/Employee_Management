import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { auth } = useAuth();
  const canAccessManagement = auth.hasRole('admin') || auth.hasRole('manager');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border-l-4 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-5 transition-colors duration-200">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-xs">
          EP
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
            Employee Portal
          </h2>
          <p className="text-xs text-gray-400">Enterprise Admin</p>
        </div>
      </div>

      <nav className="space-y-1">
        <NavLink to="/" end className={navLinkClasses}>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </NavLink>

        {canAccessManagement && (
          <>
            <NavLink to="/employees" className={navLinkClasses}>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Employees
            </NavLink>

            <NavLink to="/reports" className={navLinkClasses}>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Reports
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;

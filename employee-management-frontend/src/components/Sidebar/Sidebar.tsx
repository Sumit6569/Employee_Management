import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-5 transition-colors duration-200">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Employee Portal
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
            }`
          }
        >
          Employees
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white p-5 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Employee Portal
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
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
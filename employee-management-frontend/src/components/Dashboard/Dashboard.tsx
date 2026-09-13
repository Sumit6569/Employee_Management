import { Link } from 'react-router-dom';
import useEmployees from '../../hooks/Employee/useEmployees';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const {
    state: { employees, isLoading, error },
  } = useEmployees();
  const { auth } = useAuth();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive').length;
  const totalDepartments = new Set(employees.map((e) => e.department)).size;

  const canManage = auth.hasRole('admin') || auth.hasRole('manager');

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
    .slice(0, 5);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back,{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {auth.username || 'User'}
            </span>
            . Here is an overview of your organization.
          </p>
        </div>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Overview of your employee operations.
        </p>
        {canManage && (
          <div className="flex items-center gap-3">
            <Link
              to="/employees"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              Manage Employees
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors shadow-xs"
            >
              View Reports
            </Link>
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/50 p-4 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          Failed to load dashboard data: {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Employees
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</p>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/50 p-2 text-blue-600 dark:text-blue-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            5
            {isLoading ? '...' : totalEmployees}
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Active Employees
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Employees</p>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/50 p-2 text-green-600 dark:text-green-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            4
            {isLoading ? '...' : activeEmployees}
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Departments
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Inactive Employees
            </p>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/50 p-2 text-amber-600 dark:text-amber-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {isLoading ? '...' : inactiveEmployees}
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departments</p>
            <div className="rounded-lg bg-purple-50 dark:bg-purple-950/50 p-2 text-purple-600 dark:text-purple-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            3
            {isLoading ? '...' : totalDepartments}
          </p>
        </div>
      </div>

      {/* Recent Employees Section */}
      <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Recently Joined Employees
          </h3>
          {canManage && (
            <Link
              to="/employees"
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all →
            </Link>
          )}
        </div>

        <div className="p-5">
          {isLoading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
              Loading recent employee activity...
            </p>
          ) : recentEmployees.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
              No employee records found.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
              {recentEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold text-xs">
                      {emp.name[0]?.toUpperCase() || 'E'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {emp.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {emp.role} • {emp.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        emp.status === 'Active'
                          ? 'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {emp.status}
                    </span>
                    {canManage && (
                      <Link
                        to={`/employees/${emp.id}`}
                        className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
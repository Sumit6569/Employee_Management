import { useAuth } from '../../context/AuthContext';
import useEmployees from '../../hooks/Employee/useEmployees';

function Profile() {
  const { auth, logout } = useAuth();
  const {
    state: { employees },
  } = useEmployees();

  // Try to match logged-in user with an employee record by email or username
  const matchedEmployee = employees.find(
    (e) =>
      e.email.toLowerCase() === (auth.username || '').toLowerCase() ||
      e.name.toLowerCase().includes((auth.username || '').toLowerCase())
  );

  const primaryRole = auth.roles.find((r) => ['admin', 'manager', 'employee'].includes(r)) || 'employee';

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal account details and enterprise role credentials.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-sm ring-4 ring-blue-500/10">
              {auth.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {matchedEmployee ? matchedEmployee.name : auth.username || 'User'}
                </h3>
                <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-950/60 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  {primaryRole}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {matchedEmployee ? matchedEmployee.email : `${auth.username || 'user'}@company.internal`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6">
          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Username</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {auth.username || 'N/A'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Primary Role</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white capitalize">
              {primaryRole}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Assigned Department</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {matchedEmployee ? matchedEmployee.department : 'General Operations'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Job Role</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {matchedEmployee ? matchedEmployee.role : 'Team Member'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Status</p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {matchedEmployee ? matchedEmployee.status : 'Active'}
            </span>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Authentication Mode</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              Keycloak Single Sign-On (SSO)
            </p>
          </div>
        </div>

        {/* Assigned Realm Roles Badge List */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/60">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
            Assigned Realm Roles
          </p>
          <div className="flex flex-wrap gap-2">
            {auth.roles.map((role) => (
              <span
                key={role}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-2xs"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;

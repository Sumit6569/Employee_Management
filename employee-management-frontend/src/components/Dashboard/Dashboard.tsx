function Dashboard() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Overview of your employee operations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Employees
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            5
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Active Employees
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            4
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-xs transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Departments
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            3
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
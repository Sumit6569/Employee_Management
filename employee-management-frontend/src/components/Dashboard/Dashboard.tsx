function Dashboard() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="mt-1 text-gray-500">
          Overview of your employee operations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Employees
          </p>

          <p className="mt-2 text-3xl font-bold">
            5
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Employees
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            4
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Departments
          </p>

          <p className="mt-2 text-3xl font-bold">
            3
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
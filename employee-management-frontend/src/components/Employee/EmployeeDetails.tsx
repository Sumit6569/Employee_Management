import { useParams, useNavigate } from "react-router-dom";
import useEmployeeById from "../../hooks/useEmployeeById";

function EmployeeDetails() {
  const { id } = useParams();
  const { employee, error, isLoading } = useEmployeeById(Number(id));
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-xs">
        <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400 animate-pulse">
          Loading employee details...
        </h2>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
          Employee Not Found
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The requested employee record could not be found or has been removed.
        </p>
        <button
          onClick={() => navigate('/employees')}
          className="rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ← Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-xs space-y-6 transition-colors">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/employees')}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          ← Back to Employees
        </button>

        <span
          className={
            employee.status === "Active"
              ? "rounded-full bg-green-100 dark:bg-green-950/60 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
              : "rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
          }
        >
          {employee.status}
        </span>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {employee.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Department</p>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{employee.department}</p>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Role</p>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{employee.role}</p>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Joining Date</p>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{employee.joiningDate}</p>
        </div>

        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Employee ID</p>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">#{employee.id}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
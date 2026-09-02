import type { Employee } from "../../Types/EmployeeTypes";
import { Link } from "react-router-dom";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
}

function EmployeeCard({
  employee,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-xs transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {employee.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {employee.email}
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium text-gray-900 dark:text-gray-200">Department:</span>{" "}
          {employee.department}
        </p>

        <p>
          <span className="font-medium text-gray-900 dark:text-gray-200">Role:</span>{" "}
          {employee.role}
        </p>

        <p>
          <span className="font-medium text-gray-900 dark:text-gray-200">Joining Date:</span>{" "}
          {employee.joiningDate}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
        <span
          className={
            employee.status === "Active"
              ? "rounded-full bg-green-100 dark:bg-green-950/60 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
              : "rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
          }
        >
          {employee.status}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to={`/employees/${employee.id}`}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            View
          </Link>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg bg-blue-600 dark:bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg bg-red-600 dark:bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
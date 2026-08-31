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
    <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {employee.name}
        </h3>

        <p className="text-sm text-gray-500">
          {employee.email}
        </p>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Department:</span>{" "}
          {employee.department}
        </p>

        <p>
          <span className="font-medium">Role:</span>{" "}
          {employee.role}
        </p>

        <p>
          <span className="font-medium">Joining Date:</span>{" "}
          {employee.joiningDate}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={
            employee.status === "Active"
              ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
              : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
          }
        >
          {employee.status}
        </span>

        <Link
          to={`/employees/${employee.id}`}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
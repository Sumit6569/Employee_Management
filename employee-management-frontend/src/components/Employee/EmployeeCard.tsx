import type { Employee } from "../../Types/EmployeeTypes";
import { Link } from "react-router-dom";
import useEmployee from "../../hooks/useEmployeeFilters";
import useEmployees from "../../hooks/useEmployees";
interface EmployeeCardProps {
  employee: Employee;
  // onEmployeeClick: (employee: Employee) => void;
  onEdit:()=>void
  
}

function EmployeeCard({
  employee,
  onEdit
}: EmployeeCardProps) {

  const{deleteEmployee} = useEmployees();
  return (
    <div
      // onClick={() => onEmployeeClick(employee)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
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
    className="rounded-lg border px-4 py-2 text-sm"
  >
    View Details
  </Link>

  <button
    type="button"
    onClick={onEdit}
    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
  >
    Edit
  </button>




    <button
    type="button"
    onClick={()=>deleteEmployee(employee.id)}
    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
  >
    Delete
  </button>
</div>
    </div>
  );
}

export default EmployeeCard;
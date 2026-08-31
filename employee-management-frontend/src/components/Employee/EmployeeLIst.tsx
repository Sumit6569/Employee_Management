import { Link } from "react-router-dom";

import EmployeeCard from "./EmployeeCard";

import type { Employee } from "../../Types/EmployeeTypes";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
}

function EmployeeList({
  employees,
  onEdit,
}: EmployeeListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => (
        <Link
          key={employee.id}
          to={`/employees/${employee.id}`}
        >
          <EmployeeCard
            employee={employee}
            onEdit={() => onEdit(employee)}
          />
        </Link>
      ))}
    </div>
  );
}

export default EmployeeList;
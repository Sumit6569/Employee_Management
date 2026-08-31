import EmployeeCard from "./EmployeeCard";

import type { Employee } from "../../Types/EmployeeTypes";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => Promise<void>;
}

function EmployeeList({
  employees,
  onEdit,
  onDelete,
}: EmployeeListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee.id)}
        />
      ))}
    </div>
  );
}

export default EmployeeList;
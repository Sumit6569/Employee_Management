import EmployeeCard from "./EmployeeCard";

import type { Employee } from "../../Types/EmployeeTypes";
import useEmployees from "../../hooks/useEmployees";
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
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={() => onEdit(employee)}

        />

      ))}
    </div>
  );
}

export default EmployeeList;
import React from "react";
import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../Types/EmployeeTypes";
import { Link } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[];


}

function EmployeeList({ employees }: EmployeeListProps) {

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => (
        <Link
          key={employee.id}
          to={`/employees/${employee.id}`}
        >
          {/* <EmployeeCard /// old code for State LiftUP
            employee={employee}
            onEmployeeClick={onEmployeeClick}
          /> */}
          <EmployeeCard
          
            employee={employee}
            
          />
        </Link>
      ))}
    </div>
  );
}

export default EmployeeList;
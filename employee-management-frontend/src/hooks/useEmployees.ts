import { useEffect, useState } from "react";
import type {
  Employee,
  
} from "../Types/EmployeeTypes";
import { getEmployees } from "../services/employeeService";

interface UseEmployeesReturn {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

 

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getEmployees();

        setEmployees(result.data);
        
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  return {
    employees,

    isLoading,
    error,
  };
}

export default useEmployees;
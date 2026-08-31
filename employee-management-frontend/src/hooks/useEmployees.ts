import { useEffect, useState } from "react";

import type {
  CreateEmployeeInput,
  Employee,
} from "../Types/EmployeeTypes";

import {
  getEmployees,
  createEmployee as createEmployeeApi,
  updateEmployee as updateEmployeeApi,

} from "../services/employeeService";

interface UseEmployeesReturn {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;

  createEmployee: (
    employee: CreateEmployeeInput
  ) => Promise<void>;

  isUpdating:boolean,
  updateEmployee:(id:number,employee:CreateEmployeeInput)=>Promise<void>;
}

function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isCreating, setIsCreating] =
    useState(false);

  const[isUpdating,setIsUpdating] = useState(false);

  async function fetchEmployees(): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getEmployees();

      setEmployees(result);
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
  async function createEmployee(
    employee: CreateEmployeeInput
  ): Promise<void> {
    try {
      setIsCreating(true);
      setError(null);

      await createEmployeeApi(employee);

      await fetchEmployees();
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create Employee"
      );
    } finally {
      setIsCreating(false);
    }
  }
  async function updateEmployee(id:number,Employee:CreateEmployeeInput) {
      try {
        setIsUpdating(true);
        setError(null);

        await updateEmployeeApi(id,Employee);
        await fetchEmployees();
        
      } catch (error) {
         setError(
      error instanceof Error
        ? error.message
        : "Failed to update employee"
    );
      }finally{
        setIsUpdating(false);
      }
  }


   useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    isLoading,
    error,
    isCreating,
    createEmployee,
    isUpdating,
    updateEmployee
  };
}

export default useEmployees;
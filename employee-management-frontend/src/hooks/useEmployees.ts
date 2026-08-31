import { useEffect, useState } from "react";

import type {
  CreateEmployeeInput,
  Employee,
} from "../Types/EmployeeTypes";

import {
  getEmployees,
  createEmployee as createEmployeeApi,
} from "../services/employeeService";

interface UseEmployeesReturn {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;

  createEmployee: (
    employee: CreateEmployeeInput
  ) => Promise<void>;
}

function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [isCreating, setIsCreating] =
    useState(false);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  return {
    employees,
    isLoading,
    error,
    isCreating,
    createEmployee,
  };
}

export default useEmployees;
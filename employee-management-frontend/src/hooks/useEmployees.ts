import { useEffect, useState } from "react";

import type {
  CreateEmployeeInput,
  Employee,
} from "../Types/EmployeeTypes";

import {
  getEmployees,
  createEmployee as createEmployeeApi,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
} from "../services/employeeService";
import useNotificationStore from "../stores/notificationStore";
interface EmployeeState {
  employees: Employee[];
  error: string | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

interface UseEmployeesActions {
  createEmployee: (
    employee: CreateEmployeeInput
  ) => Promise<void>;

  updateEmployee: (
    id: number,
    employee: CreateEmployeeInput
  ) => Promise<void>;

  deleteEmployee: (
    id: number
  ) => Promise<void>;
}

interface UseEmployeesReturn {
  state: EmployeeState;
  actions:UseEmployeesActions
}

interface UseEmployeesReturn {
  state: EmployeeState;
  actions: UseEmployeesActions;
}

function useEmployees(): UseEmployeesReturn {
  const [state, setState] =
    useState<EmployeeState>({
      employees: [],
      error: null,
      isLoading: true,
      isCreating: false,
      isUpdating: false,
    });

    const showNotification = useNotificationStore((store)=>store.showNotification)

  async function fetchEmployees(): Promise<void> {
    try {
      setState((previous) => ({
        ...previous,
        isLoading: true,
        error: null,
      }));

      const result = await getEmployees();

      setState((previous) => ({
        ...previous,
        employees: result,
      }));
    } catch (error: unknown) {
      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      }));
    } finally {
      setState((previous) => ({
        ...previous,
        isLoading: false,
      }));
    }
  }

  async function createEmployee(
    employee: CreateEmployeeInput
  ): Promise<void> {
    try {
      setState((previous) => ({
        ...previous,
        isCreating: true,
        error: null,
      }));

      await createEmployeeApi(employee);
      showNotification(
         "Employee created successfully",
          "success"
       );
      await fetchEmployees();
    } catch (error: unknown) {
        const message =
      error instanceof Error
        ? error.message
        : "Failed to create employee";
      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create employee",
      }));

      showNotification(message,"error")
    } finally {
      setState((previous) => ({
        ...previous,
        isCreating: false,
      }));
    }
  }

  async function updateEmployee(
    id: number,
    employee: CreateEmployeeInput
  ): Promise<void> {
    try {
      setState((previous) => ({
        ...previous,
        isUpdating: true,
        error: null,
      }));

      await updateEmployeeApi(id, employee);
      showNotification(
         "Employee updated successfully",
          "success"
       );
      await fetchEmployees();
    } catch (error: unknown) {

        const message =
      error instanceof Error
        ? error.message
        : "Failed to create employee";
      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update employee",
      }));

      showNotification(message,"error")
    } finally {
      setState((previous) => ({
        ...previous,
        isUpdating: false,
      }));
    }
  }

  async function deleteEmployee(
    id: number
  ): Promise<void> {
    try {
      setState((previous) => ({
        ...previous,
        error: null,
      }));

      await deleteEmployeeApi(id);
       showNotification(
         "Employee deleted successfully",
          "success"
      );
      await fetchEmployees();
    } catch (error: unknown) {

        const message =
      error instanceof Error
        ? error.message
        : "Failed to create employee";


      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete employee",
      }));

      showNotification(message,"error");
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    state,
    actions:{
      createEmployee,
      updateEmployee,
      deleteEmployee,
    }
  };
}

export default useEmployees;
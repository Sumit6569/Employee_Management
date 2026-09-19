import { useEffect, useState } from 'react';
import type { Employee } from '../../Types/EmployeeTypes';
import { getEmployeeById } from '../../services/employeeService';

export interface EmployeeDetailState {
  employee: Employee | null;
  isLoading: boolean;
  error: string | null;
}

function useEmployeeById(id: number) {
  const isValidId = Boolean(id && !isNaN(id));

  const [state, setState] = useState<EmployeeDetailState>(() => ({
    employee: null,
    isLoading: isValidId,
    error: null,
  }));

  useEffect(() => {
    if (!id || isNaN(id)) {
      return;
    }

    let isMounted = true;

    async function fetchEmployeeById() {
      try {
        const data = await getEmployeeById(id);
        if (isMounted) {
          setState({
            employee: data,
            isLoading: false,
            error: null,
          });
        }
      } catch (err: unknown) {
        if (isMounted) {
          setState({
            employee: null,
            isLoading: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
          });
        }
      }
    }

    fetchEmployeeById();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return {
    state,
    employee: state.employee,
    error: state.error,
    isLoading: state.isLoading,
  };
}

export default useEmployeeById;

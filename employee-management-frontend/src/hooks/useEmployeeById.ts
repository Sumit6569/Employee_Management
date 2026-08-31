import { useEffect, useState } from 'react';
import type { Employee } from '../Types/EmployeeTypes';
import { getEmployeeById } from '../services/employeeService';

function useEmployeeById(id: number) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      return;
    }

    async function fetchEmployeeById() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEmployeeById();
  }, [id]);

  return {
    employee,
    error,
    isLoading,
  };
}

export default useEmployeeById;
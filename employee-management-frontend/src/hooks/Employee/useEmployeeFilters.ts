import { useState, useMemo } from 'react';
import type { Employee } from '../../Types/EmployeeTypes';

export interface EmployeeFilterState {
  search: string;
  department: string;
  status: string;
}

const INITIAL_FILTERS: EmployeeFilterState = {
  search: '',
  department: 'All',
  status: 'All',
};

function useEmployeeFilters(employees: Employee[]) {
  const [filters, setFilters] = useState<EmployeeFilterState>(INITIAL_FILTERS);

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const setDepartment = (department: string) => {
    setFilters((prev) => ({ ...prev, department }));
  };

  const setStatus = (status: string) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Performance Optimization: useMemo avoids re-filtering on unrelated re-renders
  const filterdEmployee = useMemo(() => {
    const searchLower = filters.search.toLowerCase();
    return employees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(searchLower);
      const matchesDepartment =
        filters.department === 'All' || employee.department === filters.department;
      const matchStatus =
        filters.status === 'All' || employee.status === filters.status;

      return matchesSearch && matchesDepartment && matchStatus;
    });
  }, [employees, filters.search, filters.department, filters.status]);

  return {
    filterdEmployee,
    filters,
    setFilters,
    search: filters.search,
    setSearch,
    department: filters.department,
    setDepartment,
    status: filters.status,
    setStatus,
    resetFilters,
  };
}

export default useEmployeeFilters;

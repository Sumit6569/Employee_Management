import { useState } from 'react';
import type { Employee } from '../../Types/EmployeeTypes';
import { useState } from 'react';

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
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
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

  const filterdEmployee = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase());
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesDepartment = department === 'All' || employee.department === department;
    const matchesDepartment =
      filters.department === 'All' || employee.department === filters.department;

    const matchStatus = status === 'All' || status === employee.status;
    const matchStatus =
      filters.status === 'All' || employee.status === filters.status;

    return matchesSearch && matchesDepartment && matchStatus;
  });

  return {
    filterdEmployee,
    search,
    filters,
    setFilters,
    search: filters.search,
    setSearch,
    department,
    department: filters.department,
    setDepartment,
    status,
    status: filters.status,
    setStatus,
    resetFilters,
  };
}

export default useEmployeeFilters;

import { describe, it, expect } from 'vitest';
import type { Employee } from '../Types/EmployeeTypes.ts';

// Replicating pure filtering logic from useEmployeeFilters hook
function filterEmployees(
  employees: Employee[],
  filters: { search: string; department: string; status: string }
): Employee[] {
  return employees.filter((employee) => {
    const matchesSearch =
      filters.search.trim() === '' ||
      employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDepartment =
      filters.department === 'All' || employee.department === filters.department;

    const matchesStatus =
      filters.status === 'All' || employee.status === filters.status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@company.com',
    department: 'Engineering',
    role: 'Full Stack Engineer',
    status: 'Active',
    joiningDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@company.com',
    department: 'Marketing',
    role: 'Marketing Lead',
    status: 'Inactive',
    joiningDate: '2023-08-20',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    status: 'Active',
    joiningDate: '2022-05-10',
  },
];

describe('Employee Filtering Logic', () => {
  it('should return all employees when default filters are applied', () => {
    const result = filterEmployees(mockEmployees, {
      search: '',
      department: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(3);
  });

  it('should filter employees by department', () => {
    const result = filterEmployees(mockEmployees, {
      search: '',
      department: 'Engineering',
      status: 'All',
    });
    expect(result).toHaveLength(2);
    expect(result.every((emp) => emp.department === 'Engineering')).toBe(true);
  });

  it('should filter employees by status', () => {
    const result = filterEmployees(mockEmployees, {
      search: '',
      department: 'All',
      status: 'Inactive',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bob Smith');
  });

  it('should search employees by name query (case-insensitive)', () => {
    const result = filterEmployees(mockEmployees, {
      search: 'alice',
      department: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Johnson');
  });

  it('should combine multiple filters (search + department + status)', () => {
    const result = filterEmployees(mockEmployees, {
      search: 'Brown',
      department: 'Engineering',
      status: 'Active',
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it('should return empty list when no employees match', () => {
    const result = filterEmployees(mockEmployees, {
      search: 'NonExistent',
      department: 'Marketing',
      status: 'Active',
    });
    expect(result).toHaveLength(0);
  });
});

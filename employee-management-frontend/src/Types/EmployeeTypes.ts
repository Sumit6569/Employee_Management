export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  role: string;
  joiningDate: string;
  status: EmployeeStatus;
}

// Production Practice: You can reuse the Employee interface but Omit the 'id' 
// since the database or backend will generate it for new employees.
export type CreateEmployeeInput = Omit<Employee, 'id'>;

// Generic response type to handle any data returned by your API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Specific response type for returning a list of employees
export type EmployeeListResponse = ApiResponse<Employee[]>;
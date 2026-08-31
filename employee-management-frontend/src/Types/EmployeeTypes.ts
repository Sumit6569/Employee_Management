import  type { ApiResponse } from "./ApiResponseTypes";

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
export type UpdateEmployeeInput = Omit<Employee, "id">;
// Generic response type to handle any data returned by your API

// Specific response type for returning a list of employees
export type EmployeeListResponse = ApiResponse<Employee[]>;
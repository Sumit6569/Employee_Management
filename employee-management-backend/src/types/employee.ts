export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  department: string;
  role: string;
  manager: string | null;
  joiningDate: string;
  status: EmployeeStatus;
}


export interface CreateEmployeeInput {
  name: string;
  email: string;
  phone?: string | null;
  department: string;
  role: string;
  manager?: string | null;
  joiningDate: string;
  status: EmployeeStatus;
}



export interface UpdateEmployeeInput {
  name?: string;
  email?: string;
  phone?: string | null;
  department?: string;
  role?: string;
  manager?: string | null;
  joiningDate?: string;
  status?: EmployeeStatus;
}



export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: EmployeeStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  pagination?: PaginationMeta;
  error?: {
    message: string;
    details?: unknown;
  };
}


/**
 * Maps a raw PostgreSQL table row (snake_case) to API Employee object (camelCase).
 */
export function mapRowToEmployee(row: any): Employee {
  let formattedJoiningDate = "";
  if (row.joining_date) {
    if (row.joining_date instanceof Date) {
      formattedJoiningDate = row.joining_date.toISOString().split("T")[0];
    } else {
      formattedJoiningDate = String(row.joining_date).split("T")[0];
    }
  }



  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    department: row.department,
    role: row.role,
    manager: row.manager ?? null,
    joiningDate: formattedJoiningDate,
    status: row.status as EmployeeStatus,
  };
}

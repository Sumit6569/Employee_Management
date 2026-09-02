import { Employee } from "./employee.js";

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  department?: string;
  employeeId?: number;
}

export type ReportResult = Employee;

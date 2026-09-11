import httpClient from './httpClient';

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  department?: string;
  employeeId?: number | null;
}

export interface ReportResult {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
}

export async function getReports(filters: ReportFilters): Promise<ReportResult[]> {
  const params = new URLSearchParams();

  if (filters.startDate) {
    params.set('startDate', filters.startDate);
  }

  if (filters.endDate) {
    params.set('endDate', filters.endDate);
  }

  if (filters.department) {
    params.set('department', filters.department);
  }

  if (filters.employeeId !== null && filters.employeeId !== undefined) {
    params.set('employeeId', String(filters.employeeId));
  }

  const response = await httpClient.get<ReportResult[]>(`/reports?${params.toString()}`);

  return response.data;
}

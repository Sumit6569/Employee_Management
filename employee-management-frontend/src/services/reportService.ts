import { get } from './httpClient';
import { reportCacheService } from './reportCacheService';

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

  const queryString = params.toString();
  const url = queryString ? `/reports?${queryString}` : '/reports';
  const cacheKey = queryString || 'default';

  try {
    const data = await get<ReportResult[] | { data: ReportResult[] }>(url);
    const records: ReportResult[] = Array.isArray(data)
      ? data
      : (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: ReportResult[] }).data))
        ? (data as { data: ReportResult[] }).data
        : [];

    try {
      await reportCacheService.setReport(cacheKey, filters, records);
    } catch {
      // ignore cache writing error
    }

    return records;
  } catch (err: unknown) {
    try {
      const cached = await reportCacheService.getReport(cacheKey);
      if (cached && Array.isArray(cached.records)) {
        return cached.records;
      }
    } catch {
      // ignore
    }
    throw err;
  }
}

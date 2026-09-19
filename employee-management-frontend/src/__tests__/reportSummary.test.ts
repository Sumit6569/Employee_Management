import { describe, it, expect } from 'vitest';
import type { ReportResult } from '../services/reportService.ts';

// Logic mirror from ReportSummary.tsx
function computeReportMetrics(reports: ReportResult[]) {
  const safeReports = Array.isArray(reports) ? reports : [];
  const totalEmployees = safeReports.length;
  const activeEmployees = safeReports.filter((r) => r.status === 'Active').length;
  const inactiveEmployees = safeReports.filter((r) => r.status === 'Inactive').length;
  const departments = new Set(safeReports.map((r) => r.department).filter(Boolean)).size;

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    departments,
  };
}

describe('Report Summary Metrics Calculation', () => {
  const sampleReports: ReportResult[] = [
    {
      id: 1,
      name: 'Emma Watson',
      email: 'emma@company.com',
      department: 'HR',
      role: 'HR Manager',
      status: 'Active',
      joiningDate: '2021-04-12',
    },
    {
      id: 2,
      name: 'Daniel Radcliffe',
      email: 'daniel@company.com',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'Inactive',
      joiningDate: '2022-09-01',
    },
    {
      id: 3,
      name: 'Rupert Grint',
      email: 'rupert@company.com',
      department: 'HR',
      role: 'Recruiter',
      status: 'Active',
      joiningDate: '2023-01-10',
    },
  ];

  it('should accurately count total, active, and inactive employees', () => {
    const metrics = computeReportMetrics(sampleReports);
    expect(metrics.totalEmployees).toBe(3);
    expect(metrics.activeEmployees).toBe(2);
    expect(metrics.inactiveEmployees).toBe(1);
  });

  it('should accurately count unique departments', () => {
    const metrics = computeReportMetrics(sampleReports);
    expect(metrics.departments).toBe(2); // HR and Finance
  });

  it('should gracefully handle empty reports array', () => {
    const metrics = computeReportMetrics([]);
    expect(metrics.totalEmployees).toBe(0);
    expect(metrics.activeEmployees).toBe(0);
    expect(metrics.inactiveEmployees).toBe(0);
    expect(metrics.departments).toBe(0);
  });
});

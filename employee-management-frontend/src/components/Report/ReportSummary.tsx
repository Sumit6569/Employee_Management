import type { ReportResult } from '../../services/reportService';
import SummaryCard from './SummaryCard';

interface ReportSummaryProps {
  reports: ReportResult[];
}

function ReportSummary({ reports }: ReportSummaryProps) {
  const safeReports = Array.isArray(reports) ? reports : [];

  const totalEmployees = safeReports.length;

  const activeEmployees = safeReports.filter(
    (report) => report.status === 'Active'
  ).length;

  const inactiveEmployees = safeReports.filter(
    (report) => report.status === 'Inactive'
  ).length;

  const departments = new Set(
    safeReports.map((report) => report.department)
  ).size;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Employees"
        value={totalEmployees}
      />

      <SummaryCard
        title="Active Employees"
        value={activeEmployees}
      />

      <SummaryCard
        title="Inactive Employees"
        value={inactiveEmployees}
      />

      <SummaryCard
        title="Departments"
        value={departments}
      />
    </div>
  );
}

export default ReportSummary;

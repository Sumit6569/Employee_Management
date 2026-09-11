import type { ReportResult } from '../../services/reportService';

interface ReportExportProps {
  reports: ReportResult[];
}

function ReportExport({ reports }: ReportExportProps) {
  function handleExport(): void {
    if (reports.length === 0) {
      return;
    }

    const headers = ['Employee', 'Department', 'Role', 'Email', 'Joining Date', 'Status'];

    const rows = reports.map((report) => [
      report.name,
      report.department,
      report.role,
      report.email,
      report.joiningDate,
      report.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'employee-report.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={handleExport}
        disabled={reports.length === 0}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Export CSV
      </button>
    </div>
  );
}

export default ReportExport;

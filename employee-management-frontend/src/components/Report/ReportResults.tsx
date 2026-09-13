import type { ReportResult } from "../../services/reportService";
import type { ReportResult } from '../../services/reportService';

interface ReportResultsProps {
  reports: ReportResult[];
}

function ReportResults({
  reports,
}: ReportResultsProps) {
function ReportResults({ reports }: ReportResultsProps) {
  if (reports.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="text-gray-500">
          No report data found.
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-xs">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No report records matched your current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Report Results
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {reports.length} employee
          {reports.length !== 1 ? "s" : ""} found
        </p>
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xs transition-colors">
      <div className="border-b border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Report Results
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {reports.length} employee{reports.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-5 py-3 text-sm font-medium">
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Employee
              </th>

              <th className="px-5 py-3 text-sm font-medium">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Department
              </th>

              <th className="px-5 py-3 text-sm font-medium">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Role
              </th>

              <th className="px-5 py-3 text-sm font-medium">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Email
              </th>

              <th className="px-5 py-3 text-sm font-medium">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Joining Date
              </th>

              <th className="px-5 py-3 text-sm font-medium">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b last:border-b-0"
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-5 py-4 font-medium">
                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                  {report.name}
                </td>

                <td className="px-5 py-4">
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">
                  {report.department}
                </td>

                <td className="px-5 py-4">
                <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300">
                  {report.role}
                </td>

                <td className="px-5 py-4">
                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">
                  {report.email}
                </td>

                <td className="px-5 py-4">
                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">
                  {report.joiningDate}
                </td>

                <td className="px-5 py-4">
                <td className="px-5 py-3.5">
                  <span
                    className={
                      report.status === "Active"
                        ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                        : "rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                    }
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      report.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportResults;
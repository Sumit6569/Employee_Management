import type { ReportResult } from "../../services/reportService";

interface ReportResultsProps {
  reports: ReportResult[];
}

function ReportResults({
  reports,
}: ReportResultsProps) {
  if (reports.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="text-gray-500">
          No report data found.
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
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-5 py-3 text-sm font-medium">
                Employee
              </th>

              <th className="px-5 py-3 text-sm font-medium">
                Department
              </th>

              <th className="px-5 py-3 text-sm font-medium">
                Role
              </th>

              <th className="px-5 py-3 text-sm font-medium">
                Email
              </th>

              <th className="px-5 py-3 text-sm font-medium">
                Joining Date
              </th>

              <th className="px-5 py-3 text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b last:border-b-0"
              >
                <td className="px-5 py-4 font-medium">
                  {report.name}
                </td>

                <td className="px-5 py-4">
                  {report.department}
                </td>

                <td className="px-5 py-4">
                  {report.role}
                </td>

                <td className="px-5 py-4">
                  {report.email}
                </td>

                <td className="px-5 py-4">
                  {report.joiningDate}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      report.status === "Active"
                        ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                        : "rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                    }
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
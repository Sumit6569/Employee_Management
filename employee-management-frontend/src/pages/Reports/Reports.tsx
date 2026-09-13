import ReportExport from '../../components/Report/ReportExport';
import ReportFilters from '../../components/Report/ReportFilters';
import ReportResults from '../../components/Report/ReportResults';
import ReportSummary from '../../components/Report/ReportSummary';
import { useReports } from '../../hooks/Reports/useReports';
import type { ReportResult } from '../../services/reportService';

function Reports() {
  const { data, isLoading, isError, error, isFetching } = useReports();

  // Safely extract reports array whether data is an array or an ApiResponse object
  const reports: ReportResult[] = Array.isArray(data)
    ? data
    : (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: ReportResult[] }).data))
      ? (data as { data: ReportResult[] }).data
      : [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Filter, analyze, and export employee performance and organizational metrics.
          </p>
        </div>

        {!isLoading && !isError && reports.length > 0 && (
          <ReportExport reports={reports} />
        )}
      </div>

      <ReportFilters />

      {isLoading && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center shadow-xs">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-base font-medium text-gray-600 dark:text-gray-400">Loading reports...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 p-6">
          <p className="font-semibold text-red-700 dark:text-red-300">Failed to load report</p>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <ReportSummary reports={reports} />
          <ReportResults reports={reports} />
          {isFetching && (
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 animate-pulse">
              Updating cached reports in background...
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Reports;

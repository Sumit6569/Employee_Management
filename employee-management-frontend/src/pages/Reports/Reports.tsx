import ReportExport from '../../components/Report/ReportExport';
import ReportFilters from '../../components/Report/ReportFilters';
import ReportResults from '../../components/Report/ReportResults';
import ReportSummary from '../../components/Report/ReportSummary';
import { useReports } from '../../hooks/Reports/useReports';

function Reports() {
  const { data: reports = [], isLoading, isError, error, isFetching } = useReports();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>

        <p className="mt-1 text-sm text-gray-500">View and export employee reports</p>
      </div>

      <ReportFilters />

      {isLoading && (
        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-gray-500">Loading report...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">Failed to load report</p>

          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <ReportSummary reports={reports} />

          <ReportExport reports={reports} />

          <ReportResults reports={reports} />

          {isFetching && <p className="text-center text-sm text-gray-500">Updating report...</p>}
        </>
      )}
    </div>
  );
}

export default Reports;

import {
  setStartDate,
  setEndDate,
  setDepartment,
  setEmployee,
  resetFilters,
} from '../../stores/reportSlice/reportSlice';

import { selectReportFilters } from '../../stores/selectors/reportSelectors';

import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { useEmployeesQuery } from '../../hooks/Employee/useEmployeesQuery';
import { useReportSessionStorage } from '../../hooks/Reports/useReportSessionStorage';

function ReportFilters() {
  useReportSessionStorage();
  const { data: employees = [], isLoading: isEmployeesLoading } = useEmployeesQuery();
  const dispatch = useAppDispatch();

  const filters = useAppSelector(selectReportFilters);

  function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(setStartDate(event.target.value));
  }

  function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(setEndDate(event.target.value));
  }

  function handleDepartmentChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(setDepartment(event.target.value));
  }

  function handleEmployeeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    dispatch(setEmployee(value ? Number(value) : null));
  }

  function handleReset(): void {
    dispatch(resetFilters());
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-xs transition-colors">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Report Filters</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={filters.dateRange.startDate}
            onChange={handleStartDateChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={filters.dateRange.endDate}
            onChange={handleEndDateChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Department
          </label>
          <select
            id="department"
            value={filters.department}
            onChange={handleDepartmentChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Employee */}
        <div>
          <label htmlFor="employee" className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
            Employee
          </label>
          <select
            id="employee"
            value={filters.employeeId ?? ''}
            onChange={handleEmployeeChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="">All Employees</option>
            {isEmployeesLoading ? (
              <option disabled>Loading employees...</option>
            ) : (
              employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ReportFilters;

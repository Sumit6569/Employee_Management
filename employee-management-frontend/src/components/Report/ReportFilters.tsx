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
function ReportFilters() {
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
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Report Filters</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="mb-1 block text-sm font-medium">
            Start Date
          </label>

          <input
            id="startDate"
            type="date"
            value={filters.dateRange.startDate}
            onChange={handleStartDateChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="mb-1 block text-sm font-medium">
            End Date
          </label>

          <input
            id="endDate"
            type="date"
            value={filters.dateRange.endDate}
            onChange={handleEndDateChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="mb-1 block text-sm font-medium">
            Department
          </label>

          <select
            id="department"
            value={filters.department}
            onChange={handleDepartmentChange}
            className="w-full rounded border px-3 py-2"
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
          <label htmlFor="employee" className="mb-1 block text-sm font-medium">
            Employee
          </label>

          <select
            id="employee"
            value={filters.employeeId ?? ''}
            onChange={handleEmployeeChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">All Employees</option>

            {/* We'll populate real employees here later */}
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

      <button type="button" onClick={handleReset} className="mt-4 rounded border px-4 py-2">
        Reset Filters
      </button>
    </div>
  );
}

export default ReportFilters;

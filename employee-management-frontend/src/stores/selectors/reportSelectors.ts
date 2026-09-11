import type { RootState } from "../store";

export function selectReportFilters(
  state: RootState
) {
  return state.report.filters;
}

export function selectReportDateRange(
  state: RootState
) {
  return state.report.filters.dateRange;
}

export function selectReportDepartment(
  state: RootState
) {
  return state.report.filters.department;
}

export function selectReportEmployeeId(
  state: RootState
) {
  return state.report.filters.employeeId;
}

export function selectReportConfiguration(
  state: RootState
) {
  return state.report.configuration;
}

export function selectIsFilterOpen(
  state: RootState
) {
  return state.report.ui.isFilterOpen;
}
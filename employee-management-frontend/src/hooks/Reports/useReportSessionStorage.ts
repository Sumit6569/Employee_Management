import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { selectReportFilters } from '../../stores/selectors/reportSelectors';
import {
  setStartDate,
  setEndDate,
  setDepartment,
  setEmployee,
} from '../../stores/reportSlice/reportSlice';

const SESSION_KEY = 'employee_report_temporary_filters';

/**
 * Custom hook that synchronizes report filters with sessionStorage.
 * Restores filters when returning to the Reports tab during the same browser session.
 * Discards filters automatically when the tab or browser window is closed.
 */
export function useReportSessionStorage(): void {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectReportFilters);
  const isInitialMount = useRef(true);

  // Restore filters from sessionStorage on tab initialization
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.dateRange?.startDate) {
          dispatch(setStartDate(parsed.dateRange.startDate));
        }
        if (parsed.dateRange?.endDate) {
          dispatch(setEndDate(parsed.dateRange.endDate));
        }
        if (parsed.department) {
          dispatch(setDepartment(parsed.department));
        }
        if (parsed.employeeId !== undefined && parsed.employeeId !== null) {
          dispatch(setEmployee(parsed.employeeId));
        }
      }
    } catch (err) {
      console.warn('Failed to restore report filters from sessionStorage:', err);
    }
  }, [dispatch]);

  // Persist filters to sessionStorage whenever they change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(filters));
    } catch (err) {
      console.warn('Failed to persist report filters to sessionStorage:', err);
    }
  }, [filters]);
}

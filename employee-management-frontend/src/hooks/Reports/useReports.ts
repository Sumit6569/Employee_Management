import { useQuery } from '@tanstack/react-query';
import { getReports } from '../../services/reportService';
import { useAppSelector } from '../../stores/hook';
import { selectReportFilters } from '../../stores/selectors/reportSelectors';

export function useReports() {
  const filters = useAppSelector(selectReportFilters);

  return useQuery({
    queryKey: [
      'reports',
      {
        startDate: filters.dateRange.startDate,
        endDate: filters.dateRange.endDate,
        department: filters.department,
        employeeId: filters.employeeId,
      },
    ],

    queryFn: () =>
      getReports({
        startDate: filters.dateRange.startDate,
        endDate: filters.dateRange.endDate,
        department: filters.department,
        employeeId: filters.employeeId,
      }),

    staleTime: 5 * 60 * 1000,
  });
}

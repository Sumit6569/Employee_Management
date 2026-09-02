import { findReports } from "../repositories/reportRepository.js";
import { ReportFilters, ReportResult } from "../types/reportTypes.js";
import { BadRequestError } from "../utils/errors.js";

export const getReports = async (
  filters: ReportFilters
): Promise<ReportResult[]> => {
  if (filters.startDate && filters.endDate) {
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
      throw new BadRequestError("startDate should not be after endDate");
    }
  }

  return await findReports(filters);
};

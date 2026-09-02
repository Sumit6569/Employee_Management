import { pool } from "../config/database.js";
import { ReportFilters, ReportResult } from "../types/reportTypes.js";
import { mapRowToEmployee } from "../types/employee.js";

export const findReports = async (
  filters: ReportFilters
): Promise<ReportResult[]> => {
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (filters.employeeId !== undefined && !isNaN(filters.employeeId)) {
    values.push(filters.employeeId);
    conditions.push(`id = $${values.length}`);
  }

  if (filters.department?.trim()) {
    values.push(filters.department.trim());
    conditions.push(`department = $${values.length}`);
  }

  if (filters.startDate?.trim()) {
    values.push(filters.startDate.trim());
    conditions.push(`joining_date >= $${values.length}`);
  }

  if (filters.endDate?.trim()) {
    values.push(filters.endDate.trim());
    conditions.push(`joining_date <= $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const query = `
    SELECT
      id,
      name,
      email,
      phone,
      department,
      role,
      manager,
      joining_date,
      status
    FROM employees
    ${whereClause}
    ORDER BY joining_date DESC, id DESC
  `;

  const result = await pool.query(query, values);
  return result.rows.map(mapRowToEmployee);
};

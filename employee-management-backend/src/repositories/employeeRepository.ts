import { pool } from "../config/database.js";

import {
  Employee,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeQueryParams,
  mapRowToEmployee,
} from "../types/employee.js";


// Build WHERE conditions
const buildWhereClause = (params: EmployeeQueryParams) => {
  const conditions: string[] = [];
  const values: any[] = [];

  if (params.search?.trim()) {
    values.push(`%${params.search.trim()}%`);

    conditions.push(
      `(name ILIKE $${values.length} OR email ILIKE $${values.length})`
    );
  }

  if (params.department?.trim()) {
    values.push(params.department.trim());

    conditions.push(
      `department = $${values.length}`
    );
  }

  if (params.status) {
    values.push(params.status);

    conditions.push(
      `status = $${values.length}`
    );
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  return {
    whereClause,
    values,
  };
};


// GET all employees
export const findAll = async (
  params: EmployeeQueryParams & {
    page: number;
    limit: number;
  }
): Promise<Employee[]> => {

  const { whereClause, values } =
    buildWhereClause(params);

  const offset =
    (params.page - 1) * params.limit;

  values.push(params.limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

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
    ORDER BY id DESC
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  const result = await pool.query(query, values);

  return result.rows.map(mapRowToEmployee);
};


// COUNT employees
export const count = async (
  params: EmployeeQueryParams
): Promise<number> => {

  const { whereClause, values } =
    buildWhereClause(params);

  const query = `
    SELECT COUNT(*)::int AS total
    FROM employees
    ${whereClause}
  `;

  const result = await pool.query(query, values);

  return result.rows[0]?.total ?? 0;
};


// GET employee by ID
export const findById = async (
  id: number
): Promise<Employee | null> => {

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
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToEmployee(result.rows[0]);
};


// GET employee by email
export const findByEmail = async (
  email: string
): Promise<Employee | null> => {

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
    WHERE LOWER(email) = LOWER($1)
  `;

  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToEmployee(result.rows[0]);
};


// CREATE employee
export const create = async (
  data: CreateEmployeeInput
): Promise<Employee> => {

  const query = `
    INSERT INTO employees (
      name,
      email,
      phone,
      department,
      role,
      manager,
      joining_date,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING
      id,
      name,
      email,
      phone,
      department,
      role,
      manager,
      joining_date,
      status
  `;

  const values = [
    data.name,
    data.email,
    data.phone ?? null,
    data.department,
    data.role,
    data.manager ?? null,
    data.joiningDate,
    data.status,
  ];

  const result = await pool.query(query, values);

  return mapRowToEmployee(result.rows[0]);
};


// UPDATE employee
export const update = async (
  id: number,
  data: UpdateEmployeeInput
): Promise<Employee | null> => {

  const updates: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    values.push(data.name);
    updates.push(`name = $${values.length}`);
  }

  if (data.email !== undefined) {
    values.push(data.email);
    updates.push(`email = $${values.length}`);
  }

  if (data.phone !== undefined) {
    values.push(data.phone);
    updates.push(`phone = $${values.length}`);
  }

  if (data.department !== undefined) {
    values.push(data.department);
    updates.push(`department = $${values.length}`);
  }

  if (data.role !== undefined) {
    values.push(data.role);
    updates.push(`role = $${values.length}`);
  }

  if (data.manager !== undefined) {
    values.push(data.manager);
    updates.push(`manager = $${values.length}`);
  }

  if (data.joiningDate !== undefined) {
    values.push(data.joiningDate);
    updates.push(`joining_date = $${values.length}`);
  }

  if (data.status !== undefined) {
    values.push(data.status);
    updates.push(`status = $${values.length}`);
  }

  // Nothing to update
  if (updates.length === 0) {
    return findById(id);
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);

  values.push(id);

  const idIndex = values.length;

  const query = `
    UPDATE employees
    SET ${updates.join(", ")}
    WHERE id = $${idIndex}
    RETURNING
      id,
      name,
      email,
      phone,
      department,
      role,
      manager,
      joining_date,
      status
  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToEmployee(result.rows[0]);
};


// DELETE employee
export const deleteEmployee = async (
  id: number
): Promise<boolean> => {

  const query = `
    DELETE FROM employees
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  return (result.rowCount ?? 0) > 0;
};
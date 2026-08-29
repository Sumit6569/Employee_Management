import {
  findAll,
  count,
  findById,
  findByEmail,
  create,
  update,
  deleteEmployee as deleteEmployeeRecord,
} from "../repositories/employeeRepository.js";

import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeQueryParams,
  Employee,
  PaginationMeta,
} from "../types/employee.js";

import {
  NotFoundError,
  ConflictError,
} from "../utils/errors.js";


// GET all employees
export const getEmployees = async (
  params: EmployeeQueryParams
) => {
  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 10;

  const queryParams = {
    ...params,
    page,
    limit,
  };

  const [employees, total] = await Promise.all([
    findAll(queryParams),
    count(queryParams),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  const pagination: PaginationMeta = {
    page,
    limit,
    total,
    totalPages,
  };

  return {
    employees,
    pagination,
  };
};


// GET employee by ID
export const getEmployeeById = async (
  id: number
): Promise<Employee> => {
  const employee = await findById(id);

  if (!employee) {
    throw new NotFoundError("Employee not found");
  }

  return employee;
};


// CREATE employee
export const createEmployee = async (
  data: CreateEmployeeInput
): Promise<Employee> => {
  const existingEmployee = await findByEmail(data.email);

  if (existingEmployee) {
    throw new ConflictError(
      "An employee with this email already exists"
    );
  }

  return create(data);
};


// UPDATE employee
export const updateEmployee = async (
  id: number,
  data: UpdateEmployeeInput
): Promise<Employee> => {
  const existingEmployee = await findById(id);

  if (!existingEmployee) {
    throw new NotFoundError("Employee not found");
  }

  // Check email conflict
  if (
    data.email &&
    data.email.toLowerCase() !== existingEmployee.email.toLowerCase()
  ) {
    const emailConflict = await findByEmail(data.email);

    if (emailConflict && emailConflict.id !== id) {
      throw new ConflictError(
        "An employee with this email already exists"
      );
    }
  }

  const updatedEmployee = await update(id, data);

  if (!updatedEmployee) {
    throw new NotFoundError("Employee not found");
  }

  return updatedEmployee;
};


// DELETE employee
export const deleteEmployee = async (
  id: number
): Promise<void> => {
  const existingEmployee = await findById(id);

  if (!existingEmployee) {
    throw new NotFoundError("Employee not found");
  }

  await deleteEmployeeRecord(id);
};
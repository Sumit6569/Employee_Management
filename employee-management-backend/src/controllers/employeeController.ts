import { Request, Response, NextFunction } from "express";

import {
  employeeQuerySchema,
  employeeIdSchema,
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validators/employeeValidator.js";


import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService.js";


// GET /employees
export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = employeeQuerySchema.parse(req.query);

    const result = await getEmployees(query);

    res.status(200).json({
      success: true,
      data: result.employees,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};


// GET /employees/:id
export const getOneEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = employeeIdSchema.parse(req.params);

    const employee = await getEmployeeById(id);

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};


// POST /employees
export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createEmployeeSchema.parse(req.body);

    const employee = await createEmployee(data);

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};


// PUT /employees/:id
export const editEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = employeeIdSchema.parse(req.params);

    const data = updateEmployeeSchema.parse(req.body);

    const employee = await updateEmployee(id, data);

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};


// DELETE /employees/:id
export const removeEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = employeeIdSchema.parse(req.params);

    await deleteEmployee(id);

    res.status(200).json({
      success: true,
      data: {
        message: "Employee deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};
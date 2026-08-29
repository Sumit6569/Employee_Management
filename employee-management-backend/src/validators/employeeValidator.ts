import { z } from "zod";

export const employeeQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
  search: z.string().trim().optional(),
  department: z.string().trim().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
});

export const createEmployeeSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().nullable().optional(),
  department: z.string().trim().min(1, "Department is required"),
  role: z.string().trim().min(1, "Role is required"),
  manager: z.string().trim().nullable().optional(),
  joiningDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "joiningDate must be in YYYY-MM-DD format"),
  status: z.enum(["Active", "Inactive"], {
    message: "Status must be 'Active' or 'Inactive'",
  }),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const employeeIdSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive("Employee ID must be a positive integer")),
});

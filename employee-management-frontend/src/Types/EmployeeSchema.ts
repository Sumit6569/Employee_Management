import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  department: z
    .string()
    .min(1, "Department is required"),

  role: z
    .string()
    .min(1, "Role is required"),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  status: z.enum(["Active", "Inactive"]),
});


export type EmployeeFormData =
  z.infer<typeof employeeSchema>;
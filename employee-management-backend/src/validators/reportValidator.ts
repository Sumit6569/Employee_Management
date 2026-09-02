import { z } from "zod";

export const reportQuerySchema = z
  .object({
    startDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be in YYYY-MM-DD format")
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "startDate must be a valid date",
      })
      .optional(),
    endDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "endDate must be in YYYY-MM-DD format")
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "endDate must be a valid date",
      })
      .optional(),
    department: z
      .string()
      .trim()
      .min(1, "department cannot be empty")
      .optional(),
    employeeId: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(
        z.number().int().positive("employeeId must be a positive integer").optional()
      ),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: "startDate should not be after endDate",
      path: ["startDate"],
    }
  );

export type ReportQueryParamsInput = z.infer<typeof reportQuerySchema>;

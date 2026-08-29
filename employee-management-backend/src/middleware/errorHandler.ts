import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors.js";
import { NODE_ENV } from "../config/env.js";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const issueMessages = err.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
    const message = issueMessages.length > 0 ? issueMessages.join("; ") : "Validation failed";

    res.status(400).json({
      success: false,
      error: {
        message,
      },
    });
    return;
  }

  // Handle custom AppError (400, 404, 409, etc.)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
      },
    });
    return;
  }

  // Handle PostgreSQL unique constraint violations (code 23505)
  if (err.code === "23505") {
    res.status(409).json({
      success: false,
      error: {
        message: "A record with this unique identifier already exists",
      },
    });
    return;
  }

  // Unexpected internal server errors
  console.error("Unhandled Error:", err);

  const isDev = NODE_ENV === "development";
  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      ...(isDev && err.message ? { details: err.message } : {}),
    },
  });
}

import { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";

/**
 * Reusable RBAC middleware that checks if the authenticated user has at least one of the required roles (OR semantics).
 * Returns 401 if unauthenticated, 403 if authenticated but lacking required roles.
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    const userRoles = req.user.roles || [];
    const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
      return next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}


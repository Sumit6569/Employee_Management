import { Request, Response, NextFunction } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import {
  KEYCLOAK_JWKS_URI,
  KEYCLOAK_ISSUER,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_INTERNAL_URL,
} from '../config/env.js';
import { UnauthorizedError } from '../utils/errors.js';
import '../types/auth.js';

// Cached Remote JWKS set - retrieves & caches Keycloak signing keys automatically
const JWKS = createRemoteJWKSet(new URL(KEYCLOAK_JWKS_URI));

// Allowed issuers (supports localhost and internal container endpoints)
const allowedIssuers = Array.from(
  new Set([
    KEYCLOAK_ISSUER,
    `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`,
    `${KEYCLOAK_INTERNAL_URL}/realms/${KEYCLOAK_REALM}`,
  ])
);

/**
 * Authentication middleware that cryptographically verifies the Keycloak Bearer JWT
 * and attaches the authenticated user claims to req.user.
 */
export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError('Authentication required'));
  }

  if (!authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authentication required: Bearer token format expected'));
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return next(new UnauthorizedError('Authentication required: Token missing'));
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: allowedIssuers,
    });

    if (!payload.sub) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }

    const realmAccess = payload.realm_access as { roles?: unknown } | undefined;
    const roles: string[] = Array.isArray(realmAccess?.roles)
      ? realmAccess.roles.filter((role): role is string => typeof role === 'string')
      : [];

    req.user = {
      sub: payload.sub,
      username:
        typeof payload.preferred_username === 'string' ? payload.preferred_username : undefined,
      email: typeof payload.email === 'string' ? payload.email : undefined,
      roles,
    };

    next();
  } catch (_error) {
    // Cryptographic verification, issuer, or expiration check failed.
    // Do NOT expose internal JWT verification errors or stack traces.
    next(new UnauthorizedError('Invalid or expired token'));
  }
}

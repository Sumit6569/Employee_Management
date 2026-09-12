import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 8000;

export const POSTGRES_USER = process.env.POSTGRES_USER || 'employee_user';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'employee_password';
export const POSTGRES_DB = process.env.POSTGRES_DB || 'employee_management';
export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const KEYCLOAK_URL = process.env.KEYCLOAK_URL || 'http://localhost:8080';
export const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM || 'employee-management';
export const KEYCLOAK_ISSUER =
  process.env.KEYCLOAK_ISSUER || `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`;
export const KEYCLOAK_INTERNAL_URL = process.env.KEYCLOAK_INTERNAL_URL || KEYCLOAK_URL;
export const KEYCLOAK_JWKS_URI =
  process.env.KEYCLOAK_JWKS_URI ||
  `${KEYCLOAK_INTERNAL_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`;

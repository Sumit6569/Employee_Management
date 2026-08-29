import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 8000;

export const POSTGRES_USER = process.env.POSTGRES_USER || "employee_user";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "employee_password";
export const POSTGRES_DB = process.env.POSTGRES_DB || "employee_management";
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
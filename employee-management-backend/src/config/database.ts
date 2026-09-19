import pg from 'pg';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  NODE_ENV,
} from './env.js';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// Shared PostgreSQL connection pool supporting both local Docker and cloud providers (Render/Neon)
export const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl:
          NODE_ENV === 'production' || process.env.POSTGRES_SSL === 'true'
            ? { rejectUnauthorized: false }
            : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      }
    : {
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? { rejectUnauthorized: false }
            : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      }
);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

/**
 * Verifies that PostgreSQL database is reachable.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error);
    return false;
  }
}

/**
 * Gracefully closes the database pool.
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

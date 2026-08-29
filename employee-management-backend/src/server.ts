import app from "./app.js";
import { PORT } from "./config/env.js";
import { checkDatabaseConnection, closePool } from "./config/database.js";

async function startServer() {
  console.log("Checking database connection...");
  const isDbHealthy = await checkDatabaseConnection();

  if (!isDbHealthy) {
    console.error("FATAL: Database connection failure. Server startup aborted.");
    process.exit(1);
  }

  console.log("Database connection established successfully.");

  const server = app.listen(PORT, () => {
    console.log(`Employee Management Backend is running on port ${PORT}`);
  });

  // Graceful shutdown handling for Docker containers
  async function shutdown(signal: string) {
    console.log(`Received ${signal}. Starting graceful shutdown...`);

    server.close(async () => {
      console.log("HTTP server closed.");
      try {
        await closePool();
        console.log("PostgreSQL pool closed gracefully.");
        process.exit(0);
      } catch (err) {
        console.error("Error closing PostgreSQL pool:", err);
        process.exit(1);
      }
    });

    // Force shutdown after 10s if graceful close stalls
    setTimeout(() => {
      console.error("Forcefully shutting down due to timeout.");
      process.exit(1);
    }, 10000);
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer();
import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./config/env.js";
import { checkDatabaseConnection } from "./config/database.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Configure CORS
const allowedOrigins = [FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during development
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/**
 * GET /health
 * Health check endpoint verifying backend & database status.
 */
app.get("/health", async (_req, res) => {
  const isDbHealthy = await checkDatabaseConnection();

  if (isDbHealthy) {
    res.status(200).json({
      success: true,
      data: {
        status: "ok",
        database: "connected",
      },
    });
  } else {
    res.status(503).json({
      success: false,
      error: {
        message: "Database connection failed",
      },
    });
  }
});

// Mount domain routes
app.use("/employees", employeeRoutes);

// Handle unknown routes & errors
app.use(notFound);
app.use(errorHandler);

export default app;
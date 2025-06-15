// Server backend
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import UserRoute from "./route/UserRoute.js";
import TransactionRoute from "./route/TransactionRoute.js";
import CategoryRoute from "./route/CategoryRoute.js";
import PlanRoute from "./route/PlanRoute.js";
import { syncDatabase } from "./config/db.js";
import { syncPostgres } from "./config/postgres.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verify required environment variables
const requiredEnvVars = [
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "DB_HOST",
  "DB_NAME",
  "DB_USERNAME",
  "PG_DB_HOST",
  "PG_DB_NAME",
  "PG_DB_USERNAME",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);
if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  process.exit(1);
}

// Log environment variables (tanpa password)
console.log("\n=== Environment Variables ===");
console.log("PORT:", process.env.PORT);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("PG_DB_HOST:", process.env.PG_DB_HOST);
console.log("PG_DB_NAME:", process.env.PG_DB_NAME);
console.log("PG_DB_USERNAME:", process.env.PG_DB_USERNAME);
console.log(
  "ACCESS_TOKEN_SECRET:",
  process.env.ACCESS_TOKEN_SECRET ? "Set" : "Not Set"
);
console.log(
  "REFRESH_TOKEN_SECRET:",
  process.env.REFRESH_TOKEN_SECRET ? "Set" : "Not Set"
);
console.log("================================\n");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk cache control
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

// Middleware untuk logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS configuration
const allowedOrigins = ["http://35.232.79.14", "http://localhost:3000"];

app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("Origin yang ditolak:", origin);
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// Health check endpoints
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running",
    endpoints: {
      transactions: "/api/transaction",
      categories: "/api/category",
      auth: "/api/user",
    },
    timestamp: new Date().toISOString(),
  });
});

// Use routes
app.use("/api/user", UserRoute);
app.use("/api/transaction", TransactionRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/plan", PlanRoute);

// Initialize databases
try {
  console.log("\n🚀 Starting database initialization...\n");

  await syncDatabase();
  await syncPostgres();

  console.log("\n✨ All databases initialized successfully!");
  console.log("✅ MySQL Database: Ready");
  console.log("✅ PostgreSQL Database: Ready");
  console.log("===========================================\n");
} catch (error) {
  console.error("\n❌ Error initializing databases:", error);
  process.exit(1);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
  });
});

// Start server
const PORT = process.env.PORT;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
  console.log("CORS diaktifkan untuk:", allowedOrigins);
});

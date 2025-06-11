import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Log database configuration (without password)
console.log("\n=== PostgreSQL Database Configuration ===");
console.log("Host:", process.env.PG_DB_HOST);
console.log("Database:", process.env.PG_DB_NAME);
console.log("Username:", process.env.PG_DB_USERNAME);
console.log("Password:", process.env.PG_DB_PASSWORD ? "Set" : "Not Set");
console.log("======================================\n");

const postgres = new Sequelize(
  process.env.PG_DB_NAME || "moneytracker_users",
  process.env.PG_DB_USERNAME || "postgres",
  process.env.PG_DB_PASSWORD || "",
  {
    host: process.env.PG_DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const syncPostgres = async () => {
  try {
    console.log("\n=== Attempting to connect to PostgreSQL Database ===");
    console.log("Connection details:", {
      host: process.env.PG_DB_HOST,
      database: process.env.PG_DB_NAME,
      username: process.env.PG_DB_USERNAME,
    });

    await postgres.authenticate();
    console.log(
      "\n✅ PostgreSQL Database connection has been established successfully!"
    );
    console.log("📊 Database:", process.env.PG_DB_NAME);
    console.log("🌐 Host:", process.env.PG_DB_HOST);
    console.log("👤 User:", process.env.PG_DB_USERNAME);
    console.log("================================================\n");

    await postgres.sync({ alter: true });
    console.log("✅ PostgreSQL Database synchronized successfully\n");
  } catch (error) {
    console.error("\n❌ Error connecting to PostgreSQL Database:");
    console.error("Full error details:", {
      name: error.name,
      message: error.message,
      parent: error.parent
        ? {
            code: error.parent.code,
            errno: error.parent.errno,
            message: error.parent.message,
          }
        : null,
    });
    throw error;
  }
};

export default postgres;

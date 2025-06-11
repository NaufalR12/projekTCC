import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Category from "../model/Category.js";
import Transaction from "../model/Transaction.js";

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error("Error loading .env file in db.js:", result.error);
} else {
  console.log(".env file loaded successfully in db.js");
}

// Log database configuration (without password)
console.log("\n=== MySQL Database Configuration ===");
console.log("Host:", process.env.DB_HOST);
console.log("Database:", process.env.DB_NAME);
console.log("Username:", process.env.DB_USERNAME);
console.log("Password:", process.env.DB_PASSWORD ? "Set" : "Not Set");
console.log("================================\n");

const sequelize = new Sequelize(
  process.env.DB_NAME || "moneytracker",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

// Define associations
Category.hasMany(Transaction, { foreignKey: "categoryId" });

export const syncDatabase = async () => {
  try {
    console.log("\n=== Attempting to connect to MySQL Database ===");
    console.log("Connection details:", {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
    });

    await sequelize.authenticate();
    console.log(
      "\n✅ MySQL Database connection has been established successfully!"
    );
    console.log("📊 Database:", process.env.DB_NAME);
    console.log("🌐 Host:", process.env.DB_HOST);
    console.log("👤 User:", process.env.DB_USERNAME);
    console.log("===========================================\n");

    await sequelize.sync({ alter: true });
    console.log("✅ MySQL Database synchronized successfully\n");
  } catch (error) {
    console.error("\n❌ Error connecting to MySQL Database:");
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

export default sequelize;

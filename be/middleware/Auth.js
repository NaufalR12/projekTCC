import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Log JWT configuration (without actual secret values)
console.log("\n=== JWT Configuration ===");
console.log(
  "ACCESS_TOKEN_SECRET:",
  process.env.ACCESS_TOKEN_SECRET ? "Set" : "Not Set"
);
console.log(
  "REFRESH_TOKEN_SECRET:",
  process.env.REFRESH_TOKEN_SECRET ? "Set" : "Not Set"
);
console.log("================================\n");

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Akses ditolak" });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token data:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: "Token tidak valid" });
  }
};

export const generateAccessToken = (user) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
  }
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};

export const generateRefreshToken = (user) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
  }
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

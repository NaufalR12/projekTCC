import { DataTypes } from "sequelize";
import postgres from "../config/postgres.js";

const User = postgres.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    foto_profil: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;

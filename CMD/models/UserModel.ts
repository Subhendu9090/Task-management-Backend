import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
    },
    profilePic: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

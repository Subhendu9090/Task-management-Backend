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
      validate:{
        len:[2,100],
        notEmpty:true,
        notNull:true,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        isEmail:true,
        notEmpty:{msg:"Email cannot be empty"},
        notNull:{msg:"Email is required "}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:[2,200]
      }
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue:"USER"
    },
    profilePic: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
export default User
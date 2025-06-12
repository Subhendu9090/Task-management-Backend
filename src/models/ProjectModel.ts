import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        len:[50,500],
        notEmpty:true
      }
    },
    banner: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    }
  },
  {
    timestamps: true,
  }
);
export default Project;

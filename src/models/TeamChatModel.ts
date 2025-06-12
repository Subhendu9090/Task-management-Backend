import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const TeamChat = sequelize.define(
  "TeamChat",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: { model: "Teams", key: "id" },
    },
    sender: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);
export default TeamChat
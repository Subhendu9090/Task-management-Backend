import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const UserTeam = sequelize.define(
  "UserTeam",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: { model: "Teams", key: "id" },
    },
    role: {
      type: DataTypes.ENUM("Member", "Lead", "Manager"),
      defaultValue: "Member",
    },
  },
  {
    timestamps: true,
  }
);
export default UserTeam;
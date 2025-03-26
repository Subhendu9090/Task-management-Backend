import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    recipient: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("Read", "Unread"),
      defaultValue: "Unread",
    },
  },
  {
    timestamps: true,
  }
);
export default Notification;

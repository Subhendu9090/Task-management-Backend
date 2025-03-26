import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Team = sequelize.define(
  "Team",
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
    },
    description:{
      type:DataTypes.STRING
    },
    projectId:{
      type:DataTypes.INTEGER,
      references:{
        model:"Projects",
        key:"id"
      }
    },
    createdBy:{
      type:DataTypes.INTEGER,
      references:{
        model:"Users",
        key:"id"
      }
    }
  },
  {
    timestamps: true,
  }
);
export default Team
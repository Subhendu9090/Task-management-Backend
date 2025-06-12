import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Meeting = sequelize.define("Meeting", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  projectId: { 
    type: DataTypes.INTEGER ,
    references:{
      model:"Projects",
      key:"id"
    }
  },
  teamId:{
    type: DataTypes.INTEGER ,
    references:{
      model:"Projects",
      key:"id"
    }
  },
  scheduledAt: {
   type:DataTypes.DATE
  },
},{
  timestamps:true
});
export default Meeting;

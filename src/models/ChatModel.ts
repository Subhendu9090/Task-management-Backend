import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Chat=sequelize.define("Chat",{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true
  },
  chatType:{
    type:DataTypes.ENUM("Private","Group")
  },
  sender:{
   type:DataTypes.INTEGER,
   references:{
    model:"Users",
    key:"id"
   }
  },
  receiver:{
    type:DataTypes.INTEGER,
    references:{
     model:"Users",
     key:"id"
    }
  },
  teamId:{
    type:DataTypes.INTEGER,
    references:{
     model:"Teams",
     key:"id"
    }
  },
  message:{
   type:DataTypes.STRING
  }
},{
  timestamps:true
})

export default Chat
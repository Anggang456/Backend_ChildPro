import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Chat from "./chatModels.js";


const { DataTypes } = Sequelize;

const Message = db.define('message', {
    message_id:{
        type: DataTypes.INTEGER
    },
    send:{
        type: DataTypes.STRING
    },
    receiver:{
        type: DataTypes.STRING
    },
    file:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

Message.belongsTo(Chat, {foreignKey: 'message_id'});
Message.hasMany(Chat);

export default Message;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Chat from "./chatModels.js";


const { DataTypes } = Sequelize;

const Receiver = db.define('receiver', {
    message_id:{
        type: DataTypes.INTEGER
    },
    send:{
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

Receiver.belongsTo(Chat, {foreignKey: 'receiver_id'});
Receiver.hasMany(Chat);

export default Receiver;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Chat = db.define('chatroom', {
    users_id:{
        type: DataTypes.INTEGER
    },
    bidan_id:{
        type: DataTypes.INTEGER
    },
    token:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

Chat.belongsTo(Users, {foreignKey: 'users_id'});
Chat.belongsTo(Users, {foreignKey: 'bidan_id'});
Users.hasMany(Chat);

export default Chat;
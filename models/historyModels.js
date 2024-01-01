import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const History = db.define('history', {
    users_id:{
        type: DataTypes.INTEGER
    },
    tanggal:{
        type: DataTypes.STRING
    },
    timer:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    midwife:{
        type: DataTypes.STRING
    },
    token:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

History.belongsTo(Users, {foreignKey: 'users_id'});
Users.hasMany(History);

export default History;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
import Midwife from "./midwifeModels.js";

const { DataTypes } = Sequelize;

const Payment = db.define('payment', {
    users_id:{
        type: DataTypes.INTEGER
    },
    bidan_id:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    spesialis:{
        type: DataTypes.STRING
    },
    experience:{
        type: DataTypes.STRING
    },
    percentage:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

Payment.belongsTo(Users, {foreignKey: 'users_id'});
Payment.belongsTo(Midwife, {foreignKey: 'bidan_id'});
Users.hasMany(Midwife);

export default Payment;
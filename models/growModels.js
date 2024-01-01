import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Grows = db.define('growcheck', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    users_id:{
        type: DataTypes.INTEGER
    },
    users_id:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    dob:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    },
    weight:{
        type: DataTypes.STRING
    },
    height:{
        type: DataTypes.STRING
    },
    head:{
        type: DataTypes.STRING
    },
    parents:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    datevac:{
        type: DataTypes.STRING
    },
    midwife:{
        type: DataTypes.STRING
    },
    activity:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

Grows.belongsTo(Users, {foreignKey: 'users_id'});
Users.hasMany(Grows);

export default Grows;
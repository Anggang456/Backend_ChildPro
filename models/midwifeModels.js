import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Midwife = db.define('bidan', {
    users_id:{
        type: DataTypes.INTEGER
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

Midwife.belongsTo(Users, {foreignKey: 'users_id'});
Users.hasMany(Midwife);

export default Midwife;
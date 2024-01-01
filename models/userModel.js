import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    telp:{
        type: DataTypes.STRING
    },
    dob:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    },
    alamat:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.INTEGER
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});


export default Users;
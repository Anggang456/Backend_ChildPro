import { Sequelize } from "sequelize"

const db = new Sequelize('childpro','root','dany1234',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

export default db;
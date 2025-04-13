const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USUARIODB, process.env.DBPASS, {
    host: process.env.HOST,
    dialect: 'mysql',
})

module.exports=sequelize;
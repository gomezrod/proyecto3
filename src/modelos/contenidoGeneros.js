const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const ContenidoGeneros = sequelize.define('contenidoGeneros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName: 'contenidoGeneros',
    timestamps: false
})

module.exports = ContenidoGeneros;
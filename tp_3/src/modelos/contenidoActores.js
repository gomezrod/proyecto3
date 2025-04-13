const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const ContenidoActores = sequelize.define('contenidoActores', {
    idContenidoActores: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName: 'contenidoActores',
    timestamps: false
})

module.exports = ContenidoActores;
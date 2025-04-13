const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Actores = sequelize.define('actores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'actores',
    timestamps: false
});

module.exports = Actores;
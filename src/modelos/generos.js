const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Generos = sequelize.define('generos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'generos',
    timestamps: false,
});

module.exports = Generos;
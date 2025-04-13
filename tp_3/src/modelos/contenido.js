const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Contenido = sequelize.define('contenido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    // idCategoria: {
    //     type: DataTypes.INTEGER,
    //     foreignKey: true, //¿Cómo referencio?
    //     allowNull: false,
    // },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    temporadas: {
        type: DataTypes.INTEGER,
    },
    poster: {
        type: DataTypes.STRING,
    },
    trailer: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'contenido',
    timestamps: false
});

module.exports = Contenido;
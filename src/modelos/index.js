const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');

const Contenido = require('./contenido');
const Categorias = require('./categorias');
const Generos = require('./generos');
const Actores = require('./actores');
const ContenidoGeneros = require('./contenidoGeneros');
const ContenidoActores = require('./contenidoActores');

Contenido.belongsToMany(Generos, { through: ContenidoGeneros });
Generos.belongsToMany(Contenido, { through: ContenidoGeneros });

Contenido.belongsToMany(Actores, { through: ContenidoActores });
Actores.belongsToMany(Contenido, { through: ContenidoActores });

Contenido.belongsTo(Categorias);
Categorias.hasMany(Contenido);

module.exports = {Contenido, Categorias, Generos, Actores};
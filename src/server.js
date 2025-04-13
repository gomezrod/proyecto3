const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const sequelize=require('./conexion/conexion');
const {Op} = require('sequelize');

const server=express();
// const {Trailerflix} = require('./modelos/trailerflix');
const { Contenido, Categorias, Generos, Actores } = require('./modelos/index');

server.use(express.json());

server.get('/categorias', async (req, res)=>{
    const categorias = await Categorias.findAll({attributes: ['categoria']});
    res.status(200).send(categorias);
})

server.get('/catalogo', async (req, res)=>{
    
    const catalogo = await Contenido.findAll({
        attributes: ['id', 'poster', 'titulo', 'resumen', 'temporadas', 'trailer']
    });

    const categorias = await Contenido.findAll({
        attributes:[],
        include:{
            model: Categorias,
            attributes: ['categoria']
        }
    });

    const actores = await Contenido.findAll({
        attributes: [],
        include: {
            model: Actores,
            attributes: ['nombre'],
            through: {attributes:[]}
        }
    });

    const generos = await Contenido.findAll({
        attributes: [],
        include:{
            model: Generos,
            attributes: ['genero'],
            through: {attributes:[]}
        }
    })

    const arrayCategorias = [];
    categorias.forEach(elemento =>{
        arrayCategorias.push(elemento.categoria.categoria);
    })

    const arrayGenero = [];
    let generosC = "";
    generos.forEach(elemento=>{
        elemento.generos.forEach(genero => {
            if (generosC === "") generosC = genero.genero;
            else generosC = generosC + ", " + genero.genero;
        });
        arrayGenero.push(generosC);
        generosC="";
    });

    const arrayActores = [];
    let actoresC = "";
    actores.forEach(elemento => {
        elemento.actores.forEach(actor => {
            if (actoresC === "") actoresC = actor.nombre;
            else actoresC = actoresC + ", " + actor.nombre;
        });
        arrayActores.push(actoresC);
        actoresC = "";
    })

    let unidad = {};
    const arrayUnidad = [];

    catalogo.forEach((elemento, i) =>{

        unidad = {
            id: elemento.id,
            poster: elemento.poster,
            titulo: elemento.titulo,
            categoria: arrayCategorias[i],
            genero: arrayGenero[i],
            resumen: elemento.resumen,
            temporadas: elemento.temporadas,
            reparto: arrayActores[i],
            trailer: elemento.trailer
        }

        arrayUnidad.push(unidad);
        
    })

    res.status(200).send(arrayUnidad);
})

server.get('/catalogo/:id', async (req, res) => {

    const ID = req.params.id;

    if(Number.isNaN(Number(ID))){
        res.status(500).send("El ID debe ser un número");
        return;
    }

    const catalogo = await Contenido.findByPk(ID, {
        attributes: ['id', 'poster', 'titulo', 'resumen', 'temporadas', 'trailer']
    });

    const categorias = await Contenido.findByPk(ID, {
        attributes: [],
        include: {
            model: Categorias,
            attributes: ['categoria']
        }
    });

    const actores = await Contenido.findByPk(ID, {
        attributes: [],
        include: {
            model: Actores,
            attributes: ['nombre'],
            through: { attributes: [] }
        }
    });

    const generos = await Contenido.findByPk(ID, {
        attributes: [],
        include: {
            model: Generos,
            attributes: ['genero'],
            through: { attributes: [] }
        }
    })

    let generosC = "";
    generos.generos.forEach(genero => {
        if (generosC === "") generosC = genero.genero;
        else generosC = generosC + ", " + genero.genero;
    });

    let actoresC = "";
    actores.actores.forEach(actor => {
        if (actoresC === "") actoresC = actor.nombre;
        else actoresC = actoresC + ", " + actor.nombre;
    });

    const unidad = {
        id: catalogo.id,
        poster: catalogo.poster,
        titulo: catalogo.titulo,
        categoria: categorias.categorias,
        genero: generosC,
        resumen: catalogo.resumen,
        temporadas: catalogo.temporadas,
        reparto: actoresC,
        trailer: catalogo.trailer
    }

    res.status(200).send(unidad);
})


server.get('/catalogo/nombre/:nombre', async (req, res) => {

    const nombre = req.params.nombre;

    const catalogo = await Contenido.findOne({
        attributes: ['id', 'poster', 'titulo', 'resumen', 'temporadas', 'trailer'],
        where: {
            titulo: { [Op.like]: '%' + nombre + '%' }
        }
    });

    const categorias = await Contenido.findOne({
        attributes: [],
        where: {
            titulo: { [Op.like]: '%' + nombre + '%' }
        },
        include: {
            model: Categorias,
            attributes: ['categoria']
        }
    });

    const actores = await Contenido.findOne({
        attributes: [],
        where: {
            titulo: { [Op.like]: '%' + nombre + '%' }
        },
        include: {
            model: Actores,
            attributes: ['nombre'],
            through: { attributes: [] }
        }
    });

    const generos = await Contenido.findOne({
        attributes: [],
        where: {
            titulo: { [Op.like]: '%' + nombre + '%' }
        },
        include: {
            model: Generos,
            attributes: ['genero'],
            through: { attributes: [] }
        }
    })

    let generosC = "";
    generos.generos.forEach(genero => {
        if (generosC === "") generosC = genero.genero;
        else generosC = generosC + ", " + genero.genero;
    });

    let actoresC = "";
    actores.actores.forEach(actor => {
        if (actoresC === "") actoresC = actor.nombre;
        else actoresC = actoresC + ", " + actor.nombre;
    });

    const unidad = {
        id: catalogo.id,
        poster: catalogo.poster,
        titulo: catalogo.titulo,
        categoria: categorias.categorias,
        genero: generosC,
        resumen: catalogo.resumen,
        temporadas: catalogo.temporadas,
        reparto: actoresC,
        trailer: catalogo.trailer
    }

    res.status(200).send(unidad);
})


server.get('/catalogo/genero/:genero', async (req, res)=>{
    
    const genFind = req.params.genero;

    console.log(genFind);

    const genero = await Generos.findAll({
        attributes: ['id'],
        where: {
            genero: { [Op.eq]: genFind }
        },
        include: {
            model: Contenido,
            attributes:['id'],
            through: {attributes:[]}
        }
    });

    const generosExistentes = await Generos.findAll({
        attributes: ['genero']
    });

    const arrayGenerosExistentes = [];
    generosExistentes.forEach(elemento => {
        arrayGenerosExistentes.push(elemento.genero)
    });

    let consulta = true;
    arrayGenerosExistentes.forEach(elemento => {
        if (elemento === genFind) consulta = false;
    })
    console.log(consulta);
    if (consulta) {
        res.status(500).send(`El género consultado no existe, elige alguno de las siguientes:${arrayGenerosExistentes}`);
        return;
    }

    const arrayID = [];
    genero[0].contenidos.forEach(elemento=>{
        arrayID.push(elemento.id)
    });

    console.log(arrayID);

    const catalogo = await Contenido.findAll({
        attributes: ['id', 'poster', 'titulo', 'resumen', 'temporadas', 'trailer'],
        where: {
            id: {[Op.in] : arrayID}
        },
    });

    const categorias = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Categorias,
            attributes: ['categoria']
        }
    });

    const actores = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Actores,
            attributes: ['nombre'],
            through: { attributes: [] }
        }
    });

    const generos = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Generos,
            attributes: ['genero'],
            through: { attributes: [] }
        }
    })

    const arrayCategorias = [];
    categorias.forEach(elemento => {
        arrayCategorias.push(elemento.categoria.categoria);
    })

    const arrayGenero = [];
    let generosC = "";
    generos.forEach(elemento => {
        elemento.generos.forEach(genero => {
            if (generosC === "") generosC = genero.genero;
            else generosC = generosC + ", " + genero.genero;
        });
        arrayGenero.push(generosC);
        generosC = "";
    });

    const arrayActores = [];
    let actoresC = "";
    actores.forEach(elemento => {
        elemento.actores.forEach(actor => {
            if (actoresC === "") actoresC = actor.nombre;
            else actoresC = actoresC + ", " + actor.nombre;
        });
        arrayActores.push(actoresC);
        actoresC = "";
    });

    let unidad = {};
    const arrayUnidad = [];

    catalogo.forEach((elemento, i) => {

        unidad = {
            id: elemento.id,
            poster: elemento.poster,
            titulo: elemento.titulo,
            categoria: arrayCategorias[i],
            genero: arrayGenero[i],
            resumen: elemento.resumen,
            temporadas: elemento.temporadas,
            reparto: arrayActores[i],
            trailer: elemento.trailer
        }

        arrayUnidad.push(unidad);

    })

    res.status(200).send(arrayUnidad);

})

server.get('/catalogo/categoria/:categoria', async (req, res)=>{
    const catFind = req.params.categoria;

    const categoriasExistentes = await Categorias.findAll({
        attributes: ['categoria']
    });

    const arrayCategoriasExistentes = [];
    categoriasExistentes.forEach(elemento =>{
        arrayCategoriasExistentes.push(elemento.categoria)
    });

    let consulta = true;
    arrayCategoriasExistentes.forEach(elemento=>{
        if(elemento===catFind) consulta = false; 
    })
    console.log(consulta);
    if(consulta){
        res.status(500).send(`La Categoría consultada no existe, elige alguna de las siguientes:${arrayCategoriasExistentes}`);
        return;
    }

    const category = await Categorias.findAll({
        attributes: ['id'],
        where: {
            categoria: { [Op.eq]: catFind }
        },
        include: {
            model: Contenido,
            attributes: ['id']
        }
    });

    const arrayID = [];
    category[0].contenidos.forEach(elemento => {
        arrayID.push(elemento.id)
    });

    console.log(arrayID);

    // console.log(category[0].contenidos[0].id);
    console.log(category[0].contenidos[0].id);

    const catalogo = await Contenido.findAll({
        attributes: ['id', 'poster', 'titulo', 'resumen', 'temporadas', 'trailer'],
        where: {
            id: { [Op.in]: arrayID }
        },
    });

    const categorias = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Categorias,
            attributes: ['categoria']
        }
    });

    const actores = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Actores,
            attributes: ['nombre'],
            through: { attributes: [] }
        }
    });

    const generos = await Contenido.findAll({
        attributes: [],
        where: {
            id: { [Op.in]: arrayID }
        },
        include: {
            model: Generos,
            attributes: ['genero'],
            through: { attributes: [] }
        }
    })

    const arrayCategorias = [];
    categorias.forEach(elemento => {
        arrayCategorias.push(elemento.categoria.categoria);
    })

    const arrayGenero = [];
    let generosC = "";
    generos.forEach(elemento => {
        elemento.generos.forEach(genero => {
            if (generosC === "") generosC = genero.genero;
            else generosC = generosC + ", " + genero.genero;
        });
        arrayGenero.push(generosC);
        generosC = "";
    });

    const arrayActores = [];
    let actoresC = "";
    actores.forEach(elemento => {
        elemento.actores.forEach(actor => {
            if (actoresC === "") actoresC = actor.nombre;
            else actoresC = actoresC + ", " + actor.nombre;
        });
        arrayActores.push(actoresC);
        actoresC = "";
    });

    let unidad = {};
    const arrayUnidad = [];

    catalogo.forEach((elemento, i) => {

        unidad = {
            id: elemento.id,
            poster: elemento.poster,
            titulo: elemento.titulo,
            categoria: arrayCategorias[i],
            genero: arrayGenero[i],
            resumen: elemento.resumen,
            temporadas: elemento.temporadas,
            reparto: arrayActores[i],
            trailer: elemento.trailer
        }

        arrayUnidad.push(unidad);

    })

    res.status(200).send(arrayUnidad);
})

server.use('*', (req, res)=>{
    res.status(404).send("No existe el recurso solicitado");
})

sequelize.authenticate()
    .then(()=>{
        sequelize.sync({force: false})
        .then(() => {
    server.listen(process.env.PORT, process.env.HOST, ()=>{
        console.log(`El servidor se está ejecutando en http://${process.env.HOST}:${process.env.PORT}`);
            })
        }).catch(()=>{
            console.log("Ocurrió un error con la sicronización de modelos");
        })
    }).catch(()=>{
    console.log("Ocurrió un problema de autenticación con la base de datos");
})

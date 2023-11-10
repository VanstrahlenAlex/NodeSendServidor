const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult} = require('express-validator');


exports.nuevoEnlace = async(req, res, next) => {
    console.log("Desde la funcion nuevoEnlace...");
    console.log(req.body);
    console.log(req.usuario);
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //Crear un objeto de Enlace
    const {nombre_original} = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;

    //Si el usuario esta autenticado
    if(req.usuario){
        const {password, descargas} = req.body;

        //Asignar a enlace el numero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }

        //Asignar un Password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt)
        }

        //Asignar el autor
        enlace.autor = req.usuario.id;
    }

    //Almacenar en la BD
    try {
        await enlace.save();
        return res.json({ msg: `${enlace.url}`});
        next();
    } catch (error) {
        console.log("Error de la funcion nuevoEnlace");
        console.log("El error es -->", error);
        
    }
    
}

//Obtener enlace
exports.obtenerEnlace = async(req, res, next) => {
    console.log("1.Desde la funcion obtenerEnlace");
    console.log("url:", req.params.url);

    const {url} = req.params;
    //Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url});

    if(!enlace){
        res.status(404).json({msg: "Ese enlace no existe"});
        return next();
    }

    //si el enlace existe
    res.json({archivo: enlace.nombre})

    //Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
    const { descargas, nombre } = enlace;
    if(descargas === 1 ){
        console.log("Si Solo 1");

        //Eliminar el archivo
        req.archivo = nombre;
        //Eliminar la entrada de la bd
        await Enlaces.findOneAndRemove(req.params.url)
        next();

    } else { 
        //Si las descargas son > a 1 - Restar 1
        enlace.descargas--;
        await enlace.save();
        console.log("Aun hay descargas");
    }

    

    console.log(enlace);
}
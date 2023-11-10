const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const { validationResult} = require('express-validator');

exports.autenticarUsuario = async (req, res, next ) => {

    console.log("Entrando en la Funcion autenticarUsuario");

    //Revisar si hay errores
    //Mostrar los mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    //Buscar el usuario  para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    //console.log(usuario);

    if(!usuario) {
        res.status(401).json({ msg : "El usuario no existe"})
        return next()
    }
    console.log(req.body);

    //Verificar el password y autenticar el usuarriro 
    if(bcrypt.compareSync(password, usuario.password)) {
        //Crear JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre : usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });
        console.log("Se ha generado el token");
        res.json({token});
    } else {
        console.log("El Passwrd es Incorrecto");
        res.status(401).json({ msg : "El Password es Incorrecto"})
        return next();

    }
    

}

exports.usuarioAutenticado = (req, res, next) => {
    //console.log("Entrando a la funcion usuarioAutenticado");
    console.log(req.usuario);
    res.json({usuario: res.usuario});
    
    
}
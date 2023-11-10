const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

module.exports = (req, res, next ) =>{
    console.log("Yo soy un middleware");
    const authHeader = req.get('Authorization');
    if(authHeader){
        //Obtener el token
        const token = authHeader.split(' ')[1];

        //Comprobar el JWT
        try {
            console.log("Comprobando el JWT desde el Middleware...");
            const usuario = jwt.verify(token, process.env.SECRETA);
            req.usuario = usuario;
            console.log("Comprobado el JWT con Exito desde el Middleware...", usuario);

        } catch (error) {
            console.log("El error es el siguiente ===>", error);
            console.log("El JWT no es valido");
        }
        
    }
    return next();
}